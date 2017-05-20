import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import {
	updateNotificationBar,
	updateProfileInfo,
} from '../../MASAS_functions.jsx'
import { Button } from '../UI/UI.jsx'


/**
 * Redux container
 */

const reduxStatePropTypes = {
	MASAS_info: PropTypes.object,
}

const mapStateToProps = function(state) {
	return {
		MASASuser: state.appReducer.MASASuser,
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

	SC_info: PropTypes.object,
	toggleModal: PropTypes.func,
}

const smartDefaultProps = {
}

class RemoveSongModalSmart extends React.Component {
    constructor(props) {
        super(props)
    }

	removeSong() {
		var header = 'Bearer ' + this.props.MASASuser

		$.ajax({
			type: 'DELETE',
			url: this.props.MASAS_info.url,
			headers: {
				'Authorization': header,
			},
			success: (r) => {
				this.props.toggleModal()
				updateNotificationBar('Song deleted')
				updateProfileInfo()
			},
			error: (e) => {
				updateNotificationBar('Error')
			}
		})
	}

	render() {
		return (
			<div className="profile-modal--wrapper">
				<img src="/static/img/MASAS_icon_trash.svg" alt="icon" />
				<div className="profile-modal-content">
					<h2  className="no-margin-bottom">
						Do you really want to remove <strong className="no-margin-bottom">{ this.props.SC_info.title }</strong>
					</h2>
					<div className="buttons">
						<Button
							isBigButton={ false }
							isSecondaryAction={ false }
							className="cancel-button"
							onClick={ this.props.toggleModal }>
							Cancel
						</Button>
						<Button
							isSecondaryAction={ true }
							isBigButton={ false }
							isDisabled={ false }
							onClick={ this.removeSong }>
							yes
						</Button>
					</div>
				</div>
			</div>
		)
	}
}

RemoveSongModalSmart.propTypes = smartPropTypes
RemoveSongModalSmart.defaultProps = smartDefaultProps

const RemoveSongModal = connect(
    mapStateToProps,
    mapDispatchToProps
)(RemoveSongModalSmart)

export {
	RemoveSongModal,
}
