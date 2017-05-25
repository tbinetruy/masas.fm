import {
	changeModalContent,
	toogleIsModalOpened,
} from '../../reducers/actions/App.js'

import { Marquee } from '../UI/UI.jsx'
import PropTypes from 'prop-types'
import React from 'react'
import { SCSyncInstructionModal } from './SCSyncInstructionModal.jsx'
import { connect } from 'react-redux'

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
	chooseTime: PropTypes.func,
	toogleModal: PropTypes.func,
	updateModalContent: PropTypes.func,
}

const mapDispatchToProps = function(dispatch) {
	return {
		chooseTime: (song) => dispatch({type:'SYNC_SONG', song: song}),
		toogleModal: () => dispatch(toogleIsModalOpened()),
		updateModalContent: (modalContent, modalType) => dispatch(changeModalContent(modalContent, modalType)),
	}
}


/**
 * Smart component
 */

const smartPropTypes = {
	...reduxStatePropTypes,
	...reduxDispatchPropTypes,

	public: PropTypes.bool, 			// is song public
	streamable: PropTypes.bool,		// is song streamable
	synced: PropTypes.bool	,		// is song synced
	track: PropTypes.object,		// song info
}

const smartDefaultProps = {
}

class UploadSCItemSmart extends React.Component {
    constructor(props) {
        super(props)

		this.showSyncScreen = this.showSyncScreen.bind(this)
		this.showTrackStatus = this.showTrackStatus.bind(this)
		this.showSyncInfoModal = this.showSyncInfoModal.bind(this)
    }

	showSyncScreen() {
		this.props.chooseTime(this.props.track)
	}

	showTrackStatus() {
		if(!this.props.streamable || !this.props.public)
			return '?'

		if(this.props.synced)
			return 'synced'
		else
			return <img src="/static/img/MASAS_sync_off.svg" alt="sync" onClick={this.showSyncScreen} />
	}

	// show modal with info as to why song is not synchronizable
	showSyncInfoModal() {
		this.props.updateModalContent(<SCSyncInstructionModal />, 4)
		this.props.toogleModal()
	}

	render() {
		const millisToMinutesAndSeconds = function(millis) {
			var minutes = Math.floor(millis / 60000)
			var seconds = ((millis % 60000) / 1000).toFixed(0)
			return minutes + ':' + (seconds < 10 ? '0' : '') + seconds // millisToMinutesAndSeconds(298999) =>  "4:59"
		}

		return (
			<div className={'upload-sc-item--wrapper' + (this.props.synced ? ' synced ' : '')  + (!this.props.streamable || !this.props.public ? ' non-synchronizable ' : '') }>
				<div
					className={  'upload-sc-item-overlay--wrapper' }>
					<div className="artwork--wrapper">
						{
							this.props.track.artwork_url ?
								<img src={this.props.track.artwork_url} alt="artwork" />
							:
								''
						}
					</div>
					<div className="song-info--wrapper">
						<div className="song-name">
							<Marquee>{this.props.track.title}</Marquee>
						</div>
						<div className="song-stats">
							<span className="number-listens">
								<img src="/static/img/MASAS_logo_tunes.svg" alt="music-not-icon" />
								{ this.props.track.playback_count }
							</span>
							<span>{ millisToMinutesAndSeconds(this.props.track.duration) }</span>
						</div>
						<a
							href={ this.props.track.permalink_url }
							className="sc-link"
							target="_blank">
							<img src="/static/img/MASAS_logo_soundcloud.svg" alt="soundcloud" />
						</a>
					</div>
				</div>
				<div
					className="sync--wrapper"
					onClick={ () => ( !this.props.public || !this.props.streamable ? this.showSyncInfoModal() : 0 ) }>
					{ this.showTrackStatus() }
				</div>
			</div>
		)
	}
}

UploadSCItemSmart.propTypes = smartPropTypes
UploadSCItemSmart.defaultProps = smartDefaultProps

const UploadSCItem= connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadSCItemSmart)

export {
	UploadSCItem,
}