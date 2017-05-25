import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
	Body,
	Button,
	Link,
	Password,
	Textbox,
} from '../UI/UI.jsx'

import GoogleLogin from 'react-google-login'
import { TwitterLoginButton } from './TwitterLoginButton.jsx'

import { login } from '../../reducers/actions/Login.js'
import { updatePageTitle } from '../../reducers/actions/App.js'

/**
 * Redux container
 */

const reduxStatePropTypes = {

}

const mapStateToProps = function(state) {
	return {
	}
}

const reduxDispatchPropTypes = {
	updateTitle: PropTypes.func,
	login: PropTypes.func,
}

const mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch(updatePageTitle(title, pageType)),
		login: (backend, token = undefined) => dispatch(login(backend, token)),
	}
}


/**
 * Smart component
 */

const smartPropTypes = {
	...reduxStatePropTypes,
	...reduxDispatchPropTypes,

	buttonTitle: PropTypes.string,			// log in button content
	fullForm: PropTypes.bool, 			// show the full login form be shown
	login: PropTypes.func,				// login function
	route: PropTypes.object,			// route object from react-router
	subtitle: PropTypes.string,			// text under button
	updateTitle: PropTypes.func,			// update title function
}

const smartDefaultProps = {
	fullForm: false,
	buttonTitle: 'Log-in via Facebook',
	subtitle: '',
	login: () => {},
}

class LoginFormSmart extends React.Component {
    constructor(props) {
        super(props)
    }

	componentWillMount() {
		if(this.props.route !== undefined)
			if(this.props.route.path === 'login')
				this.props.updateTitle('Login', '0')
	}

	render() {
		if(this.props.fullForm)
			return (
				<Body>
					<div className="login-form--wrapper1">
						<div className="header">
							<img src="/static/img/MASAS_logo-M.svg" alt="logo" className="logo" />
							<h1 className="login-title">for a better collaboration between artists and music lovers.</h1>
						</div>
						<div className="login-form--wrapper2">
							<div className="fb-login">
								<Button isBigButton={true} isSecondaryAction={false} onClick={ () => this.props.login('facebook') } facebook={ true }>{ this.props.buttonTitle }</Button>
							</div>
							<div style={{ display: 'none' }}>
								<div className="divider">
									<hr className="horizontal-divider" />
									<div className="vertical-divider">
									</div>
								</div>
								<div className="login-form">
									<Textbox id="login-username-input" labelError="Username does not exist" error={false}>Please enter your username</Textbox><br />
									<Password id="login-password-input" labelError="Password invalid" error={false}>Please enter your password</Password>
									<Link to="/"><span className="forgot-password">Forgot your password?</span></Link>
								</div>
							</div>
						</div>
						<div style={{ display: 'none' }}>
							<div className="login-button">
								<Button
									isBigButton={false}
									isSecondaryAction={false}
									onClick={ () => { } }>Log In</Button>
							</div>
						</div>
					</div>
				</Body>
			)
		else
			return (
				<div className="login-container">
					<Button
						isBigButton={ true }
						isSecondaryAction={ false }
						onClick={ () => this.props.login('facebook') }
						facebook={ true }>
						Facebook
					</Button>
					<GoogleLogin
						clientId={ document.MASAS.GOOGLE.key }
						className="google-login-button"
						buttonText="Google"
						onSuccess={ r => { this.props.login('google', r.accessToken) } }
						onFailure={ e => {} }
						/>
					<TwitterLoginButton
						/>
					<div className="subtitle">
						{ this.props.subtitle }
					</div>
				</div>
			)
	}
}

LoginFormSmart.propTypes = smartPropTypes
LoginFormSmart.defaultProps = smartDefaultProps

const LoginForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginFormSmart)

export {
	LoginForm,
}
