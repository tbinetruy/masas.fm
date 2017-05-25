/**
 * App entry point
 */
import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'

import { AppRouter } from './AppRouter.jsx'

import { AppContainer } from 'react-hot-loader'

const render = App => {
	ReactDOM.render(
		<AppContainer>
			<AppRouter />
		</AppContainer>,
		document.getElementById('content')
	)
}

render(AppRouter)

// Hot Module Replacement API
if (module.hot) {
	module.hot.accept('./AppRouter.jsx', () => {
		render(AppRouter)
	})
}
