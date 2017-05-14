import datetime
import soundcloud
import random
import requests

from django.conf import settings
from django.db.models import Count, Prefetch, Q
from django.shortcuts import render
from django.views import generic

from django.http import HttpRequest,HttpResponse
from django.http import JsonResponse
from json import dumps
from django.core.serializers import serialize

import django_filters

from oauth2_provider.ext.rest_framework.authentication import OAuth2Authentication
import oauth2 as oauth
import cgi
from django.http import HttpResponseRedirect
import time

from permissions import (
    IsUserOrReadOnly,
    IsOwnerOrReadOnly,
    NoDelete,
)

from rest_framework import decorators
from rest_framework import filters
from rest_framework import generics
from rest_framework import permissions
from rest_framework import serializers
from rest_framework import viewsets
from rest_framework import (
    generics,
    permissions,
    serializers,
    viewsets,
)

from rest_framework.authentication import (
    SessionAuthentication,
    BasicAuthentication
)

from rest_framework.decorators import detail_route
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from serializers import (
    GenreSerializer,
    StatusSerializer,
    StatusListSerializer,
    PlaySerializer,
    SongSerializer,
    UserEditSerializer,
    UserSerializer,
    UserStepSerializer,
    LinkSerializer,
    TimeIntervalSerializer,
)

from models import Genre, Status, Play, Song, User, UserStep, TimeInterval, Link


class BaseModelViewSetMixin(object):
    authentication_classes = (
        SessionAuthentication,
        BasicAuthentication,
        OAuth2Authentication
    )


class PlayViewSet(BaseModelViewSetMixin, viewsets.ModelViewSet):
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        IsOwnerOrReadOnly,
        NoDelete,
    )
    queryset = Play.objects.all()
    serializer_class = PlaySerializer


class StatusViewSet(BaseModelViewSetMixin, viewsets.ModelViewSet):
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        IsOwnerOrReadOnly,
    )
    queryset = Status.objects.all()
    serializer_class = StatusSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('user', 'song', 'status')

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return StatusListSerializer
        return super(StatusViewSet, self).get_serializer_class()


class UserViewSet(BaseModelViewSetMixin, viewsets.ModelViewSet):
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        IsUserOrReadOnly
    )
    queryset = User.objects.prefetch_related('link_set')
    serializer_class = UserSerializer

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return UserSerializer
        return UserEditSerializer


class GenreViewSet(BaseModelViewSetMixin, viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer

class UserStepViewSet(BaseModelViewSetMixin, viewsets.ModelViewSet):
    queryset = UserStep.objects.all()
    serializer_class = UserStepSerializer


class LinkViewSet(BaseModelViewSetMixin, viewsets.ModelViewSet):
    queryset = Link.objects.all()
    serializer_class = LinkSerializer


class SongViewSet(BaseModelViewSetMixin, viewsets.ModelViewSet):
    queryset = Song.objects.filter(deleted=None)
    serializer_class = SongSerializer

    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('trackArtist', 'deleted')


class TimeIntervalViewSet(BaseModelViewSetMixin, viewsets.ModelViewSet):
    queryset = TimeInterval.objects.all()
    serializer_class = TimeIntervalSerializer


class PlayView(APIView):
    serializer_class = SongSerializer

    def filter_genre(self, songs, genre):
        filtered_songs = songs.exclude(genre=None).filter(genre__name__contains=genre)

        if len(filtered_songs):
            return filtered_songs
        else:
            return songs

    def _get_song(self, request):
        songs = Song.objects.filter(deleted=None)


        time_interval_id = request.GET.get('time_interval_id', None)
        if time_interval_id:
            songs = songs.filter(
                timeInterval_id=time_interval_id,
            )

        radio = request.GET.get('radio', 'discover')
        if radio == 'discover':
            songs = songs.order_by('-dateUploaded')
        elif radio == 'popular':
            songs = songs.order_by('-like_count')

        exclude_genres = request.GET.get('exclude_genres', None)
        if exclude_genres:
            songs = songs.exclude(
                genre__pk__in=[int(i) for i in exclude_genres.split(',')]
            )

        print songs.count()
        # filter by genre if genre specified in request
        if request.GET.get('genre'):
            genre = request.GET.get('genre')
            songs = self.filter_genre(songs, genre)
        print songs.count()

        song_key = 'radio_song_history_%s' % radio
        song_history = request.session.get(song_key, [])

        if not song_history or len(song_history) >= songs.count():
            song_history = request.session[song_key] = []

        songs = songs.exclude(pk__in=song_history)

        artist_key = 'radio_artist_history_%s' % radio
        artist_history = request.session.get(artist_key, [])
        if not artist_history:
            request.session[artist_key] = []

        song = songs.exclude(
            trackArtist_id__in=artist_history
        ).first()
        if not song:
            request.session[artist_key] = artist_history = []
            song = songs.first()

        if song.pk not in request.session[song_key]:
            request.session[song_key] += [song.pk]
        if song.trackArtist_id not in request.session[artist_key]:
            request.session[artist_key] += [song.trackArtist_id]

        s = soundcloud.Client(client_id=settings.SOUNDCLOUD['CLIENT_ID'])

        try:
            metadata = s.get('/tracks/%s' % song.SC_ID)
        except requests.HTTPError as e:
            # Let's not blacklist the song if it's not a 404, because there
            # might be just a network issue between the server and soundcloud's
            # API and we don't want to start a loop where all songs become
            # deleted in this case.
            if e.response.status_code == 404:
                song.deleted = datetime.datetime.now()
                song.save()
                return
        else:
            song.metadata = metadata.obj

        return song

    def get_song(self, request):
        if 'song_id' in request.GET:
            song = Song.objects.get(pk=song_id)
        else:
            song = self._get_song(request)

            tries = 10
            while song is None and tries > 0:
                song = self._get_song(request)
                tries -= 1

            if song is None:
                raise Exception('Failed to find song')

        if request.user.is_authenticated():
            Play.objects.create(
                user=request.user,
                song=song,
            )

        song.play_count += 1
        song.save()

        serializer = self.serializer_class(
            instance=song,
            context=dict(
                request=request,
                view=self,
            ),
        )
        return Response(serializer.data)

    def get(self, request):
        return self.get_song(request)


class CheckUserViewSet(BaseModelViewSetMixin, APIView):
    def get(self, request, format=None):
        content = {
            'user': unicode(request.user),  # `django.contrib.auth.User` instance.
            'userPk': unicode(request.user.pk),
            'auth': unicode(request.auth),  # None
        }
        return Response(content)


class SPAView(generic.TemplateView):
    template_name = 'index.html'

    def get_context_data(self, *args, **kwargs):
        c = super(SPAView, self).get_context_data(*args, **kwargs)

        c['settings'] = {
            'ALLOWED_HOSTS': settings.ALLOWED_HOSTS,
            'RAVEN_JS_DSN': getattr(settings, 'RAVEN_JS_DSN', None),
            'SOUNDCLOUD': settings.SOUNDCLOUD,
            'TWITTER': settings.TWITTER,
            'FB': {
                'KEY': settings.SOCIAL_AUTH_FACEBOOK_KEY,
            },
            'GOOGLE': {
                'KEY': settings.SOCIAL_AUTH_GOOGLE_OAUTH2_KEY,
            }
        }

        return c



# It's probably a good idea to put your consumer's OAuth token and
# OAuth secret into your project's settings.
consumer = oauth.Consumer(settings.SOCIAL_AUTH_TWITTER_KEY, settings.SOCIAL_AUTH_TWITTER_SECRET)
client = oauth.Client(consumer)

request_token_url = 'https://api.twitter.com/oauth/request_token'
access_token_url = 'https://api.twitter.com/oauth/access_token'

# This is the slightly different URL used to authenticate/authorize.
authenticate_url = 'https://api.twitter.com/oauth/authenticate'

def twitter_login(request):
    # Step 1. Get a request token from Twitter.
    resp, content = client.request(request_token_url, "GET")
    if resp['status'] != '200':
        raise Exception("Invalid response from Twitter.")

    # Step 2. Store the request token in a session for later use.
    request.session['request_token'] = dict(cgi.parse_qsl(content))

    # Step 3. Redirect the user to the authentication URL.
    url = "%s?oauth_token=%s" % (authenticate_url,
        request.session['request_token']['oauth_token'])

    return HttpResponseRedirect(url)


def twitter_authenticated(request):
    # Step 1. Use the request token in the session to build a new client.
    token = oauth.Token(request.session['request_token']['oauth_token'],
        request.session['request_token']['oauth_token_secret'])
    token.set_verifier(request.GET['oauth_verifier'])
    client = oauth.Client(consumer, token)

    # Step 2. Request the authorized access token from Twitter.
    resp, content = client.request(access_token_url, "GET")
    if resp['status'] != '200':
        print content
        raise Exception("Invalid response from Twitter.")

    """
    This is what you'll get back from Twitter. Note that it includes the
    user's user_id and screen_name.
    {
        'oauth_token_secret': 'IcJXPiJh8be3BjDWW50uCY31chyhsMHEhqJVsphC3M',
        'user_id': '120889797',
        'oauth_token': '120889797-H5zNnM3qE0iFoTTpNEHIz3noL9FKzXiOxwtnyVOD',
        'screen_name': 'heyismysiteup'
    }
    """
    access_token = dict(cgi.parse_qsl(content))

    # Step 3. Lookup the user or create them if they don't exist.
    try:
        user = User.objects.get(username=access_token['screen_name'])
    except User.DoesNotExist:
        # When creating the user I just use their screen_name@twitter.com
        # for their email and the oauth_token_secret for their password.
        # These two things will likely never be used. Alternatively, you
        # can prompt them for their email here. Either way, the password
        # should never be used.
        user = User.objects.create_user(access_token['screen_name'],
            '%s@twitter.com' % access_token['screen_name'],
            access_token['oauth_token_secret'])

        # Save our permanent token and secret for later.
        profile = Profile()
        profile.user = user
        profile.oauth_token = access_token['oauth_token']
        profile.oauth_secret = access_token['oauth_token_secret']
        profile.save()

    # Authenticate the user and log them in using Django's pre-built
    # functions for these things.
    oauth_token=access_token['oauth_token']
    oauth_token_secret=access_token['oauth_token_secret']

    return HttpResponseRedirect('/twitter-callback?'
        + 'oauth_token='
        + oauth_token
        + '&'		# encoded &
        + 'oauth_token_secret='
        + oauth_token_secret
    )