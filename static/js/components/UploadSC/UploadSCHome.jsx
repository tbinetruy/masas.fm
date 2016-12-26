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
	},

	componentWillMount: function() {
	},

	connectToSC: function() {
		SC.connect().then( () => {
			this.props.updateIsConnectedSC(true)
			SC.get('/me').then( (r) => {
				// store suername for mobile
				this.props.updateSCusername(r.username)

				// get user track (first from MASAS API (requires log in) and then from SC API)
				this.props.getUserTracks()
			}).catch( () => {
				this.props.updateSCusername(null)
			})
			this.props.getUserTracks()
		}).catch( (error) => alert('Error: ' + error.message) )
	},



	render: function() {
		return (
			<Body noBackground={ true }>
				<div className="connect-sc--wrapper">
					<div className="connect-sc--text">
						All the music shared on MASAS starts out in one of the Discover moods
					</div>
					<div className="connect-sc--text">
						if the community really <strong>Likes</strong> your songs, it will get featured on <strong>Popular</strong>!
					</div>

					{
						this.props.MASASuser !== "" ?
							<div className="connect-button">
								<Button
									onClick={ this.connectToSC }
									isBigButton={ true }
									soundcloud={ true }>Connect to SoundCloud</Button>
							</div>
						:
							<div className="connect-button">
								<Button
									onClick={ () => { this.props.toogleModal(); this.props.updateModalContent(<SplashScreen startPage={ 1 } />, 3) } }
									isBigButton={ true }>Log-in to Upload</Button>
								<div className="button-subtitle">It's free!</div>
							</div>
					}
				</div>
			</Body>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(UploadSCHome)
