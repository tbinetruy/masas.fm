var React = require('react')

var ReactRedux = require('react-redux')
var { mapStateToProps, mapDispatchToProps } = require('./containers/UploadSCHome.jsx')

import { SplashScreen } from '../App/SplashScreen.jsx'


var { Button, Body, Link } = require('../UI/UI.jsx')

var { getPathList } = require('../../MASAS_functions.jsx')
// import { BlurBackground } from "../MASAS_mixins.jsx"
// var { Link } = require("../UI/UI.jsx")
// var { browserHistory } = require('react-router')

// var Template = (props) => {

// }

const BulletPoint = ({ imgSrc, text }) => (
	<div className='bullet-point--wrapper'>
		<img src={ imgSrc } alt="image" />
		<p>
			{ text}
		</p>
	</div>
)

BulletPoint.propTypes = {
	imgSrc: React.PropTypes.string.isRequired,	// img source
	text: React.PropTypes.string.isRequired,	// text to display
}

var UploadSCHome = React.createClass({
	propTypes: {
		MASASuser: React.PropTypes.string,
		getUserTracks: React.PropTypes.func,
		toogleModal: React.PropTypes.func,
		updateIsConnectedSC: React.PropTypes.func,
		updateLoginMessage: React.PropTypes.func,
		updateMasasUserTracks: React.PropTypes.func,
		updateModalContent: React.PropTypes.func,
		updateProfilePicture: React.PropTypes.func,
		updateSCusername: React.PropTypes.func,
		updateSoundcloudUserTracks: React.PropTypes.func,
		userPk: React.PropTypes.string,
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

                        <div className="bullet-point-list--wrapper">
							<BulletPoint
								imgSrc="/static/img/upload/icon_upload_1.png"
								text="Expose your sounds to the finest music community and get feedback"
								/>
							<BulletPoint
								imgSrc="/static/img/upload/icon_upload_2.png"
								text="Everyday, favorites from the community will be featured on the Crowdradio"
								/>
							<BulletPoint
								imgSrc="/static/img/upload/icon_upload_3.png"
								text="Get a chance to be featured on our next events and be contacted by independent labels"
								/>
						</div>
						{
							this.props.MASASuser !== '' ?
								<div className="connect-button">
									<Button
										onClick={ this.connectToSC }
										isBigButton={ true }
										soundcloud={ true }>Sync My SoundCloud</Button>
								</div>
							:
								<div className="connect-button">
									<Button
										onClick={ () => {
											this.props.toogleModal()
											this.props.updateLoginMessage('Please log-in to upload your music')
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
