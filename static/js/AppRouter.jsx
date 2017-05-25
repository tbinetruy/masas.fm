import 'babel-polyfill'

import {
	Route,
	BrowserRouter as Router,
	Switch,
 } from 'react-router-dom'

import {
	Discover,
	InvitationPending,
	Legals,
	Likes,
	Login,
	Manifesto,
	Popular,
	Profile,
	SignUp,
	SoundcloudCallback,
	TwitterCallback,
	UploadSC,
} from './codeSplitting.jsx'

import { App } from './components/App/App.jsx'
// import { Discover } from './components/Discover/Discover.jsx'
// import { InvitationPending } from './components/Login/InvitationPending.jsx'
// import { LegalsHome as Legals } from './components/Legals/LegalsHome.jsx'
// import { Likes } from './components/Likes/Likes.jsx'
// import { LoginForm as Login } from './components/Login/LoginForm.jsx'
// import { Manifesto } from './components/Manifesto/Manifesto.jsx'
// import { Popular } from './components/Popular/Popular.jsx'
// import { Profile } from './components/Profile/Profile.jsx'
import { Provider } from 'react-redux'
import React from 'react'
// import { SignUp } from './components/Login/SignUp.jsx'
// import { SoundcloudCallback } from './SoundcloudCallback.jsx'
// import { TwitterCallback } from './TwitterCallback.jsx'
// import { UploadSC } from './components/UploadSC/UploadSC.jsx'
import { store } from './reducers/reducers.js'


const AppRouter = () => (
	<Provider store={store}>
		<Router>
			<Switch>
				<Route path="/sc-callback" component={SoundcloudCallback} />
				<Route path="/twitter-callback" component={TwitterCallback} />
				<App>
					<Switch>
						<Route exact path="/" component={Discover} />
						<Route path="/discover" component={Popular} />
						<Route path="/pending" component={InvitationPending} />
						<Route path="/login" component={Login} />
						<Route path="/likes" component={Likes} />
						<Route path="/legals" component={Legals} />
						<Route path="/crowdradio" component={Discover} />
						<Route path="/profile" publicProfile={false} component={Profile} />
						<Route path="/user/:username" publicProfile={true} component={Profile} />
						<Route path="/sign-up" component={SignUp} />
						<Route path="/upload" component={UploadSC} />
						<Route path="/manifesto" component={Manifesto} />
					</Switch>
				</App>
			</Switch>
		</Router>
	</Provider>
)

export {
	AppRouter,
}