var React = require('react')

var ReactRedux = require('react-redux')
var { mapStateToProps, mapDispatchToProps } = require('./containers/ProgressBar.jsx')

// var {goToURL} = require("../../MASAS_functions.jsx")
// import { BlurBackground } from "../MASAS_mixins.jsx"
// var { Link } = require("../UI/UI.jsx")
// var { browserHistory } = require('react-router')


var ProgressBar = React.createClass({
	propTypes: {
		SC_songInfo: React.PropTypes.object,
		progressBarWidth: React.PropTypes.number,

		updateProgressBar: React.PropTypes.func,
	},

	componentWillMount: function() {
	},

	onSliderChange: function(e) {
		$('#jquery_jplayer_1').jPlayer('play', e.target.value / 100 * this.props.SC_songInfo.duration/1000)
		this.props.updateProgressBar(parseFloat(e.target.value))
	},

	render: function() {
		return (
			<div className="player-progress-bar--wrapper">
					<div className="select-range">
						<input
							type="range"
							value={ this.props.progressBarWidth }
							onChange={ this.onSliderChange }
							className="MASAS-slider" />
					</div>
					<div className="playerProgressBar--wrapper">
						<div className="playerProgressBar" style={{width: this.props.progressBarWidth + '%' }}>
						</div>
						<div className="bufferingBar--wrapper">
							<div className={ 'bufferingBar' + (this.props.isBuffering ? ' buffering' : '')}>
							</div>
						</div>
					</div>
			</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(ProgressBar)
