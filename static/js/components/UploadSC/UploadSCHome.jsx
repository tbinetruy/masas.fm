import {
	changeModalContent,
	toogleIsModalOpened,
	updateSplashScreenLoginMessage,
} from '../../reducers/actions/App.js'

import {
	updateIsConnectedSC,
	updateMasasUserTracks,
	updateSCUserTracks,
	updateSCUsername,
} from '../../reducers/actions/UploadSC.js'

import { Button } from '../UI/UI.jsx'
import PropTypes from 'prop-types'
import React from 'react'
import { SplashScreen } from '../App/SplashScreen.jsx'
import { connect } from 'react-redux'
import { updateProfilePicture } from '../../reducers/actions/Login.js'


const BulletPoint = ({ imgSrc, text }) => (
	<div className='bullet-point--wrapper'>
		<img src={ imgSrc } alt="image" />
		<p>
			{ text}
		</p>
	</div>
)

BulletPoint.propTypes = {
	imgSrc: PropTypes.string.isRequired,	// img source
	text: PropTypes.string.isRequired,	// text to display
}

/**
 * Redux container
 */

const reduxStatePropTypes = {
	MASASuser: PropTypes.string,
	userPk: PropTypes.string,
}

const mapStateToProps = function(state) {
	return {
		MASASuser: state.appReducer.MASASuser,
		userPk: state.appReducer.MASASuserPk,
	}
}

const reduxDispatchPropTypes = {
	toogleModal: PropTypes.func,
	updateIsConnectedSC: PropTypes.func,
	updateLoginMessage: PropTypes.func,
	updateMasasUserTracks: PropTypes.func,
	updateModalContent: PropTypes.func,
	updateProfilePicture: PropTypes.func,
	updateSCusername: PropTypes.func,
	updateSoundcloudUserTracks: PropTypes.func,
}

const mapDispatchToProps = function(dispatch) {
	return {
		toogleModal: () => dispatch(toogleIsModalOpened()),
		updateLoginMessage: message => dispatch(updateSplashScreenLoginMessage(message)),
		updateModalContent: (modalContent, modalType) => dispatch(changeModalContent(modalContent, modalType)),
		updateIsConnectedSC: (isConnectedSoundcloud) => dispatch(updateIsConnectedSC(isConnectedSoundcloud)),
		updateSCusername: (SCusername) => dispatch(updateSCUsername(SCusername)),
		updateMasasUserTracks: (masasUserTracks) => dispatch(updateMasasUserTracks(masasUserTracks)),
		updateSoundcloudUserTracks: (soundcloudUserTracks) => dispatch(updateSCUserTracks(soundcloudUserTracks)),
		updateProfilePicture: isDefaultPicture => dispatch(updateProfilePicture(isDefaultPicture))
	}
}


/**
 * Smart component
 */

const smartPropTypes = {
	...reduxStatePropTypes,
	...reduxDispatchPropTypes,

	getUserTracks: PropTypes.func,		// parent getUserTracks
}

const smartDefaultProps = {
}

class UploadSCHomeSmart extends React.Component {
    constructor(props) {
        super(props)

		this.connectToSC = this.connectToSC.bind(this)
    }

	connectToSC() {
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
	}

	render() {
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
}

UploadSCHomeSmart.propTypes = smartPropTypes
UploadSCHomeSmart.defaultProps = smartDefaultProps

const UploadSCHome = connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadSCHomeSmart)


export {
	UploadSCHome,
}
