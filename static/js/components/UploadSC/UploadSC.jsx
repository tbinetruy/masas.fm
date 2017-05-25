import {
	mapDispatchToProps,
	mapStateToProps,
} from './containers/UploadSC.jsx'

import * as createClass from 'create-react-class'
import { Body } from '../UI/UI.jsx'
import { NoSCSongs } from './NoSCSongs.jsx'
import { PickTimeUpload } from './PickTimeUpload.jsx'
import PropTypes from 'prop-types'
import React from 'react'
import { UploadSCHome } from './UploadSCHome.jsx'
import { UploadSCItem } from './UploadSCItem.jsx'
import { UploadSCSongTable } from './UploadSCSongTable.jsx'
import { connect } from 'react-redux'



let UploadSC = createClass({
	propTypes: {
		MASASuser: PropTypes.string,
		SCusername: PropTypes.string,
		blurBg: PropTypes.func,
		blurMobileBr: PropTypes.func,
		choosingTime: PropTypes.object,
		getUserSCTracks: PropTypes.func,
		getUserTracks: PropTypes.func,
		isConnectedSoundcloud: PropTypes.bool,
		isModalOpened: PropTypes.bool,
		masasUserTracks: PropTypes.array,
		modalType: PropTypes.number,
		saturateBg: PropTypes.func,
		soundcloudUserTracks: PropTypes.array,
		toogleModal: PropTypes.func,
		updateIsConnectedSC: PropTypes.func,
		updateMasasUserTracks: PropTypes.func,
		updateModalContent: PropTypes.func,
		updateModalType: PropTypes.func,
		updateSCusername: PropTypes.func,
		updateSoundcloudUserTracks: PropTypes.func,
		updateTitle: PropTypes.func,
		userData: PropTypes.object,
		userPk: PropTypes.string,
	},

	componentWillMount: function() {
		this.props.updateTitle('Upload', '0')
		if(this.props.isConnectedSoundcloud)
			this.getUserTracks()

	},

	componentWillUnmount: function() {
		this.props.blurBg(false)
		this.props.blurMobileBr(false)
	},

	componentDidMount: function() {
		this.updateBackgroundFilter()
	},

	updateBackgroundFilter: function() {
		if(this.props.choosingTime)
			this.props.blurBg(false)
		else if(this.props.isConnectedSoundcloud) {
			this.props.blurBg(false)
			this.props.blurMobileBr(true)
		} else {
			this.props.blurBg(false)
			this.props.blurMobileBr(true)
		}
	},


	getUserSCTracks: function() {
		SC.get(document.MASAS.SC.tracks_uri, {limit: 100}).then( (response) => {  // async call to SC servers
		// SC.get("me/tracks", {limit: 100}).then( (response) => {  // for dev tests
			this.props.updateSoundcloudUserTracks(response)
		})
	},

	connectToSC: function() {
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
	},

	tracksTable: function() {
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
	},

	logoutSC: function() {
		location.reload()
	},

	componentWillReceiveProps: function(nextProps) {
		if(this.props.choosingTime !== nextProps.choosingTime && nextProps.choosingTime === null)
			this.props.updateTitle('Upload', '0')

		// update masas user track prop to have the sync icon updatd in real time
		if(this.props.choosingTime !== nextProps.choosingTime)
			this.getUserTracks()

		this.updateBackgroundFilter()
	},

	getUserTracks: function() {
		var success =  (data) => {
			this.props.updateMasasUserTracks(data.songs)
			this.getUserSCTracks()
		}

		var error = () => {
		}

		this.props.getUserTracks(this.props.userPk, success, error)
	},

	render: function() {
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
})

UploadSC = connect(
	mapStateToProps,
	mapDispatchToProps
)(UploadSC)

export {
	UploadSC,
}