import {
	changeBgState,
	updatePageTitle,
} from '../../reducers/actions/App.js'

import {
	changeModalContent,
	toogleIsModalOpened,
	updateSplashScreenLoginMessage,
} from '../../reducers/actions/App.js'

import {
	playRandomSong,
	toggleSongLike,
} from '../../reducers/actions/Player.js'

import { ArtworkLine } from '../Discover/ArtworkLine.jsx'
import { GenreAutocomplete } from './GenreAutocomplete.jsx'
import { Link } from '../UI/UI.jsx'
import { POPULAR } from '../../reducers/actions/Player.js'
import PropTypes from 'prop-types'
import React from 'react'
import { SplashScreen } from '../App/SplashScreen.jsx'
import { connect } from 'react-redux'
import { updateTipBar } from '../../reducers/actions/Header.js'




/**
 * Supporting component
 */
const VoteButtons = ({ dislikeSong, toggleSongLike }) => (
	<div className="vote--wrapper">
		<div className="dislike-button" onClick={ dislikeSong }>
			<img src="/static/img/vote/icon_dislike.svg" alt="dislike" />
		</div>
		<div className="like-button" onClick={ toggleSongLike }>
			<img src="/static/img/vote/icon_like.svg" alt="like" />
		</div>
	</div>
)

VoteButtons.propTypes = {
	dislikeSong: PropTypes.func,
	toggleSongLike: PropTypes.func,
}

/**
 * Redux container
 */

const reduxStatePropTypes = {
	MASASuser: PropTypes.string,
	songPlaying: PropTypes.string,
	userPk: PropTypes.string,
}

const mapStateToProps = function(state) {
	return {
		userPk: state.appReducer.MASASuserPk,
		MASASuser: state.appReducer.MASASuser,
		songPlaying: state.playerReducer.songPlaying,
	}
}

const reduxDispatchPropTypes = {
	blackBgFilter: PropTypes.func,
	playRandomSong: PropTypes.func,
	resetBgFilter: PropTypes.func,
	toggleSongLike: PropTypes.func,
	toogleModal: PropTypes.func,
	updateLoginMessage: PropTypes.func,
	updateModalContent: PropTypes.func,
	updateTipBar: PropTypes.func,
	updateTitle: PropTypes.func,
}

const mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch(updatePageTitle(title, pageType)),
		playRandomSong: () => dispatch(playRandomSong(POPULAR)),
		toggleSongLike: (userToken, songId) => dispatch(toggleSongLike(songId)),
		toogleModal: () => dispatch(toogleIsModalOpened()),
		updateLoginMessage: message => dispatch(updateSplashScreenLoginMessage(message)),
		updateModalContent: (modalContent, modalType) => dispatch(changeModalContent(modalContent, modalType)),
		blackBgFilter: () => dispatch(changeBgState.black()),
		resetBgFilter: () => dispatch(changeBgState.reset()),
		updateTipBar: (text, step, tipCTA) => dispatch(updateTipBar(text, step, tipCTA))
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

class PopularSmart extends React.Component {
    constructor(props) {
        super(props)

		this.state = {
			spinnerProgress: 0,
		}

		this.getContent = this.getContent.bind(this)
		this.dislikeSong = this.dislikeSong.bind(this)
		this.showLoginModal = this.showLoginModal.bind(this)
		this.toggleSongLike = this.toggleSongLike.bind(this)
    }

	componentWillMount() {
		this.props.updateTitle('Discover', '0')

		// make black bg filter
		this.props.blackBgFilter()
	}

	componentDidMount() {
		// show crowdradio tip
		this.props.updateTipBar('You can influence the Crowdradio. Just vote!', 10, <Link to="/upload">or Upload</Link>)
	}

	componentWillUnmount() {
		// reset bg filter
		this.props.resetBgFilter()

		// hide crowdradio tip
		this.props.updateTipBar('')
	}

	getContent() {
		const content = (
				<div className="popular-content--wrapper">
					<GenreAutocomplete />
					<ArtworkLine
						playFromPopular={ true } />
					<VoteButtons
						dislikeSong={ this.dislikeSong }
						toggleSongLike={ this.toggleSongLike } />
				</div>
			)

		return content
	}

	showLoginModal(message) {
		this.props.updateLoginMessage(message)
		this.props.updateModalContent(<SplashScreen startPage={1} />, 3)
		this.props.toogleModal()
	}

	toggleSongLike() {
        if(this.props.MASASuser === '')
			this.showLoginModal('Please log-in to Like & Save songs')
		else
			this.props.toggleSongLike(this.props.MASASuser, this.props.songPlaying)
	}

	dislikeSong() {
		if(this.props.MASASuser === '')
			this.showLoginModal('Please log-in to Downvote songs')
		else
			this.props.playRandomSong()
	}

	render() {
		return (
			<div className="popular--wrapper">
				{
					this.getContent()
				}
			</div>
		)
	}
}


PopularSmart.propTypes = smartPropTypes
PopularSmart.defaultProps = smartDefaultProps

const Popular = connect(
    mapStateToProps,
    mapDispatchToProps
)(PopularSmart)

export {
	Popular,
}
