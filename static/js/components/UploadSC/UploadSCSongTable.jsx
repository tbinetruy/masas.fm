import React from 'react'
import PropTypes from 'prop-types'
import * as createClass from 'create-react-class'
import { connect } from 'react-redux'

import { mapDispatchToProps, mapStateToProps } from './containers/UploadSCSongTable.jsx'
import { Body } from '../UI/UI.jsx'
import { UploadSCItem } from './UploadSCItem.jsx'

var UploadSCSongTable = createClass({
	propTypes: {
		SCusername: PropTypes.string,
		masasUserTracks: PropTypes.array,
		soundcloudUserTracks: PropTypes.array,
	},

	componentWillMount: function() {
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

	render: function() {
		return (
			<div className="upload-sc--wrapper">
				<div className="table-head">
					<div className="title">
						Title
					</div>
					<div className="duration">
						Duration
					</div>
					<div className="sync">
						Sync
					</div>
				</div>
				<div className="upload-sc-items--wrapper">
					{ this.tracksTable() }
				</div>
				<div className="logout--wrapper">
					{
						this.props.SCusername ?
							<span className="logout-text" onClick={this.logoutSC}>
								Log out from <span className="logout-text--username">{this.props.SCusername}</span>
							</span>
						:
							''
					}
				</div>
			</div>
		)
	}
})

UploadSCSongTable = connect(
	mapStateToProps,
	mapDispatchToProps
)(UploadSCSongTable)

export {
	UploadSCSongTable,
}
