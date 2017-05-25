import {
	changeBgState,
	changeModalContent,
	closeAndEmptyMainModal,
	toogleIsModalOpened,
	updateModalType,
	updatePageTitle,
} from '../../reducers/actions/App.js'

import {
	updateIsConnectedSC,
	updateMasasUserTracks,
	updateSCUserTracks,
	updateSCUsername,
} from '../../reducers/actions/UploadSC.js'

import { Body } from '../UI/UI.jsx'
import { NoSCSongs } from './NoSCSongs.jsx'
import { PickTimeUpload } from './PickTimeUpload.jsx'
import PropTypes from 'prop-types'
import React from 'react'
import { UploadSCHome } from './UploadSCHome.jsx'
import { UploadSCItem } from './UploadSCItem.jsx'
import { UploadSCSongTable } from './UploadSCSongTable.jsx'
import { connect } from 'react-redux'
import { getUserTracks } from './ajaxCalls.jsx'



/**
 * Redux container
 */

const reduxStatePropTypes = {
	MASASuser: PropTypes.string,
	SCusername: PropTypes.string,
	choosingTime: PropTypes.object,
	isConnectedSoundcloud: PropTypes.bool,
	isModalOpened: PropTypes.bool,
	masasUserTracks: PropTypes.array,
	modalType: PropTypes.number,
	soundcloudUserTracks: PropTypes.array,
	userData: PropTypes.object,
	userPk: PropTypes.string,

}

const mapStateToProps = function(state) {
	return {
		MASASuser: state.appReducer.MASASuser,
		userPk: state.appReducer.MASASuserPk,
		userData: state.appReducer.userData,
		modalType: state.appReducer.modalType,
		isModalOpened: state.appReducer.isModalOpened,
		choosingTime: state.uploadSCReducer.choosingTime,
		soundcloudUserTracks: state.uploadSCReducer.soundcloudUserTracks,
		masasUserTracks: state.uploadSCReducer.masasUserTracks,
		SCusername:  state.uploadSCReducer.SCusername,
		isConnectedSoundcloud: state.uploadSCReducer.isConnectedSoundcloud,
	}
}

const reduxDispatchPropTypes = {
	blurBg: PropTypes.func,
	blurMobileBr: PropTypes.func,
	getUserSCTracks: PropTypes.func,
	getUserTracks: PropTypes.func,
	saturateBg: PropTypes.func,
	toogleModal: PropTypes.func,
	updateIsConnectedSC: PropTypes.func,
	updateMasasUserTracks: PropTypes.func,
	updateModalContent: PropTypes.func,
	updateModalType: PropTypes.func,
	updateSCusername: PropTypes.func,
	updateSoundcloudUserTracks: PropTypes.func,
	updateTitle: PropTypes.func,

}

const mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch(updatePageTitle(title, pageType)),
		toogleModal: () => dispatch(toogleIsModalOpened()),
		updateModalContent: (modalContent, modalType) => dispatch(changeModalContent(modalContent, modalType)),
		updateModalType: (modalType) => dispatch(updateModalType(modalType)),
		closeModal: () => dispatch(closeAndEmptyMainModal()),
		updateSoundcloudUserTracks: (soundcloudUserTracks) => dispatch(updateSCUserTracks(soundcloudUserTracks)),
		updateMasasUserTracks: (masasUserTracks) => dispatch(updateMasasUserTracks(masasUserTracks)),
		updateSCusername: (SCusername) => dispatch(updateSCUsername(SCusername)),
		updateIsConnectedSC: (isConnectedSoundcloud) => dispatch(updateIsConnectedSC(isConnectedSoundcloud)),
		getUserTracks: (userPk, success, error) => getUserTracks(userPk, success, error),
		blurBg: (blur) => dispatch(changeBgState.blur(blur)),
		saturateBg: (sat) => dispatch(changeBgState.saturate(sat)),
		blurMobileBr: (blur) => dispatch(changeBgState.blurMobile(blur)),
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

class UploadSCSmart extends React.Component {
    constructor(props) {
        super(props)

		this.connectToSC = this.connectToSC.bind(this)
		this.updateBackgroundFilter = this.updateBackgroundFilter.bind(this)
		this.getUserSCTracks = this.getUserSCTracks.bind(this)
		this.getUserTracks = this.getUserTracks.bind(this)
		this.tracksTable = this.tracksTable.bind(this)
		this.logoutSC = this.logoutSC.bind(this)
    }

	componentWillMount() {
		this.props.updateTitle('Upload', '0')
		if(this.props.isConnectedSoundcloud)
			this.getUserTracks()

	}

	componentWillUnmount() {
		this.props.blurBg(false)
		this.props.blurMobileBr(false)
	}

	componentDidMount() {
		this.updateBackgroundFilter()
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.choosingTime !== nextProps.choosingTime && nextProps.choosingTime === null)
			this.props.updateTitle('Upload', '0')

		// update masas user track prop to have the sync icon updatd in real time
		if(this.props.choosingTime !== nextProps.choosingTime)
			this.getUserTracks()

		this.updateBackgroundFilter()
	}

	updateBackgroundFilter() {
		if(this.props.choosingTime)
			this.props.blurBg(false)
		else if(this.props.isConnectedSoundcloud) {
			this.props.blurBg(false)
			this.props.blurMobileBr(true)
		} else {
			this.props.blurBg(false)
			this.props.blurMobileBr(true)
		}
	}


	getUserSCTracks() {
		SC.get(document.MASAS.SC.tracks_uri, {limit: 100}).then( (response) => {  // async call to SC servers
		// SC.get("me/tracks", {limit: 100}).then( (response) => {  // for dev tests
			this.props.updateSoundcloudUserTracks(response)
		})
	}

	connectToSC() {
		SC.connect().then( () => {
			this.props.updateIsConnectedSC(true)
			SC.get('/me').then( (r) => {
				// store suername for mobile
				this.props.updateSCusername(r.username)

				// get user track (first from MASAS API (requires log in) and then from SC API)
				this.getUserTracks()
			}).catch( () => {
				this.props.updateSCusername(null)
			})
			this.getUserTracks()
		}).catch( (error) => alert('Error: ' + error.message) )
	}

	tracksTable() {
		if (this.props.soundcloudUserTracks)
			return this.props.soundcloudUserTracks.map((track) => {
				var synced = false
				if(this.props.masasUserTracks.filter(function(song) { return song.SC_ID === track.id }).length)
					synced = true

				return <UploadSCItem
						key={ track.id }
						track={ track }
						synced={ synced }
						streamable={ track.streamable }
						public={ track.sharing === 'public' ? true : false } />
			})
	}

	logoutSC() {
		location.reload()
	}


	getUserTracks() {
		var success =  (data) => {
			this.props.updateMasasUserTracks(data.songs)
			this.getUserSCTracks()
		}

		var error = () => {
		}

		this.props.getUserTracks(this.props.userPk, success, error)
	}

	render() {
		let content = <div></div>
		let title = ''
		let pageNumber = 1

		if(this.props.choosingTime) {
			content = (
					<PickTimeUpload
						logoutSC={ this.logoutSC } />
			)
			title = 'When do you want this sound to play?'
			pageNumber = 3
		} else {
			if(this.props.isConnectedSoundcloud && this.props.userPk) {
				if(this.props.soundcloudUserTracks) {
					if(this.props.soundcloudUserTracks.length === 0) {
						return (
							<Body>
								<NoSCSongs
									logoutSC={ this.logoutSC } />
							</Body>
						)
					} else {
						content = <UploadSCSongTable />
						title = 'Sync any tracks that you want!'
						pageNumber = 2
					}
				}
			} else {
				content = <UploadSCHome
					getUserTracks={ this.getUserTracks } />
				title = 'Get Featured on MASAS!'
				pageNumber = 1
			}
		}

		return (
			<Body wide={ true }>
				<div className="outer-upload-sc--wrapper">
					<div className="header">
						<h2>{ title }</h2>
						<div className="nav-dots" style={{ display: (this.props.isConnectedSoundcloud ? 'flex' : 'none') }}>
							<div className={ 'dot' + (pageNumber === 1 ? ' fill' : '') }></div>
							<div className={ 'dot' + (pageNumber === 2 ? ' fill' : '') }></div>
							<div className={ 'dot' + (pageNumber === 3 ? ' fill' : '') }></div>
						</div>
					</div>
					<div className="content">
						{ content }
					</div>
				</div>
			</Body>
		)
	}
}

UploadSCSmart.propTypes = smartPropTypes
UploadSCSmart.defaultProps = smartDefaultProps

const UploadSC = connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadSCSmart)

export {
	UploadSC,
}