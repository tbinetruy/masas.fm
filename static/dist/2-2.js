webpackJsonp([2],{657:function(e,t,s){"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),s.d(t,"Likes",function(){return A});var r=s(16),n=s(244),i=s(31),a=s(671),o=s(672),l=s(674),c=s(2),u=s.n(c),p=s(1),m=s.n(p),f=s(28),_=s(6),h=(s.n(_),function(){function defineProperties(e,t){for(var s=0;s<t.length;s++){var r=t[s];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,s){return t&&defineProperties(e.prototype,t),s&&defineProperties(e,s),e}}()),k=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r])}return e},g={SCinfo:u.a.array,hashtagFilter:u.a.array,searchInput:u.a.string,userData:u.a.object,userLikes:u.a.array},d=function(e){return{userData:e.appReducer.userData,SCinfo:e.likesReducer.SCinfo,searchInput:e.likesReducer.searchInput,hashtagFilter:e.likesReducer.hashtagFilter,userLikes:e.likesReducer.userLikes}},b={getLikes:u.a.func,toggleHashtag:u.a.func,toogleModal:u.a.func,updateLikes:u.a.func,updateModalContent:u.a.func,updateSearchInput:u.a.func,updateTitle:u.a.func},y=function(e){return{updateTitle:function(t,n){return e(s.i(r.a)(t,n))},getLikes:function(){return e(s.i(n.a)())},updateLikes:function(t){return e(s.i(n.b)(t))},toogleModal:function(){return e(s.i(r.b)())},updateModalContent:function(t){return e(s.i(r.c)(t))},toogleHashtag:function(t){return e(s.i(n.c)(t))},updateSearchInput:function(t){return e(s.i(n.d)(t))}}},L=k({},g,b),w={},E=function(e){function LikesSmart(e){_classCallCheck(this,LikesSmart);var t=_possibleConstructorReturn(this,(LikesSmart.__proto__||Object.getPrototypeOf(LikesSmart)).call(this,e));return t.getLikes=t.getLikes.bind(t),t.filterLikes=t.filterLikes.bind(t),t.openFiltersModal=t.openFiltersModal.bind(t),t.toggleFilter=t.toggleFilter.bind(t),t.updateSearchInput=t.updateSearchInput.bind(t),t}return _inherits(LikesSmart,e),h(LikesSmart,[{key:"componentWillMount",value:function(){this.props.updateTitle("Likes","0"),this.getLikes()}},{key:"componentDidMount",value:function(){}},{key:"componentDidUpdate",value:function(e){JSON.stringify(e.userData)!==JSON.stringify(this.props.userData)&&this.getLikes()}},{key:"componentWillUnmount",value:function(){for(var e=0;e<this.props.hashtagFilter.length;e++)this.props.hashtagFilter[e]&&this.props.toogleHashtag(e)}},{key:"getLikes",value:function(){this.props.getLikes()}},{key:"filterLikes",value:function(){var e=this;if(this.props.userLikes){var t=this.props.userLikes;t.sort(function(e,t){return Date.parse(t.MASAS_songInfo.created)-Date.parse(e.MASAS_songInfo.created)});var r=i.i,n=t.filter(function(t){if(0===t)return!1;var n=r(t.MASAS_songInfo.song.timeInterval)+" "+t.SC_songInfo.title+" "+t.SC_songInfo.tag_list+" "+t.SC_songInfo.user.username;return s.i(i.l)(e.props.searchInput,n)});if(0!==this.props.hashtagFilter.filter(function(e){return e}).length)for(var a=0;a<this.props.hashtagFilter.length;a++)this.props.hashtagFilter[a]||(n=n.filter(function(e){var t=e.MASAS_songInfo.song.timeInterval,s=t.substr(t.length-2,1);return parseInt(s)-1!==a}));return n}}},{key:"openFiltersModal",value:function(){this.props.updateModalContent(m.a.createElement(a.a,null)),this.props.toogleModal()}},{key:"toggleFilter",value:function(e){this.props.toogleHashtag(e)}},{key:"updateSearchInput",value:function(e){this.props.updateSearchInput(e)}},{key:"render",value:function(){return m.a.createElement(l.a,null,this.props.userLikes.length?m.a.createElement("div",{className:"likes-searchbar--wrapper",id:"likes-searchbar-wrapper"},m.a.createElement("img",{src:"/static/img/MASAS_search.svg",alt:"serach-icon"}),m.a.createElement(f.c,{id:"likes--search-textbox",value:this.props.searchInput,onChange:this.updateSearchInput}),m.a.createElement("img",{onClick:this.openFiltersModal,className:"filter-icon",alt:"filter-songs",src:"/static/img/MASAS_icon_filter.svg"})):"",this.props.userLikes.length?m.a.createElement("div",{className:"filters--wrapper"},m.a.createElement("div",{onClick:this.toggleFilter.bind(this,0),id:"filter-early-morning",className:"tag-filter "+(this.props.hashtagFilter[0]?"enable":"")},"#EarlyMorning"),m.a.createElement("div",{onClick:this.toggleFilter.bind(this,1),id:"filter-late-morning",className:"tag-filter "+(this.props.hashtagFilter[1]?"enable":"")},"#LateMorning"),m.a.createElement("div",{onClick:this.toggleFilter.bind(this,2),id:"filter-early-afternoon",className:"tag-filter "+(this.props.hashtagFilter[2]?"enable":"")},"#EarlyAfternoon"),m.a.createElement("div",{onClick:this.toggleFilter.bind(this,3),id:"filter-late-afternoon",className:"tag-filter "+(this.props.hashtagFilter[3]?"enable":"")},"#LateAfternoon"),m.a.createElement("div",{onClick:this.toggleFilter.bind(this,4),id:"filter-early-evening",className:"tag-filter "+(this.props.hashtagFilter[4]?"enable":"")},"#EarlyEvening"),m.a.createElement("div",{onClick:this.toggleFilter.bind(this,5),id:"filter-late-evening",className:"tag-filter "+(this.props.hashtagFilter[5]?"enable":"")},"#LateEvening")):"",m.a.createElement(o.a,{SCinfo:this.props.SCinfo,userData:this.props.userData,userLikes:this.filterLikes(this.props.userLikes)}))}}]),LikesSmart}(m.a.Component);E.propTypes=L,E.defaultProps=w;var A=s.i(_.connect)(d,y)(E);!function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(g,"reduxStatePropTypes","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/Likes/Likes.jsx"),__REACT_HOT_LOADER__.register(d,"mapStateToProps","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/Likes/Likes.jsx"),__REACT_HOT_LOADER__.register(b,"reduxDispatchPropTypes","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/Likes/Likes.jsx"),__REACT_HOT_LOADER__.register(y,"mapDispatchToProps","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/Likes/Likes.jsx"),__REACT_HOT_LOADER__.register(L,"smartPropTypes","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/Likes/Likes.jsx"),__REACT_HOT_LOADER__.register(w,"smartDefaultProps","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/Likes/Likes.jsx"),__REACT_HOT_LOADER__.register(E,"LikesSmart","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/Likes/Likes.jsx"),__REACT_HOT_LOADER__.register(A,"Likes","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/Likes/Likes.jsx"))}()},664:function(e,t,s){"use strict";s.d(t,"a",function(){return a}),s.d(t,"b",function(){return o});var r=s(16),n=s(90),i=n.store.dispatch,a={componentDidMount:function(){i(r.f.blurMobile(!0))},componentWillUnmount:function(){i(r.f.blurMobile(!1))}},o={componentDidMount:function(){i(r.f.blur(!0))},componentWillUnmount:function(){i(r.f.blur(!1))}};!function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(i,"dispatch","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/MASAS_mixins.jsx"),__REACT_HOT_LOADER__.register(a,"MobileBlurBackground","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/MASAS_mixins.jsx"),__REACT_HOT_LOADER__.register(o,"BlurBackground","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/MASAS_mixins.jsx"))}()},671:function(e,t,s){"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}s.d(t,"a",function(){return b});var r=s(16),n=s(2),i=s.n(n),a=s(1),o=s.n(a),l=s(6),c=(s.n(l),s(244)),u=function(){function defineProperties(e,t){for(var s=0;s<t.length;s++){var r=t[s];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,s){return t&&defineProperties(e.prototype,t),s&&defineProperties(e,s),e}}(),p=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r])}return e},m={hashtagFilter:o.a.PropTypes.array},f=function(e){return{hashtagFilter:e.likesReducer.hashtagFilter}},_={toogleHashtag:i.a.func,toogleModal:i.a.func,updateModalContent:i.a.func},h=function(e){return{toogleModal:function(){return e(s.i(r.b)())},updateModalContent:function(t){return e(s.i(r.c)(t))},toogleHashtag:function(t){return e(s.i(c.c)(t))}}},k=p({},m,_),g={},d=function(e){function FiltersModalSmart(e){_classCallCheck(this,FiltersModalSmart);var t=_possibleConstructorReturn(this,(FiltersModalSmart.__proto__||Object.getPrototypeOf(FiltersModalSmart)).call(this,e));return t.toggleFilter=t.toggleFilter.bind(t),t}return _inherits(FiltersModalSmart,e),u(FiltersModalSmart,[{key:"componentWillMount",value:function(){}},{key:"toggleFilter",value:function(e){this.props.toogleHashtag(e)}},{key:"render",value:function(){return o.a.createElement("div",{className:"filters-modal--wrapper"},o.a.createElement("h1",null,"Filter for:"),o.a.createElement("div",{onClick:this.toggleFilter.bind(this,0),className:"filter "+(this.props.hashtagFilter[0]?"active":"")},"# EarlyMorning"),o.a.createElement("div",{onClick:this.toggleFilter.bind(this,1),className:"filter "+(this.props.hashtagFilter[1]?"active":"")},"# LateMorning"),o.a.createElement("div",{onClick:this.toggleFilter.bind(this,2),className:"filter "+(this.props.hashtagFilter[2]?"active":"")},"# EarlyAfternoon"),o.a.createElement("div",{onClick:this.toggleFilter.bind(this,3),className:"filter "+(this.props.hashtagFilter[3]?"active":"")},"# LateAfternoon"),o.a.createElement("div",{onClick:this.toggleFilter.bind(this,4),className:"filter "+(this.props.hashtagFilter[4]?"active":"")},"# EarlyEvening"),o.a.createElement("div",{onClick:this.toggleFilter.bind(this,5),className:"filter "+(this.props.hashtagFilter[5]?"active":"")},"# LateEvening"))}}]),FiltersModalSmart}(o.a.Component);d.propTypes=k,d.defaultProps=g;var b=s.i(l.connect)(f,h)(d);!function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(m,"reduxStatePropTypes","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/Likes/FiltersModal.jsx"),__REACT_HOT_LOADER__.register(f,"mapStateToProps","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/Likes/FiltersModal.jsx"),__REACT_HOT_LOADER__.register(_,"reduxDispatchPropTypes","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/Likes/FiltersModal.jsx"),__REACT_HOT_LOADER__.register(h,"mapDispatchToProps","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/Likes/FiltersModal.jsx"),__REACT_HOT_LOADER__.register(k,"smartPropTypes","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/Likes/FiltersModal.jsx"),__REACT_HOT_LOADER__.register(g,"smartDefaultProps","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/Likes/FiltersModal.jsx"),__REACT_HOT_LOADER__.register(d,"FiltersModalSmart","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/Likes/FiltersModal.jsx"),__REACT_HOT_LOADER__.register(b,"FiltersModal","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/Likes/FiltersModal.jsx"))}()},672:function(e,t,s){"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}s.d(t,"a",function(){return A});var r=s(28),n=s(673),i=s(675),a=s(2),o=s.n(a),l=s(1),c=s.n(l),u=s(16),p=s(6),m=(s.n(p),s(251)),f=s(244),_=function(){function defineProperties(e,t){for(var s=0;s<t.length;s++){var r=t[s];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,s){return t&&defineProperties(e.prototype,t),s&&defineProperties(e,s),e}}(),h=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r])}return e},k=m.a.numRowLikesShown,g={bgFilter:o.a.object,numRowLikesShown:o.a.number,userLikesUnfiltered:o.a.array},d=function(e){return{bgFilter:e.appReducer.bgFilter,userLikesUnfiltered:e.likesReducer.userLikes,numRowLikesShown:e.likesReducer.numRowLikesShown}},b={blurBg:o.a.func,blurBgMobile:o.a.func,saturateBg:o.a.func,saturateBgMobile:o.a.func,updateNumberLikesShown:o.a.func},y=function(e){return{updateNumberLikesShown:function(t){return e(s.i(f.e)(t))},blurBg:function(t){return e(u.f.blur(t))},saturateBg:function(t){return e(u.f.saturate(t))},blurBgMobile:function(t){return e(u.f.blurMobile(t))},saturateBgMobile:function(t){return e(u.f.saturateMobile(t))}}},L=h({},g,b,{SCinfo:o.a.array,showMoreLikesButton:o.a.bool,updateShowMoreLikesButton:o.a.func,userData:o.a.object,userLikes:o.a.array}),w={},E=function(e){function LikesArtworksSmart(e){return _classCallCheck(this,LikesArtworksSmart),_possibleConstructorReturn(this,(LikesArtworksSmart.__proto__||Object.getPrototypeOf(LikesArtworksSmart)).call(this,e))}return _inherits(LikesArtworksSmart,e),_(LikesArtworksSmart,[{key:"componentWillMount",value:function(){this.numArtworkPerLine=10}},{key:"componentWillUnmount",value:function(){this.props.updateNumberLikesShown(k)}},{key:"renderLikes",value:function(){if(this.props.userLikesUnfiltered.length){var e=this.props.userLikes,t=e.map(function(e){return c.a.createElement(n.a,{key:e.MASAS_songInfo.pk,MASAS_songPk:e.MASAS_songInfo.pk,SCinfo:e.SC_songInfo,MASASinfo:e.MASAS_songInfo.song,artistInfo:e.artistInfo,isShowingArtistInfo:e.showProfile})});if(this.shouldFilterLikes()){var s=this.props.numRowLikesShown*this.numArtworkPerLine;t=t.slice(0,s)}return t}return c.a.createElement(i.a,null)}},{key:"getElementsWidth",value:function(){var e=$("<div class='likes-scroll--wrapper'><div class='likes--wrapper'><div class='likes-artworks--wrapper'><div class='likes-item--wrapper'><div class='artwork--wrapper'><img class='artwork'/></div></div></div></div></div>").hide().appendTo("body"),t=e.css("width").replace("px",""),s=parseInt(t),r=$("<div class='likes-scroll--wrapper'><div class='likes--wrapper'></div></div>").hide().appendTo("body"),n=window.getComputedStyle(document.getElementsByClassName("likes--wrapper")[0]).width.replace("px","");return e.remove(),r.remove(),{artworkWidth:s,likesWrapperWidth:n}}},{key:"alignArtworksLeft",value:function(){if(this.props.userLikes.length){var e=this.getElementsWidth(),t=e.artworkWidth,s=e.likesWrapperWidth,r=s,n=t;if(0!==n){var i=0;this.props.SCinfo&&(i=this.props.SCinfo.length);var a=Math.floor(r/n);this.numArtworkPerLine=a;for(var o=i%a,l=[],u=0;u<a-o;u++)l.push(c.a.createElement("div",{key:u,className:"filler-artwork",style:{height:0,width:t}}));return l}}}},{key:"shouldFilterLikes",value:function(){var e=this.props.userLikes,t=this.props.numRowLikesShown*this.numArtworkPerLine;return e.length>t}},{key:"render",value:function(){var e=this;return c.a.createElement("div",{className:"likes-artworks--wrapper"},this.renderLikes(),this.alignArtworksLeft(),c.a.createElement("div",{className:"button-container",style:{display:this.shouldFilterLikes()?"flex":"none"}},c.a.createElement(r.b,{onClick:function(){return e.props.updateNumberLikesShown(e.props.numRowLikesShown+k)},isSecondaryAction:!0,isBigButton:!0},"Load more")))}}]),LikesArtworksSmart}(c.a.Component);E.propTypes=L,E.defaultProps=w;var A=s.i(p.connect)(d,y)(E);!function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(k,"defaultNumRowLikesShown","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/Likes/LikesArtworks.jsx"),__REACT_HOT_LOADER__.register(g,"reduxStatePropTypes","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/Likes/LikesArtworks.jsx"),__REACT_HOT_LOADER__.register(d,"mapStateToProps","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/Likes/LikesArtworks.jsx"),__REACT_HOT_LOADER__.register(b,"reduxDispatchPropTypes","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/Likes/LikesArtworks.jsx"),__REACT_HOT_LOADER__.register(y,"mapDispatchToProps","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/Likes/LikesArtworks.jsx"),__REACT_HOT_LOADER__.register(L,"smartPropTypes","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/Likes/LikesArtworks.jsx"),__REACT_HOT_LOADER__.register(w,"smartDefaultProps","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/Likes/LikesArtworks.jsx"),__REACT_HOT_LOADER__.register(E,"LikesArtworksSmart","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/Likes/LikesArtworks.jsx"),__REACT_HOT_LOADER__.register(A,"LikesArtworks","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/Likes/LikesArtworks.jsx"))}()},673:function(e,t,s){"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}s.d(t,"a",function(){return y});var r=s(19),n=s(28),i=s(2),a=s.n(i),o=s(1),l=s.n(o),c=s(6),u=(s.n(c),s(31)),p=function(){function defineProperties(e,t){for(var s=0;s<t.length;s++){var r=t[s];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,s){return t&&defineProperties(e.prototype,t),s&&defineProperties(e,s),e}}(),m=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r])}return e},f={isFetchingSong:a.a.bool,isPaused:a.a.bool,songPlaying:a.a.string,userData:a.a.object},_=function(e){return{songPlaying:e.playerReducer.songPlaying,isPaused:e.playerReducer.isPaused,isFetchingSong:e.playerReducer.isFetchingSong,userData:e.appReducer.userData}},h={loadPlaylist:a.a.func,pause:a.a.func,playNewSongFromPlaylist:a.a.func},k=function(e){return{pause:function(){return e(s.i(r.a)())},loadPlaylist:function(t){return e(s.i(r.f)(t))},playNewSongFromPlaylist:function(t){return e(s.i(r.g)(t))}}},g=m({},f,h,{MASAS_songPk:a.a.number,MASASinfo:a.a.object,SCinfo:a.a.object,isShowingArtistInfo:a.a.bool}),d={},b=function(e){function LikesItemSmart(e){_classCallCheck(this,LikesItemSmart);var t=_possibleConstructorReturn(this,(LikesItemSmart.__proto__||Object.getPrototypeOf(LikesItemSmart)).call(this,e));return t.playTrack=t.playTrack.bind(t),t.renderPlayerControlButton=t.renderPlayerControlButton.bind(t),t}return _inherits(LikesItemSmart,e),p(LikesItemSmart,[{key:"playTrack",value:function(){var e=[].concat(this.props.userData.likes);e.sort(function(e,t){return Date.parse(t.created)-Date.parse(e.created)}),e=e.map(function(e){return e.song.url});for(var t=0,s=0;s<e.length;s++)this.props.MASASinfo.url===e[s]&&(t=s);this.props.loadPlaylist(e),this.props.playNewSongFromPlaylist(t)}},{key:"renderPlayerControlButton",value:function(){if(this.props.MASASinfo)return this.props.isFetchingSong?l.a.createElement("img",{src:"/static/img/puff_loader.svg",alt:"loading",className:"artwork"}):this.props.MASASinfo.url===this.props.songPlaying&&this.props.isPaused===!1?l.a.createElement("img",{src:"/static/img/MASAS_player_pause.svg",alt:"pause",className:"artwork",onClick:this.props.pause}):l.a.createElement("img",{src:"/static/img/MASAS_player_play.svg",alt:"play",className:"artwork",onClick:this.playTrack})}},{key:"render",value:function(){var e=this.props.SCinfo,t=e.artwork_url;null!==e.artwork_url&&(t=e.artwork_url.substring(0,e.artwork_url.lastIndexOf("-"))+"-t300x300.jpg");this.props.isShowingArtistInfo;return l.a.createElement("div",{className:"likes-item--wrapper"},l.a.createElement("div",{className:"artwork--wrapper"},l.a.createElement("div",{className:"artwork-div",style:this.props.SCinfo.artwork_url?{}:{backgroundColor:"black"}},this.props.SCinfo.artwork_url?l.a.createElement("img",{src:t,alt:"artwork",className:"artwork",onClick:this.playTrack}):""),l.a.createElement("div",{className:"artwork-overlay"},this.renderPlayerControlButton())),l.a.createElement("div",{className:"text--wrapper",onClick:function(){}},l.a.createElement("div",{className:"song-name--wrapper"},l.a.createElement("div",{className:"title"},l.a.createElement(n.g,null,e.title)),l.a.createElement("div",{className:"dash"}," - "),l.a.createElement("div",{className:"artist"},l.a.createElement(n.g,null,e.user.username))),l.a.createElement("div",{className:"song-stats--wrapper"},l.a.createElement("div",{className:"time"},s.i(u.i)(this.props.MASASinfo.timeInterval)))))}}]),LikesItemSmart}(l.a.Component);b.propTypes=g,b.defaultProps=d;var y=s.i(c.connect)(_,k)(b);!function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(f,"reduxStatePropTypes","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/Likes/LikesItem.jsx"),__REACT_HOT_LOADER__.register(_,"mapStateToProps","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/Likes/LikesItem.jsx"),__REACT_HOT_LOADER__.register(h,"reduxDispatchPropTypes","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/Likes/LikesItem.jsx"),__REACT_HOT_LOADER__.register(k,"mapDispatchToProps","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/Likes/LikesItem.jsx"),__REACT_HOT_LOADER__.register(g,"smartPropTypes","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/Likes/LikesItem.jsx"),__REACT_HOT_LOADER__.register(d,"smartDefaultProps","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/Likes/LikesItem.jsx"),__REACT_HOT_LOADER__.register(b,"LikesItemSmart","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/Likes/LikesItem.jsx"),__REACT_HOT_LOADER__.register(y,"LikesItem","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/Likes/LikesItem.jsx"))}()},674:function(e,t,s){"use strict";s.d(t,"a",function(){return g});var r=s(168),n=(s.n(r),s(664)),i=s(2),a=s.n(i),o=s(1),l=s.n(o),c=s(6),u=(s.n(c),Object.assign||function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r])}return e}),p={SCinfo:a.a.array,title:a.a.string,userLikes:a.a.array},m=function(e){return{title:e.appReducer.pageTitle,SCinfo:e.likesReducer.SCinfo,userLikes:e.likesReducer.userLikes}},f={},_=function(e){return{}},h=u({},p,f,{children:a.a.node}),k=r({mixins:[n.a],propTypes:h,componentWillMount:function(){this.scrollOffset=70},componentDidMount:function(){this.props.userLikes.length&&(this.scrollOffset=document.getElementsByClassName("likes-searchbar--wrapper")[0].offsetHeight+document.getElementsByClassName("filters--wrapper")[0].offsetHeight+10,$(".box.page-content")[0].scrollTop=this.scrollOffset)},componentDidUpdate:function(e,t){this.props.userLikes.length&&document.getElementsByClassName("likes-searchbar--wrapper")[0]&&(this.scrollOffset=document.getElementsByClassName("likes-searchbar--wrapper")[0].offsetHeight+document.getElementsByClassName("filters--wrapper")[0].offsetHeight+10),1!==this.props.userLikes.length||e.userLikes.length||($(".box.page-content")[0].scrollTop=this.scrollOffset)},render:function(){var e={minHeight:"4.2rem",maxHeight:"4.2rem"};return l.a.createElement("div",{className:"app-body body--wrapper"},l.a.createElement("div",{className:"row row-display-none-sm no-margin",style:e},l.a.createElement("div",{className:"col-md-12 page-title--wrapper"},l.a.createElement("div",{className:"box page-title"},this.props.title),l.a.createElement("hr",null))),l.a.createElement("div",{className:"row no-margin likes-scroll--wrapper"},l.a.createElement("div",{className:"col-xs-12 col-md-12 page-content--wrapper"},l.a.createElement("div",{ref:"scroll",className:"box page-content",style:{overflow:"scroll",justifyContent:"initial",backgroundColor:"rgba(0,0,0,0)"}},l.a.createElement("div",{className:"likes--wrapper",style:{minHeight:"calc(100% + "+(this.props.userLikes.length?this.scrollOffset:"0")+"px)"}},this.props.children)))))}}),g=s.i(c.connect)(m,_)(k);!function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(p,"reduxStatePropTypes","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/Likes/LikesWrapper.jsx"),__REACT_HOT_LOADER__.register(m,"mapStateToProps","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/Likes/LikesWrapper.jsx"),__REACT_HOT_LOADER__.register(f,"reduxDispatchPropTypes","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/Likes/LikesWrapper.jsx"),__REACT_HOT_LOADER__.register(_,"mapDispatchToProps","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/Likes/LikesWrapper.jsx"),__REACT_HOT_LOADER__.register(h,"smartPropTypes","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/Likes/LikesWrapper.jsx"),__REACT_HOT_LOADER__.register(k,"LikesWrapperSmart","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/Likes/LikesWrapper.jsx"),__REACT_HOT_LOADER__.register(g,"LikesWrapper","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/Likes/LikesWrapper.jsx"))}()},675:function(e,t,s){"use strict";s.d(t,"a",function(){return m});var r=s(168),n=(s.n(r),s(664)),i=s(28),a=s(1),o=s.n(a),l=s(31),c={},u={},p=function(e){return o.a.createElement("div",{className:"no-like--wrapper",style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flex:1}},o.a.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-between",minHeight:"17rem"}},o.a.createElement("img",{src:"/static/img/MASAS_no_likes.svg",alt:"like icon"}),o.a.createElement("p",{style:{fontSize:"1.2rem"}},"You haven't liked any sounds yet"),o.a.createElement(i.b,{isBigButton:!0,isSecondaryAction:!1,onClick:function(){return s.i(l.a)("/discover")}},"Start discovering new music")))};p.propTypes=c,p.defaultProps=u;var m=r({mixins:[n.b],propTypes:{},render:function(){return o.a.createElement(p,null)}});!function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(c,"dumbPropTypes","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/Likes/NoLikesComponent.jsx"),__REACT_HOT_LOADER__.register(u,"dumbDefaultProps","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/Likes/NoLikesComponent.jsx"),__REACT_HOT_LOADER__.register(p,"NoLikesComponentDumb","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/Likes/NoLikesComponent.jsx"),__REACT_HOT_LOADER__.register(m,"NoLikesComponentSmart","/Users/thomasbinetruy/Documents/websites/masas/static/js/components/Likes/NoLikesComponent.jsx"))}()}});