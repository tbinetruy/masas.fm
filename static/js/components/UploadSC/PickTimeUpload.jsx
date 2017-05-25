import React from 'react'
import PropTypes from 'prop-types'
import * as createClass from 'create-react-class'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from './containers/PickTimeUpload.jsx'

import { Button, Link, TimePicker } from '../UI/UI.jsx'
import { getCookie } from '../../MASAS_functions.jsx'

import { ModalContent } from './ModalContent.jsx'


let PickTimeUpload = createClass({
	propTypes: {
		MASASuser: PropTypes.string,
		checkUserStep: PropTypes.func,		// check user step and show tip modal if necessary
		closeWindow: PropTypes.func,
		emitNotification: PropTypes.func,
		handleTimePickerChange: PropTypes.func,
		isUploadButtonDisabled: PropTypes.bool,
		pickTimeUpload: PropTypes.number,
		toogleModal: PropTypes.func,
		track: PropTypes.object,			// array containing track information
		updateIsUploadButtonDisabled: PropTypes.func,
		updateModalContent: PropTypes.func,
		updateProfileInfo: PropTypes.func,
		updateTitle: PropTypes.func,
		visible: PropTypes.bool,				// is cancel button visible
	},

	getDefaultProps: function() {
		return {
			checkUserStep: () => {}
		}
	},

	componentWillMount: function() {
		this.props.updateTitle('Upload', 1, this.props.closeWindow)		// 0 = menu icon; 1 = arrow back

		// disable uplaod button until user has interacted with sun
		this.props.updateIsUploadButtonDisabled(true)

		this.props.checkUserStep()
	},

	submitSong: function() {

		var csrftoken = getCookie('csrftoken')
		var header = 'Bearer ' + this.props.MASASuser
		$.ajax({
			type: 'POST',
			url: 'api/songs/',
			headers: {
				'Authorization': header,
				'X-CSRFToken': csrftoken
			},
			data: {
				trackTitle: this.props.track.title,
				trackDuration: this.props.track.duration,
				SC_ID: this.props.track.id,
				timeInterval: 'http://localhost:8000/api/time-intervals/' + this.props.pickTimeUpload + '/'
			},
			success: () => {
				this.props.emitNotification('song synced ;)')

				// UPDATE USER INFO
				this.props.updateProfileInfo()

				// CLOSE MODAL
				this.props.toogleModal()

				// CLOSE CHOOSING TIME
				this.props.closeWindow()

			},
			error: (err) => {
				// CLOSE MODAL
				this.props.toogleModal()

				// EMIT NOTIFICATION
				this.props.emitNotification(err.responseJSON.SC_ID)
			},
		})
	},

	openModal: function() {
		// USE THIS LIFECYCLE FUNCTION TO UPDATE MODAL CONTENT
		var that = this
		this.props.updateModalContent(
			<ModalContent onSubmit={ that.submitSong } />
			)
		this.props.toogleModal()
	},

	render: function() {

		return (
			<div className="pick-time-sc-sync">
				<div className="song-name--wrapper">
					{
						this.props.track.artwork_url ?
							<img src={this.props.track.artwork_url} alt="song artwork" className="artwork" />
						:
							<div className="artwork"></div>
					}

					<h2 className="song-title">{this.props.track.title}</h2>
				</div>
				<div className="pickTime--wrapper">
					<div className="canvas">
						<TimePicker
							initialDiscover={ 2 }
							currentDiscover={ this.props.pickTimeUpload }
							onSliderChange={ this.props.handleTimePickerChange }
							wrapperClassName="timePicker--pick-time-upload--wrapper"
							initText="Drag the sun around!"
							ref="timePicker"
							onFirstSunMove={ () => this.props.updateIsUploadButtonDisabled(false) }
							canvasId="timePicker--pick-time-upload--id" />
					</div>
				</div>
				<div className="button--wrapper">
					<Button
						className="submit"
						small={true}
						white={true}
						isDisabled={ this.props.isUploadButtonDisabled }
						onClick={this.openModal}>Submit</Button>
					<Link
						to="/upload"
						className="cancel-button"
						onClick={this.props.closeWindow}>
						<span>cancel</span>
					</Link>
				</div>
			</div>
		)
	}
})

PickTimeUpload =  connect(
	mapStateToProps,
	mapDispatchToProps
)(PickTimeUpload)

export {
	PickTimeUpload,
}
