var React = require('react')

var ReactRedux = require('react-redux')
var { mapStateToProps, mapDispatchToProps } = require('./containers/PlayerMobile.jsx')

var { PlayerBar } = require('./PlayerBar.jsx')

var { browserHistory } = require('react-router')

var { getUserPkFromURL } = require('../../MASAS_functions.jsx')

import ProgressBar from '../Footer/ProgressBar.jsx'
import PlayingArtwork from './PlayingArtwork.jsx'


const PlayerMobile = React.createClass({
	propTypes: {
		MASAS_songInfo: React.PropTypes.object,
		isPlayerMobileShown: React.PropTypes.bool,
		showPlayerMobile: React.PropTypes.func,
		updateProfileBackArrowFunc: React.PropTypes.func,
	},

	componentWillMount: function() {
	},

	redirectToProfile: function() {
		// push client to user page
		if(this.props.MASAS_songInfo)
			browserHistory.push('/user/' + getUserPkFromURL(this.props.MASAS_songInfo.trackArtist))

		// update back arrow function on Profile page so user can come back
		this.props.updateProfileBackArrowFunc( () => { browserHistory.goBack() } )

		// close player mobile
		this.props.showPlayerMobile(false)
	},

	render: function() {
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
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(PlayerMobile)