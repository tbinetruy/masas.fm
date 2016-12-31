var React = require("react")
var ReactDOM = require("react-dom")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/RemoveSongModal.jsx")

const { updateNotificationBar, updateProfileInfo } = require('../../MASAS_functions.jsx')
var { Button } = require("../UI/UI.jsx")

// var Template = (props) => {

// }

var RemoveSongModal = React.createClass({
	propTypes: {
		MASAS_info: React.PropTypes.object,
		SC_info: React.PropTypes.object,
		toggleModal: React.PropTypes.func,
	},

	componentWillMount: function() {
		
	},

	removeSong: function() {
		var header = "Bearer " + this.props.MASASuser

		$.ajax({
			type: 'DELETE',
			url: this.props.MASAS_info.url,
			headers: {
				"Authorization": header,
			},
			success: (r) => {
				this.props.toggleModal()
				updateNotificationBar("Song deleted")
				updateProfileInfo()
			},
			error: (e) => {
				updateNotificationBar("Error")
			}
		})
	},

	render: function() {
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
})
module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(RemoveSongModal)