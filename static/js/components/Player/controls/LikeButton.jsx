import * as React from "react"

import { connect }from "react-redux"


import {
	toggleSongLike,
} from "../../../reducers/actions/Player.js"

import {
	toogleIsModalOpened,
	changeModalContent,
	updateSplashScreenLoginMessage,
} from "../../../reducers/actions/App.js"

/**
 * Redux container
 */

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
class LikeButtonSmart extends React.Component {
    constructor(props) {
        super(props)
    }

	getLikeButton = () => {
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
							style={{ height: '1.8rem' }}/>

			}
		}

		// user not logged in => return login modal with message
		if(this.props.MASASuser === "")
			return (
				<img
					src="/static/img/MASAS_like_shadow.svg"
					alt="like icon"
					className="like-icon"
					onClick={
						() => {
							this.props.updateLoginMessage(
								"Please log-in to Like & Save songs"
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
					src={
						"/static/img/MASAS_like"
						+ (this.props.isSongPlayingLiked ? "d.svg" : "_shadow.svg")
					}
					alt="like icon"
					className="like-icon"
					onClick={
						this.props.toggleSongLike.bind(this, this.props.MASASuser, this.props.songPlaying)
					} />
			)
	}

	render = () => {
		return (
			<div className="like-button-component--wrapper">
                { this.getLikeButton() }
			</div>
		)
	}
}

LikeButtonSmart.propTypes = {
    isModalOpened: React.PropTypes.bool,
    modalType: React.PropTypes.number,
    userData: React.PropTypes.object,
    isSongPlayingLiked: React.PropTypes.bool,
    MASASuser: React.PropTypes.string,
    songPlaying: React.PropTypes.string,

    toogleModal: React.PropTypes.func,
    toggleSongLike: React.PropTypes.func,
    updateModalContent: React.PropTypes.func,
    updateLoginMessage: React.PropTypes.func,
}

const LikeButton = connect(
    mapStateToProps,
    mapDispatchToProps
)(LikeButtonSmart)

export {
    LikeButton
}

