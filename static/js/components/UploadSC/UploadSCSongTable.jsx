var React = require('react')

var ReactRedux = require('react-redux')
var { mapStateToProps, mapDispatchToProps } = require('./containers/UploadSCSongTable.jsx')

var { Body } = require('../UI/UI.jsx')
var UploadSCItem = require('./UploadSCItem.jsx')


var UploadSCSongTable = React.createClass({
	propTypes: {
		SCusername: React.PropTypes.string,

		soundcloudUserTracks: React.PropTypes.array,
		masasUserTracks: React.PropTypes.array,
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

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(UploadSCSongTable)
