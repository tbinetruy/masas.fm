var React = require("react")
var ReactDOM = require("react-dom")

var ReactRedux = require("react-redux")
// var { mapStateToProps, mapDispatchToProps } = require("./containers/Template.jsx")

// var {goToURL} = require("../../MASAS_functions.jsx")
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

	render: function() {
		return (
			<div className="profile-modal--wrapper">
				<div className="song-info--wrapper">
					<div className="artwork">
						{
							this.props.SC_info.artwork_url ?
								<img src={ this.props.SC_info.artwork_url } alt="artwork" />
							:
								""
						}
					</div>
					<div className="song-title">
						{ this.props.SC_info.title }
					</div>
				</div>
				<div className="profile-modal-content">
					<h2>
						do you really want to remove this sound?
					</h2>
					<Button
						isSecondaryAction={ false }
						isBigButton={ false }
						isDisabled={ false }
						onClick={ () => {} }>
						yes
					</Button>
				</div>
				<div className="cancel-button" onClick={ this.props.toggleModal }>Cancel</div>
			</div>
		)
	}
})

module.exports = RemoveSongModal