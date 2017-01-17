var React = require("react")

var Button = React.createClass({
	propTypes: {
		noBorders: React.PropTypes.bool,				// should button have borders
		className: React.PropTypes.string,				// class names
		isBigButton: React.PropTypes.bool, 			// is it a big button
		isSecondaryAction: React.PropTypes.bool,		// is it a secondary button
		onClick: React.PropTypes.func.isRequired,		// what to do when user clicks on button
		isDisabled: React.PropTypes.bool,			// is button disabled
		wrapperStyle: React.PropTypes.object,		// styles associated with button wrapper
		soundcloud: React.PropTypes.bool,			// is button style for SC login
		facebook: React.PropTypes.bool, 			// is button style for FB login
		twitter: React.PropTypes.bool, 			// is button style for Twitterlogin
		children: React.PropTypes.node,
	},

	componentWillMount: function() {
	},

	getDefaultProps: function() {
		return {
			noBorders: false,
			className: "",
			isDisabled: false,
			isSecondaryAction: false,
			isBigButton: true,
			wrapperStyle: {},
			soundcloud: false,
			facebook: false,
			twitter: false,
		}
	},

	render: function() {
		return (
			<div
				className={
					"MASAS-button "
					+ (this.props.isSecondaryAction ? "secondary-button " : "")
					+ (this.props.className ? (" " + this.props.className + " ") : "")
					+ (this.props.isBigButton ? "MASAS-big-button " : "")
					+ (this.props.noBorders ? " no-borders " : "")
					+ (this.props.isDisabled ? " disabled " : "")
					+ (this.props.soundcloud ? " soundcloud-login-button" : "")
					+ (this.props.facebook ? " facebook-login-button" : "")
					+ (this.props.twitter ? " twitter-login-button" : "")
				}
				onClick={ !this.props.isDisabled ? this.props.onClick : ( () => {} ) }
				style={ this.props.wrapperStyle }>
				<div className={"wrapper"}>
					{
						this.props.soundcloud ?
							<img src="/static/img/MASAS_logo_soundcloud.svg" alt="soundcloud login" />
						:
							""
					}
					{
						this.props.facebook ?
							<img src="/static/img/facebook.svg" className="facebook-icon" alt="facebook login" />
						:
							""
					}
					{
						this.props.twitter ?
							<img src="/static/img/facebook.svg" alt="twitter login" />
						:
							""
					}
					{ this.props.children }
				</div>
			</div>
		)
	}
})

module.exports = Button
