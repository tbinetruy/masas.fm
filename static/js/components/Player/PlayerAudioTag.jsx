/**
 * mounts audio tag into dom and initializes jPlayer
 *
 * need to remove jquery dependency
 */

import React from 'react'
import { connect } from 'react-redux'

import { SILENT_SOUND_SRC } from './PlayerBar.jsx'


/**
 * Redux container
 */

const reduxStatePropTypes = {

}

const mapStateToProps = function(state) {
	return {
	}
}

const reduxDispatchPropTypes = {

}

const mapDispatchToProps = function(dispatch) {
	return {
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

class PlayerAudioTagSmart extends React.Component {
    constructor(props) {
        super(props)
    }

	componentDidMount() {
		$('#jquery_jplayer_1').jPlayer({
			ready: function() {
				var streamURL = SILENT_SOUND_SRC

				$(this).jPlayer('setMedia', {
					mp3: streamURL,
					oga: ''
				})

				var click = document.ontouchstart === undefined ? 'click' : 'touchstart'
				var kickoff = function () {
					$('#jquery_jplayer_1').jPlayer('play')
					document.documentElement.removeEventListener(click, kickoff, true)
				}
				document.documentElement.addEventListener(click, kickoff, true)
			},

			keyBindings: {
				play: {
					key: 32,
					fn: function(f) {
						if(f.status.paused) {
							f.play()
						} else {
							f.pause()
						}
					}
				}
			},
			swfPath: 'http://jplayer.org/latest/dist/jplayer',
			supplied: 'mp3, oga',
			wmode: 'window',
			useStateClassSkin: true,
			autoBlur: false,
			smoothPlayBar: true,
			keyEnabled: true,
			remainingDuration: true,
			toggleDuration: true
		})
	}

	render() {
		return (
			<div id="jquery_jplayer_1">
			</div>
		)
	}
}

PlayerAudioTagSmart.propTypes = smartPropTypes
PlayerAudioTagSmart.defaultProps = smartDefaultProps

const PlayerAudioTag = connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerAudioTagSmart)

export {
	PlayerAudioTag,
}
