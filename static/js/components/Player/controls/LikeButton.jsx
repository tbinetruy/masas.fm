import React, { PropTypes } from 'react'
import { connect }from 'react-redux'

import { toggleSongLike } from '../../../reducers/actions/Player.js'

import {
	changeModalContent,
	toogleIsModalOpened,
	updateSplashScreenLoginMessage,
} from '../../../reducers/actions/App.js'

import { SplashScreen } from '../../App/SplashScreen.jsx'

/**
 * Redux container
 */

const reduxStatePropTypes = {
    MASASuser: PropTypes.string,
    isModalOpened: PropTypes.bool,
    isSongPlayingLiked: PropTypes.bool,
    modalType: PropTypes.number,
    songPlaying: PropTypes.string,
    userData: PropTypes.object,
}

const mapStateToProps = function(state) {
	return {
		isModalOpened: state.appReducer.isModalOpened,
		modalType: state.appReducer.modalType,
		userData: state.appReducer.userData,
		isSongPlayingLiked: state.playerReducer.isSongPlayingLiked,
		MASASuser: state.appReducer.MASASuser,
		songPlaying: state.playerReducer.songPlaying,
	}
}

const reduxDispatchPropTypes = {
    toggleSongLike: PropTypes.func,
    toogleModal: PropTypes.func,
    updateLoginMessage: PropTypes.func,
    updateModalContent: PropTypes.func,
}

const mapDispatchToProps = function(dispatch) {
	return {
		toggleSongLike: (userToken, songId) => dispatch(toggleSongLike(songId)),
		toogleModal: () => dispatch(toogleIsModalOpened()),
		updateLoginMessage: message => dispatch(updateSplashScreenLoginMessage(message)),
		updateModalContent: (modalContent, modalType) => dispatch(changeModalContent(modalContent, modalType)),
	}
}


/**
 * Smart component
 */
const smartPropTypes = {
	...reduxStatePropTypes,
	...reduxDispatchPropTypes,
}

class LikeButtonSmart extends React.Component {
    constructor(props) {
        super(props)

		this.getLikeButton = this.getLikeButton.bind(this)
    }

	getLikeButton() {
		if(this.props.isModalOpened && this.props.modalType === 2) {
			if(isObjectNotEmpty(this.props.userData)) {
				// if user has not dismissed tips yet
				const didUserSeeFirstTip = this.props.userData.usersteps.filter(({ step }) => step === 5).length ? true : false

				if(didUserSeeFirstTip)
					return <img
							src="/static/img/dynamic_like_icon.gif"
							alt="like icon"
							className="like-icon"
							onClick={this.props.toggleSongLike.bind(this, this.props.MASASuser, this.props.songPlaying)}
							style={{ height: '1.8rem' }} />

			}
		}

		// user not logged in => return login modal with message
		if(this.props.MASASuser === '')
			return (
				<img
					src="/static/img/vote/icon_like.svg"
					alt="like icon"
					className="like-icon"
					onClick={
						() => {
							this.props.updateLoginMessage(
								'Please log-in to Like & Save songs'
							)
							this.props.updateModalContent(<SplashScreen startPage={1} />, 3)
							this.props.toogleModal()
						}
					} />
			)
		// user is logged in => show correct icon (liked/unliked alreaday) and correct callback
		else
			return (
				<img
					src="/static/img/vote/icon_like.svg"
					alt="like icon"
					className="like-icon"
					onClick={
						this.props.toggleSongLike.bind(this, this.props.MASASuser, this.props.songPlaying)
					} />
			)
	}

	render() {
		return (
			<div className="like-button-component--wrapper">
                { this.getLikeButton() }
			</div>
		)
	}
}

LikeButtonSmart.propTypes = smartPropTypes

const LikeButton = connect(
    mapStateToProps,
    mapDispatchToProps
)(LikeButtonSmart)

export {
    LikeButton
}

