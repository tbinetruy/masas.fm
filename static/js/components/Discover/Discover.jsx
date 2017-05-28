import {
	changeBgState,
	changeModalContent,
	closeAndEmptyMainModal,
	incrementLoggedOutUserStep,
	toogleIsModalOpened,
	updateModalType,
	updatePageTitle,
} from '../../reducers/actions/App.js'

import {
	getDiscoverNumberFromCurrentTime,
	getTimeIntervalFromURL,
} from '../../MASAS_functions.jsx'

import { ArtworkLine } from './ArtworkLine.jsx'
import { Link } from '../UI/UI.jsx'
import PropTypes from 'prop-types'
import React from 'react'
import { TimePicker } from '../UI/UI.jsx'
import { changeDiscoverNumber } from '../../reducers/actions/Discover.js'
import { connect }from 'react-redux'
import { updateTipBar } from '../../reducers/actions/Header.js'


/**
 * Redux container
 */

const reduxStatePropTypes = {
	MASAS_songInfo: PropTypes.object,
	discoverNumber: PropTypes.number,
	isModalOpened: PropTypes.bool,
	loggedOutUserStep: PropTypes.number,
	modalType: PropTypes.number,
	songPlaying: PropTypes.string,
	userData: PropTypes.object,
	userToken: PropTypes.string,
}

const mapStateToProps = function(state) {
	return {
		userToken: state.appReducer.MASASuser,
		userData: state.appReducer.userData,
		modalType: state.appReducer.modalType,
		isModalOpened: state.appReducer.isModalOpened,
		discoverNumber: state.discoverReducer.discoverNumber,
		songPlaying: state.playerReducer.songPlaying,
		MASAS_songInfo: state.playerReducer.MASAS_songInfo,
		loggedOutUserStep: state.appReducer.loggedOutUserStep,
	}
}

const reduxDispatchPropTypes = {
	blackBgFilter: PropTypes.func,
	closeModal: PropTypes.func,
	handleTimePickerChange: PropTypes.func,
	incrementLoggedOutUserStep: PropTypes.func,
	resetBgFilter: PropTypes.func,
	toogleModal: PropTypes.func,
	updateModalContent: PropTypes.func,
	updateModalType: PropTypes.func,
	updateTipBar: PropTypes.func,
	updateTitle: PropTypes.func,
}

const mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch(updatePageTitle(title, pageType)),
		toogleModal: () => dispatch(toogleIsModalOpened()),
		updateModalContent: (modalContent, modalType, closeModalFunc) => dispatch(changeModalContent(modalContent, modalType, closeModalFunc)),
		updateModalType: modalType => dispatch(updateModalType(modalType)),
		closeModal: () => dispatch(closeAndEmptyMainModal()),
		blackBgFilter: () => dispatch(changeBgState.black()),
		resetBgFilter: () => dispatch(changeBgState.reset()),
		handleTimePickerChange: discoverNumber => dispatch(changeDiscoverNumber(discoverNumber)),
		incrementLoggedOutUserStep: () => dispatch(incrementLoggedOutUserStep()),
		updateTipBar: (text, step, tipCTA) => dispatch(updateTipBar(text, step, tipCTA))
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

class DiscoverSmart extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			sliderValue: -1,
		}
	}
	componentWillMount() {
		this.props.updateTitle('Crowdradio', '0')		// 0 = menu icon; 1 = arrow back

		// check what discover is playing
		if(this.props.MASAS_songInfo)
			this.props.handleTimePickerChange(getTimeIntervalFromURL(this.props.MASAS_songInfo.timeInterval))

		// make black bg filter
		this.props.blackBgFilter()
	}

	componentWillUnmount() {
		// reset bg filter
		this.props.resetBgFilter()

		// hide crowdradio tip
		this.props.updateTipBar('')
	}

	componentDidMount() {
		// show crowdradio tip
		this.props.updateTipBar('Welcome to the Crowdradio!_!', 9, <Link to="/manifesto">Learn more</Link>)
	}

	componentWillReceiveProps() {
	}

	render() {
		// init slider position
		var sliderInitDiscover = null
		if(this.props.MASAS_songInfo && this.props.songPlaying)
			sliderInitDiscover = getTimeIntervalFromURL(this.props.MASAS_songInfo.timeInterval)
		else
			sliderInitDiscover = getDiscoverNumberFromCurrentTime()

		return (
			<div className="discover--wrapper">

				<div
					className="multi-page--wrapper">
					<div className={ this.props.discoverNumber === 1 ? 'page1' : 'page2' }>
						<ArtworkLine
							discoverNumber={ 1 } />
					</div>
					<div className={ this.props.discoverNumber === 2 ? 'page1' : 'page2' }>
						<ArtworkLine
							discoverNumber={ 2 } />
					</div>
					<div className={ this.props.discoverNumber === 3 ? 'page1' : 'page2' }>
						<ArtworkLine
							discoverNumber={ 3 } />
					</div>
					<div className={ this.props.discoverNumber === 4 ? 'page1' : 'page2' }>
						<ArtworkLine
							discoverNumber={ 4 } />
					</div>
					<div className={ this.props.discoverNumber === 5 ? 'page1' : 'page2' }>
						<ArtworkLine
							discoverNumber={ 5 } />
					</div>
					<div className={ this.props.discoverNumber === 6 ? 'page1' : 'page2' }>
						<ArtworkLine
							discoverNumber={ 6 } />
					</div>
				</div>
				<div
					className="time-picker--wrapper">
					<TimePicker
						canvasId="timePicker--canvas"
						wrapperClassName="timePicker--wrapper"
						onSliderChange={ this.props.handleTimePickerChange }
						initialDiscover={ sliderInitDiscover ? sliderInitDiscover : 1 }
						currentDiscover={ this.props.discoverNumber }
						showHashtag={ true }
						sliderValue={ this.state.sliderValue }
						initText="Drag the sun around!"
						/>
				</div>
			</div>
		)
	}
}

DiscoverSmart.propTypes = smartPropTypes
DiscoverSmart.defaultProps = smartDefaultProps

const Discover = connect(
    mapStateToProps,
    mapDispatchToProps
)(DiscoverSmart)

export {
	Discover,
}