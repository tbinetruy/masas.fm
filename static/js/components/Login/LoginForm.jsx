var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/LoginForm.jsx")

var { Body, Textbox, Password, Button, Link } = require("../UI/UI.jsx")

var LoginForm = React.createClass({
	propTypes: {
		fullForm: React.PropTypes.bool, 			// show the full login form be shown
		buttonTitle: React.PropTypes.string,			// log in button content
		subtitle: React.PropTypes.string,			// text under button
		route: React.PropTypes.object,			// route object from react-router

		login: React.PropTypes.func,				// login function
		updateTitle: React.PropTypes.func,			// update title function
	},

	getDefaultProps: function() {
		return {
			fullForm: false,
			buttonTitle: "Log-in via Facebook",
			subtitle: "",
			login: () => {},
		}
	},

	componentWillMount: function() {
		if(this.props.route !== undefined)
			if(this.props.route.path === "login")
				this.props.updateTitle('Login', '0')
	},

	

	render: function() {
		
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
									<Textbox id="login-username-input" labelError="Username does not exist" error={false}>Please enter your username</Textbox><br/>
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
						facebook={ true }>Log-in via Facebook</Button>
					<div className="subtitle">
						{ this.props.subtitle }
					</div>
				</div>
				)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginForm)
