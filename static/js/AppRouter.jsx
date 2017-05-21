require('babel-polyfill')

import React from 'react'

import { Provider } from 'react-redux'
import { Route, Router, browserHistory } from 'react-router'
import { App } from './components/App/App.jsx'
import { LoginForm as Login } from './components/Login/LoginForm.jsx'
import { InvitationPending } from './components/Login/InvitationPending.jsx'
import { SignUp } from './components/Login/SignUp.jsx'
import { Likes } from './components/Likes/Likes.jsx'
import { Discover } from './components/Discover/Discover.jsx'
import { LegalsHome as Legals } from './components/Legals/LegalsHome.jsx'
import { Popular } from './components/Popular/Popular.jsx'
import { Manifesto } from './components/Manifesto/Manifesto.jsx'
import { Profile } from './components/Profile/Profile.jsx'
import { UploadSC } from './components/UploadSC/UploadSC.jsx'
import { store } from './reducers/reducers.js'

var SoundcloudCallback = require('./SoundcloudCallback.jsx')
var TwitterCallback = require('./TwitterCallback.jsx')



const AppRouter = (
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
)


// Hot Module Replacement API
if (module.hot) {
	module.hot.accept('./components/Manifesto/Manifesto.jsx', () => {
		console.log(AppRouter)
		reactDOM.render(Manifesto)
		// AppRouter.props.children.props.children[0].props.children[11] = <Route path="manifesto" component={Manifesto} />
		// AppRouter = AppRouterMaker()
		// AppRouter.forceUpdate()
		// ReactDOM.render((<div>hey</div>), document.getElementById('content'))
		// ReactDOM.render((AppRouter), document.getElementById('content'))
	});
}
export default AppRouter