require('babel-polyfill')

import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { Route, Router, browserHistory } from 'react-router'

var store = require('./reducers/reducers.js')

var SoundcloudCallback = require('./SoundcloudCallback.jsx')
var TwitterCallback = require('./TwitterCallback.jsx')
import { App } from './components/App/App.jsx'
import { LoginForm as Login } from './components/Login/LoginForm.jsx'
import { InvitationPending } from './components/Login/InvitationPending.jsx'
import { SignUp } from './components/Login/SignUp.jsx'
var UploadSC = require('./components/UploadSC/UploadSC.jsx')
var Profile = require('./components/Profile/Profile.jsx')
import { Likes } from './components/Likes/Likes.jsx'
import { Discover } from './components/Discover/Discover.jsx'
import { LegalsHome as Legals } from './components/Legals/LegalsHome.jsx'
var Popular = require('./components/Popular/Popular.jsx')
var { Manifesto } = require('./components/Manifesto/Manifesto.jsx')


ReactDOM.render((
       <Provider store={store}>
               <Router history={browserHistory}>
                       <Route path="/" component={App}>
                               <Route path="discover" component={Popular} />
                               <Route path="pending" component={InvitationPending} />
                               <Route path="login" component={Login} />
                               <Route path="likes" component={Likes} />
                               <Route path="legals" component={Legals} />
                               <Route path="crowdradio" component={Discover} />
                               <Route path="profile" publicProfile={false} component={Profile} />
                               <Route path="/user/:username" publicProfile={true} component={Profile} />
                               <Route path="sign-up" component={SignUp} />
                               <Route path="upload" component={UploadSC} />
                               <Route path="manifesto" component={Manifesto} />
                       </Route>
                       <Route path="/sc-callback" component={SoundcloudCallback} />
                       <Route path="/twitter-callback" component={TwitterCallback} />
               </Router>
       </Provider>
), document.getElementById('content'))
