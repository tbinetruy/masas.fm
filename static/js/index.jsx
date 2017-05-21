/**
 * App entry point
 */
import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'

import AppRouter from './AppRouter.jsx'

ReactDOM.render((AppRouter), document.getElementById('content'))
