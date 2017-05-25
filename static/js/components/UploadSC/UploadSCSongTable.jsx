import PropTypes from 'prop-types'
import React from 'react'
import { UploadSCItem } from './UploadSCItem.jsx'
import { connect } from 'react-redux'
import { updatePageTitle } from '../../reducers/actions/App.js'

/**
 * Redux container
 */

const reduxStatePropTypes = {
	SCusername: PropTypes.string,
	masasUserTracks: PropTypes.array,
	soundcloudUserTracks: PropTypes.array,
}

const mapStateToProps = function(state) {
	return {
		SCusername:  state.uploadSCReducer.SCusername,
		soundcloudUserTracks: state.uploadSCReducer.soundcloudUserTracks,
		masasUserTracks: state.uploadSCReducer.masasUserTracks,
	}
}

const reduxDispatchPropTypes = {
	updateTitle: PropTypes.func,
}

const mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch(updatePageTitle(title, pageType)),
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

class UploadSCSongTableSmart extends React.Component {
    constructor(props) {
        super(props)
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

	render() {
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
}


UploadSCSongTableSmart.propTypes = smartPropTypes
UploadSCSongTableSmart.defaultProps = smartDefaultProps

const UploadSCSongTable= connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadSCSongTableSmart)

export {
	UploadSCSongTable,
}