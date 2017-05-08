var React = require('react')

var ReactRedux = require('react-redux')
var { mapStateToProps, mapDispatchToProps } = require('./containers/Discover.jsx')

var {
	getTimeIntervalFromURL,
	getDiscoverNumberFromCurrentTime,
	discoverHashtagNames
} = require('../../MASAS_functions.jsx')

var ArtworkLine = require('./ArtworkLine.jsx')
var { TimePicker } = require('../UI/UI.jsx')

var Discover = React.createClass({
	propTypes: {
		userToken: React.PropTypes.string,
		userData: React.PropTypes.object,
		modalType: React.PropTypes.number,
		isModalOpened: React.PropTypes.bool,
		discoverNumber: React.PropTypes.number,
		songPlaying: React.PropTypes.string,
		MASAS_songInfo: React.PropTypes.object,
		loggedOutUserStep: React.PropTypes.number,

		updateTitle: React.PropTypes.func,
		toogleModal: React.PropTypes.func,
		updateModalType: React.PropTypes.func,
		updateModalContent: React.PropTypes.func,
		closeModal: React.PropTypes.func,
		handleTimePickerChange: React.PropTypes.func,
		incrementLoggedOutUserStep: React.PropTypes.func,
	},

	getDefaultProps: function() {
		return {
		}
	},

	getInitialState: function() {
		return {
			sliderValue: -1,
		}
	},

	componentWillMount: function() {
		this.props.updateTitle('Crowdradio', '0')		// 0 = menu icon; 1 = arrow back

		// check what discover is playing
		if(this.props.MASAS_songInfo)
			this.props.handleTimePickerChange(getTimeIntervalFromURL(this.props.MASAS_songInfo.timeInterval))

	},

	componentWillUnmount: function() {
	},

	componentDidMount: function() {
	},

	componentWillReceiveProps: function() {
	},

	render: function() {
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
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(Discover)
