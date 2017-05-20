import React, { PropTypes } from 'react'
import { connect }from 'react-redux'

import {
	playRandomSong,
	toggleSongLike,
} from '../../../reducers/actions/Player.js'

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
    songPlaying: PropTypes.string,
}

const mapStateToProps = function(state) {
	return {
		MASASuser: state.appReducer.MASASuser,
		songPlaying: state.playerReducer.songPlaying,
	}
}

const reduxDispatchPropTypes = {
    toogleModal: PropTypes.func,
    updateModalContent: PropTypes.func,
    updateLoginMessage: PropTypes.func,
}

const mapDispatchToProps = function(dispatch) {
	return {
		playRandomSong: () => dispatch(playRandomSong(POPULAR)),
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

const smartDefaultProps = {
}

class DislikeButtonSmart extends React.Component {
    constructor(props) {
        super(props)

		this.showLoginModal = this.showLoginModal.bind(this)
		this.dislikeSong = this.dislikeSong.bind(this)
    }

	showLoginModal(message) {
		this.props.updateLoginMessage(message)
		this.props.updateModalContent(<SplashScreen startPage={1} />, 3)
		this.props.toogleModal()
	}

	dislikeSong() {
		if(this.props.MASASuser === '')
			this.showLoginModal('Please log-in to Downvote songs')
		else
			this.props.playRandomSong()
	}

	render() {
		return (
			<div
                className="dislike-button-component--wrapper"
                onClick={ this.dislikeSong }>
                <img src="/static/img/vote/icon_dislike.svg" className="dislike-icon" alt="dislike song" />
			</div>
		)
	}
}

DislikeButtonSmart.propTypes = smartPropTypes
DislikeButtonSmart.defaultProps = smartDefaultProps

const DislikeButton = connect(
    mapStateToProps,
    mapDispatchToProps
)(DislikeButtonSmart)

export {
    DislikeButton
}

