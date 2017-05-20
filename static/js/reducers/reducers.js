var Redux = require('redux')
import thunkMiddleware from 'redux-thunk'

import { defaultState as appDefaultState, appReducer } from './App.jsx'
import { defaultState as headerDefaultState, headerReducer } from './Header.jsx'
import { defaultState as bodyDefaultState, bodyReducer } from './Body.jsx'
import { defaultState as footerDefaultState, footerReducer } from './Footer.jsx'
import { defaultState as loginDefaultState, loginReducer } from './Login.jsx'
import { defaultState as homeDefaultState, homeReducer } from './Home.jsx'
import { defaultState as uploadDefaultState, uploadSCReducer } from './UploadSC.jsx'
import { defaultState as playerDefaultState, playerReducer } from './Player.jsx'
import { defaultState as likesDefaultState, likesReducer } from './Likes.jsx'
import { defaultState as discoverDefaultState, discoverReducer  } from './Discover.jsx'
import { defaultState as legalsDefaultState, legalsReducer  } from './Legals.jsx'
import { defaultState as profileDefaultState, profileReducer  } from './Profile.jsx'
import { defaultState as popularDefaultState, popularReducer  } from './Popular.jsx'

const initialState = {
	headerReducer: headerDefaultState,
	bodyReducer: bodyDefaultState,
	footerReducer: footerDefaultState,
	loginReducer: loginDefaultState,
	homeReducer: homeDefaultState,
	appReducer: appDefaultState,
	uploadSCReducer: uploadDefaultState,
	playerReducer: playerDefaultState,
	likesReducer: likesDefaultState,
	discoverReducer: discoverDefaultState,
	legalsReducer: legalsDefaultState,
	profileReducer: profileDefaultState,
	popularReducer: popularDefaultState,
}
const rootReducer = Redux.combineReducers({
	headerReducer,
	bodyReducer,
	footerReducer,
	loginReducer,
	homeReducer,
	appReducer,
	uploadSCReducer,
	playerReducer,
	likesReducer,
	discoverReducer,
	legalsReducer,
	profileReducer,
	popularReducer,
})


export const store = Redux.createStore(
	rootReducer,
	initialState,
	Redux.compose(
		Redux.applyMiddleware(thunkMiddleware),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
)