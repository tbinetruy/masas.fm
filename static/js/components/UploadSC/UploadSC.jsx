import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { Body } from '../UI/UI.jsx'
import { UploadSCItem } from './UploadSCItem.jsx'
import { PickTimeUpload } from './PickTimeUpload.jsx'
import { UploadSCHome } from './UploadSCHome.jsx'
import { UploadSCSongTable } from './UploadSCSongTable.jsx'
import { NoSCSongs } from './NoSCSongs.jsx'

import {
	mapDispatchToProps,
	mapStateToProps,
} from './containers/UploadSC.jsx'


let UploadSC = React.createClass({
	propTypes: {
		MASASuser: React.PropTypes.string,
		SCusername: React.PropTypes.string,
		blurBg: React.PropTypes.func,
		blurMobileBr: React.PropTypes.func,
		choosingTime: React.PropTypes.object,
		getUserSCTracks: React.PropTypes.func,
		getUserTracks: React.PropTypes.func,
		isConnectedSoundcloud: React.PropTypes.bool,
		isModalOpened: React.PropTypes.bool,
		masasUserTracks: React.PropTypes.array,
		modalType: React.PropTypes.number,
		saturateBg: React.PropTypes.func,
		soundcloudUserTracks: React.PropTypes.array,
		toogleModal: React.PropTypes.func,
		updateIsConnectedSC: React.PropTypes.func,
		updateMasasUserTracks: React.PropTypes.func,
		updateModalContent: React.PropTypes.func,
		updateModalType: React.PropTypes.func,
		updateSCusername: React.PropTypes.func,
		updateSoundcloudUserTracks: React.PropTypes.func,
		updateTitle: React.PropTypes.func,
		userData: React.PropTypes.object,
		userPk: React.PropTypes.string,
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