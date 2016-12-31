var React = require("react")
var ReactDOM = require("react-dom")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/FooterModals.jsx")

var { getTimeIntervalFromURL } = require("../../MASAS_functions.jsx")
var { TimePicker, Button } = require("../UI/UI.jsx")

// var Template = (props) => {

// }

var FooterModal = React.createClass({
	propTypes: {
		isSpamModal: React.PropTypes.bool,				// is spam modal content
		isCopyrightModal: React.PropTypes.bool,			// is report copyright modal content
		isSuggestTimeModal: React.PropTypes.bool, 			// is suggest another time modal content
		toogleIsModalOpened: React.PropTypes.func,
	},

	// keeping props in state so that song info doesn't change when player changes song
	getInitialState: function() {
		return {
			MASAS_songInfo: this.props.MASAS_songInfo,
			SC_songInfo: this.props.SC_songInfo,
		}
	},

	componentWillMount: function() {
	},

	getModalContent: function() {
		const { isSpamModal, isCopyrightModal, isSuggestTimeModal } = this.props
		const cancelButton = (
			<Button 
				isBigButton={ false }
				isSecondaryAction={ false }
				className="cancel-button"
				onClick={ this.props.toogleIsModalOpened }>
				Cancel
			</Button>
		)

		if(isSpamModal)
			return (
				<div className="footer-modal-content">
					<img src="/static/img/MASAS_icon_spam.svg" alt="icon" />
					<h2>
						Do you really want to report <strong>{ this.props.SC_songInfo.title }</strong> as spam?
					</h2>
					<div className="buttons">
						{ cancelButton }
						<Button
							isSecondaryAction={ true }
							isBigButton={ false }
							onClick={ this.props.reportSpam }
							isDisabled={ false }>
							yes
						</Button>
					</div>
				</div>
				)

		if(isCopyrightModal)
			return (
				<div className="footer-modal-content">
					<img src="/static/img/MASAS_icon_copyright.svg" alt="icon" />
					<h2>
						Do you really want to report <strong>{ this.props.SC_songInfo.title }</strong> as copyright infringement?
					</h2>
					<div className="buttons">
						{ cancelButton }
						<Button
							isSecondaryAction={ true }
							isBigButton={ false }
							onClick={ this.props.reportCopyright }
							isDisabled={ false }>
							yes
						</Button>
					</div>
				</div>
				)

		if(isSuggestTimeModal) {
			const initialTime = getTimeIntervalFromURL(this.state.MASAS_songInfo.timeInterval)

			// var { initialDiscover, currentDiscover } = this.props.
			return (
				<div className="footer-modal-content">
					<h2 className="no-padding-bottom">
						When would you most likely listen to <strong className="no-padding-bottom">{ this.state.SC_songInfo.title }</strong>
					</h2>
					<div className="suggest-time-modal--wrapper">
						<TimePicker
							wrapperClassName="suggest-time-modal--wrapper"
							canvasId="suggest-time-modal-timePicker-canvas-id"
							initialDiscover={ initialTime }
							currentDiscover={ this.props.suggestNewTimeValue }
							onSliderChange={ this.props.updateTimeSuggestion } />
					</div>
					<div className="buttons">
						{ cancelButton }
						<Button
							isSecondaryAction={ true }
							isBigButton={ false }
							onClick={ () => {} }
							isDisabled={ initialTime === this.props.suggestNewTimeValue ? true : false }>
							Submit
						</Button>
					</div>
				</div>
				)
		}
		else
			return <div></div>
	},

	render: function() {
		return (
			<div className="footer-modal--wrapper">
				{ this.getModalContent() }
			</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(FooterModal)