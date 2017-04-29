var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/Popular.jsx")


var { BlurBackground } = require("../MASAS_mixins.jsx")

var ArtworkLine = require("../Discover/ArtworkLine.jsx")
var PopularTimer = require("./PopularTimer.jsx")


var Popular = React.createClass({
	mixins: [ BlurBackground ],

	propTypes: {
		userPk: React.PropTypes.string,
		MASASuser: React.PropTypes.string,
		songPlaying: React.PropTypes.string,


		updateTitle: React.PropTypes.func,
		playRandomSong: React.PropTypes.func,
		toggleSongLike: React.PropTypes.func,
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
						playFromPopular={ true }/>
				</div>
			)

		return content
	},

	render: function() {

		return (
			<div className="popular--wrapper">
				{
					this.getContent()
				}
				<div className="vote--wrapper">
					<div className="dislike-button" onClick={ this.props.playRandomSong }>
						<img src="/static/img/vote/icon_dislike.svg" alt="dislike" />
					</div>
					<div className="like-button" onClick={ () => this.props.toggleSongLike(this.props.MASASuser, this.props.songPlaying) }>
						<img src="/static/img/vote/icon_like.svg" alt="like" />
					</div>
				</div>
			</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(Popular)
