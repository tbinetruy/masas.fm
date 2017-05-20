import React, { PropTypes } from 'react'
import { connect }from 'react-redux'

import {
	setPlayerProgressBar,
} from '../../reducers/actions/Footer.js'

/**
 * Redux container
 */

const reduxStatePropTypes = {
	SC_songInfo: PropTypes.object,
	progressBarWidth: PropTypes.number,
}

const mapStateToProps = function(state) {
	return {
		progressBarWidth: state.footerReducer.progressBar,
		SC_songInfo: state.playerReducer.SC_songInfo,
	}
}

const reduxDispatchPropTypes = {
	updateProgressBar: PropTypes.func,
}

const mapDispatchToProps = function(dispatch) {
	return {
		updateProgressBar: progress => dispatch(setPlayerProgressBar(progress)),
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

class ProgressBarSmart extends React.Component {
    constructor(props) {
        super(props)

		this.onSliderChange = this.onSliderChange.bind(this)
    }

	onSliderChange(e) {
		$('#jquery_jplayer_1').jPlayer('play', e.target.value / 100 * this.props.SC_songInfo.duration/1000)
		this.props.updateProgressBar(parseFloat(e.target.value))
	}

	render() {
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
}

ProgressBarSmart.propTypes = smartPropTypes
ProgressBarSmart.defaultProps = smartDefaultProps

const ProgressBar = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProgressBarSmart)

export {
	ProgressBar,
}
