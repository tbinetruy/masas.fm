var React = require("react")
var ReactDOM = require("react-dom")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/Discover.jsx")

var { getTimeIntervalFromURL } = require("../../MASAS_functions.jsx")

var ArtworkLine = require("./ArtworkLine.jsx")
var { TimePicker } = require("../UI/UI.jsx")

var Discover = React.createClass({
	propTypes: {
	},

	componentWillMount: function() {
		console.log('componentWillMount')
		this.props.updateTitle('Discover', '0')		// 0 = menu icon; 1 = arrow back

		// check what discover is playing
		if(this.props.MASAS_songInfo)
			this.props.handleTimePickerChange(getTimeIntervalFromURL(this.props.MASAS_songInfo.timeInterval))

	},

	componentWillReceiveProps: function(nextProps) {
	},

	render: function() {
		var sliderInitDiscover = null
		if(this.props.MASAS_songInfo)
			sliderInitDiscover = getTimeIntervalFromURL(this.props.MASAS_songInfo.timeInterval)

		return (
			<div className="discover--wrapper">
				<div className="multi-page--wrapper">
					<div className={ this.props.discoverNumber === 1 ? "page1" : "page2" }>
						<h1>#EarlyMorning</h1>
						<ArtworkLine 
							discoverNumber={1} />
					</div>
					<div className={ this.props.discoverNumber === 2 ? "page1" : "page2" }>
						<h1>#LateMorning</h1>
						<ArtworkLine 
							discoverNumber={2} />
					</div>
					<div className={ this.props.discoverNumber === 3 ? "page1" : "page2" }>
						<h1>#EarlyAfternoon</h1>
						<ArtworkLine
							discoverNumber={3} />
					</div>
					<div className={ this.props.discoverNumber === 4 ? "page1" : "page2" }>
						<h1>#LateAfternoon</h1>
						<ArtworkLine
							discoverNumber={4} />
					</div>
					<div className={ this.props.discoverNumber === 5 ? "page1" : "page2" }>
						<h1>#EarlyEvening</h1>
						<ArtworkLine 
							discoverNumber={5} />
					</div>
					<div className={ this.props.discoverNumber === 6 ? "page1" : "page2" }>
						<h1>#LateEvening</h1>
						<ArtworkLine 
							discoverNumber={6} />

					</div>
				</div>
				<div className="time-picker--wrapper">
					<TimePicker 
						canvasId="timePicker--canvas" 
						wrapperClassName="timePicker--wrapper" 
						onSliderChange={ this.props.handleTimePickerChange } 
						initialDiscover={ sliderInitDiscover ? sliderInitDiscover : 1 }
						currentDiscover={ this.props.discoverNumber }
						showHashtag={ false } />
				</div>
			</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(Discover)