var React = require('react')

var ReactRedux = require('react-redux')
var { mapStateToProps, mapDispatchToProps } = require('./containers/Popular.jsx')


var { BlurBackground } = require('../MASAS_mixins.jsx')

var ArtworkLine = require('../Discover/ArtworkLine.jsx')

import SplashScreen from '../App/SplashScreen.jsx'


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
	dislikeSong: React.PropTypes.func,
	toggleSongLike: React.PropTypes.func,
}

var Popular = React.createClass({
	mixins: [ BlurBackground ],

	propTypes: {
		MASASuser: React.PropTypes.string,
		playRandomSong: React.PropTypes.func,
		songPlaying: React.PropTypes.string,
		toggleSongLike: React.PropTypes.func,
		toogleModal: React.PropTypes.func,
		updateLoginMessage: React.PropTypes.func,
		updateModalContent: React.PropTypes.func,
		updateTitle: React.PropTypes.func,
		userPk: React.PropTypes.string,
	},

	getInitialState: function() {
		return {
			spinnerProgress: 0,
		};
	},

	componentWillMount: function() {
		this.props.updateTitle('Discover', '0')
	},

	componentDidMount: function() {
	},

	componentWillUnmount: function() {
	},

	getContent: function() {
		const content = (
				<div className="popular-content--wrapper">
					<ArtworkLine
						playFromPopular={ true } />
					<VoteButtons
						dislikeSong={ this.dislikeSong }
						toggleSongLike={ this.toggleSongLike } />
				</div>
			)

		return content
	},

	showLoginModal: function(message) {
		this.props.updateLoginMessage(message)
		this.props.updateModalContent(<SplashScreen startPage={1} />, 3)
		this.props.toogleModal()
	},

	toggleSongLike: function() {
        if(this.props.MASASuser === '')
			this.showLoginModal('Please log-in to Like & Save songs')
		else
			this.props.toggleSongLike(this.props.MASASuser, this.props.songPlaying)
	},

	dislikeSong: function() {
		if(this.props.MASASuser === '')
			this.showLoginModal('Please log-in to Downvote songs')
		else
			this.props.playRandomSong()
	},

	render: function() {
		return (
			<div className="popular--wrapper">
				{
					this.getContent()
				}
			</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(Popular)
