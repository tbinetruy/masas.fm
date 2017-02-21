var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/UploadSCHome.jsx")

var SplashScreen = require("../App/SplashScreen.jsx")


var { Button, Body } = require("../UI/UI.jsx")

// var {goToURL} = require("../../MASAS_functions.jsx")
// import { BlurBackground } from "../MASAS_mixins.jsx"
// var { Link } = require("../UI/UI.jsx")
// var { browserHistory } = require('react-router')

// var Template = (props) => {

// }

var UploadSCHome = React.createClass({
	propTypes: {
		MASASuser: React.PropTypes.string,
		userPk: React.PropTypes.string,

		updateModalContent: React.PropTypes.func,
		toogleModal: React.PropTypes.func,
		updateIsConnectedSC: React.PropTypes.func,
		updateSCusername: React.PropTypes.func,
		getUserTracks: React.PropTypes.func,
		updateMasasUserTracks: React.PropTypes.func,
		updateSoundcloudUserTracks: React.PropTypes.func,
		updateLoginMessage: React.PropTypes.func,
		updateProfilePicture: React.PropTypes.func,
	},

	componentWillMount: function() {
	},

	connectToSC: function() {
		SC.connect().then( () => {
			this.props.updateIsConnectedSC(true)
			SC.get('/me').then( r => {
				// store suername for mobile
				this.props.updateSCusername(r.username)

				// get user track (first from MASAS API (requires log in) and then from SC API)
				this.props.getUserTracks()

				// update profile picture with soundcloud account
				this.props.updateProfilePicture(r.avatar_url.replace('large.jpg', 't500x500.jpg'))
			}).catch( () => {
				this.props.updateSCusername(null)
			})
			this.props.getUserTracks()
		}).catch( (error) => alert('Error: ' + error.message) )
	},



	render: function() {
		return (
					<div className="description">
						
							<p className="description-paragraph">Your music will first play in Discover - When the community likes it, 
you'll get featured!</p>
						
						
						<div className="img-container">
						</div>

						{
							this.props.MASASuser !== "" ?
								<div className="connect-button">
									<Button
										onClick={ this.connectToSC }
										isBigButton={ true }
										soundcloud={ true }>Login via SoundCloud</Button>
								</div>
							:
								<div className="connect-button">
									<Button
										onClick={ () => {
											this.props.toogleModal()
											this.props.updateLoginMessage("Please log-in to upload your music")
											this.props.updateModalContent(<SplashScreen startPage={ 1 } />, 3)
										} }
										isBigButton={ true }>Log-in to Upload</Button>
									<div className="button-subtitle">It's free!</div>
								</div>
						}
					</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(UploadSCHome)
