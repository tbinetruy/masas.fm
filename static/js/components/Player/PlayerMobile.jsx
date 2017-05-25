import { Player as PlayerBar } from './PlayerBar.jsx'
import { PlayingArtwork } from './PlayingArtwork.jsx'
import { ProgressBar } from '../Footer/ProgressBar.jsx'
import PropTypes from 'prop-types'
import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { getUserPkFromURL } from '../../MASAS_functions.jsx'
import { showPlayerMobile } from '../../reducers/actions/App.js'
import { updateProfileBackArrowFunc } from '../../reducers/actions/Profile.js'


/**
 * Redux container
 */

const reduxStatePropTypes = {
	MASAS_songInfo: PropTypes.object,
	isPlayerMobileShown: PropTypes.bool,
}

const mapStateToProps = function(state) {
	return {
		MASAS_songInfo: state.playerReducer.MASAS_songInfo,
		isPlayerMobileShown: state.appReducer.isPlayerMobileShown,
	}
}

const reduxDispatchPropTypes = {
	showPlayerMobile: PropTypes.func,
	updateProfileBackArrowFunc: PropTypes.func,
}

const mapDispatchToProps = function(dispatch) {
	return {
		showPlayerMobile: choice => dispatch(showPlayerMobile(choice)),
		updateProfileBackArrowFunc: func => dispatch(updateProfileBackArrowFunc(func)),
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

class PlayerMobileSmart extends React.Component {
    constructor(props) {
        super(props)

		this.redirectToProfile = this.redirectToProfile.bind(this)
    }

	redirectToProfile() {
		// push client to user page
		if(this.props.MASAS_songInfo)
			browserHistory.push('/user/' + getUserPkFromURL(this.props.MASAS_songInfo.trackArtist))

		// update back arrow function on Profile page so user can come back
		this.props.updateProfileBackArrowFunc( () => { browserHistory.goBack() } )

		// close player mobile
		this.props.showPlayerMobile(false)
	}

	render() {
		return (
			<div className={ 'player-mobile--top-wrapper' + (this.props.isPlayerMobileShown ? ' show' : '') }>
				<div
					className='close-button--wrapper'
					onClick={ () => this.props.showPlayerMobile(false) }>
					<img src='/static/img/icon_close.svg' alt='close' />
				</div>
				<div className='header'>
					MASAS Player
				</div>
				<div className='player-mobile-discover--wrapper'>
					<PlayingArtwork onArtistClick={ this.redirectToProfile }/>
				</div>
                <div className='player-mobile-player--wrapper'>
					<ProgressBar />
					<PlayerBar
						isPlayerMobile={ true } />
				</div>
			</div>
		)
	}
}

PlayerMobileSmart.propTypes = smartPropTypes
PlayerMobileSmart.defaultProps = smartDefaultProps

const PlayerMobile = connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerMobileSmart)

export {
	PlayerMobile,
}