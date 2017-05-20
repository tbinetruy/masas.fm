// STATEFULL COMPONENT
// no performant enough to be fuly coupled with redux, so no 2 way binding between redux state and slider value.
// instead, slider value binded 2 ways with inner state var calling this.props.onChange when slider movement is
// triggered.

var React = require('react')

var $ = require('jquery')
//var paper = require("paper")

var { makePromiseCancelable, discoverHashtagNames } = require('../../MASAS_functions.jsx')

var pixelRatio = () => {
	return 1 // paper.view.pixelRatio
}

const TimePicker = React.createClass({
	cancelablePromise: makePromiseCancelable(new Promise( () => {} )),

	propTypes: {
		canvasId: React.PropTypes.string,					// canvas id used for drawing
		currentDiscover: React.PropTypes.number.isRequired, 		// 1-6 used to check if necessary to call onChange calback
		initText: React.PropTypes.string,					// string instead of hashtag until slider is moved
		initialDiscover: React.PropTypes.number.isRequired, 			// 1-6 starting slider position
		onFirstSunMove: React.PropTypes.func,				// callback called on first user interaction with the sun
		onSliderChange: React.PropTypes.func,	 			// callback called when slider changes
		rangePercent: React.PropTypes.number,				// slider value
		renderForUITip: React.PropTypes.bool,				// slider controlled by mouse.onMove
		showHashtag: React.PropTypes.bool,					// should hashtag be shown for current slider position
		sliderValue: React.PropTypes.number,					// slider value affecting sun position
		wrapperClassName: React.PropTypes.string,				// class used to size TimePicker

	},

	getInitialState: function() {
		return {
			rangePercent: this.props.rangePercent,		// (number) 0-100, slider value
			canvasHeight: 0,					// (number) sun arc path center
			canvasWidth: 0,					// (number) sun arc path radius
			arcCenterCoords: { x: 0, y: 0 },				// (object) center of arc circle coord
			arcRadius: 0,						// (number) sun arc path radius
			currentDiscover: this.props.currentDiscover,		// (number) current discover
			hasSunMoved: false,					// (bool) show props.initText until state.hasSunMoved === true
		}
	},

	getDefaultProps: function() {
		return {
			showHashtag: true,
			sliderValue: -1,
			renderForUITip: false,
			canvasId: 'timePicker--wrapper',
			onSliderChange: () => {},
			onFirstSunMove: () => {},
		}
	},

	componentDidMount: function() {
		// add event to get new canvas dimensions on resize
		$(window).bind('resize', this.updateCanvasDim)

		// get canvas dim on initial render
		this.updateCanvasDim()

		// render sun arc path once states from this.updateCanvasDim have udpated
		window.setTimeout(() => this.renderSunArcPath(), 0)
	},

	componentWillUnmount: function() {
		$(window).unbind('resize', this.updateCanvasDim)
		this.cancelablePromise.cancel()
	},

	updateCanvasDim: function() {
		// GET CANVAS DIMENSIONS AND RESIZE IF NECESSARY
		var canvasWrapper = this.refs.svgWrapper


			// get canvas dimensions from styles
		var canvasHeight = window.getComputedStyle(canvasWrapper).height
		var canvasWidth = window.getComputedStyle(canvasWrapper).width
		canvasHeight = parseInt(canvasHeight.split('p')[0])
		canvasWidth = parseInt(canvasWidth.split('p')[0])

			// define sun arc path center and radius (magic numbers used for ajusting curves)
		var arcRadius = canvasWidth / 1.9
		var arcCenterCoords = { x: canvasWidth / 2, y: arcRadius + 15 }

		// SAVE DIMENSIONS IN STATE VARS
		this.setState({ canvasHeight, canvasWidth, arcCenterCoords, arcRadius })
	},

	renderSunArcPath: function() {
		const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
			var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

			return {
				x: centerX + (radius * Math.cos(angleInRadians)),
				y: centerY + (radius * Math.sin(angleInRadians))
			}
		}

		const describeArc = (x, y, radius, startAngle, endAngle) => {
			var start = polarToCartesian(x, y, radius, endAngle)
			var end = polarToCartesian(x, y, radius, startAngle)

			var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'

			var d = [
				'M', start.x, start.y,
				'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
			].join(' ')

			return d
		}

		document.getElementById(this.props.canvasId).setAttribute('d', describeArc(this.state.arcCenterCoords.x, this.state.arcCenterCoords.y, this.state.arcRadius, -70, 70));
	},

	handleTimePickerChange: function(rangeValue, currentDiscover) {
		var newDiscover = Math.floor(rangeValue/100*6) + 1

		if(newDiscover > 6)
			newDiscover = 6
		if(newDiscover < 0)
			newDiscover = 0

		if(newDiscover !== currentDiscover){
			window.setTimeout( () => {
				if(!this.cancelablePromise.hasCanceled_)
					this.cancelablePromise = makePromiseCancelable(
						new Promise(() => this.setState({ currentDiscover: newDiscover }) )
					)
			}, 0)
			return newDiscover
		}
		else{
			return 0
		}
	},

	getSunCoords: function(sliderValue) {
		var { sqrt, pow } = Math

		if(sliderValue > 100)
			sliderValue = 100
		else if(sliderValue < 0)
			sliderValue = 0

		var R = this.state.arcRadius
		var C = this.state.arcCenterCoords
		var x = sliderValue / 100 * this.state.canvasWidth
		var y = -sqrt( pow( R, 2 ) - pow( x - C.x, 2 ) ) + C.y

		return { x: x / pixelRatio(), y: y / pixelRatio() }
	},

	getHashtag: function(value) {
		if(this.props.initText && !this.state.hasSunMoved)
			return this.props.initText

		if(value < 0)
			value = 0

		if(value > 100)
			value = 100

		const hastagNames = discoverHashtagNames()

		if(value >= 0 && value < 100/6)
			return hastagNames[0]
		else if(value >= 100/6 && value < 2*100/6)
			return hastagNames[1]
		else if(value >= 2*100/6 && value < 3*100/6)
			return hastagNames[2]
		else if(value >= 3*100/6 && value < 4*100/6)
			return hastagNames[3]
		else if(value >= 4*100/6 && value < 5*100/6)
			return hastagNames[4]
		else if(value >= 5*100/6 && value <= 100)
			return hastagNames[5]
	},

	componentDidUpdate: function() {
		var svg = this.refs.svg
		if(svg)
			this.renderSunArcPath()
	},

	componentWillUpdate(nextProps, nextState) {
		// if sun has not moved and sun isn't at init coord, update has sun moved state
		if(!this.state.hasSunMoved && this.getSunCoords(nextState.rangePercent).x !== this.getSunCoords(this.state.rangePercent).x) {
			this.setState({ hasSunMoved: true })

			// callback
			this.props.onFirstSunMove()
		}
	},

	render: function() {
		if(!this.renderNumber)
			this.renderNumber = 1
		else if(this.renderNumber < 5)
			this.renderNumber = this.renderNumber + 1

		// accounting for sun icon size
		var sunIconSize = 45
		var sunCoords = this.getSunCoords(this.props.sliderValue === -1 ? this.state.rangePercent : this.props.sliderValue)
		var top = sunCoords.y - sunIconSize / 2
		var left = sunCoords.x - sunIconSize / 2
		var height = sunIconSize + 'px'
		var width = sunIconSize + 'px'

		// styling and positioning sun icon
		var sunIconStyle
		if(!isNaN(top))
			sunIconStyle = {
				position: 'absolute',
				top,
				left,
				height,
				width,
				zIndex: 1
			}
		else
			sunIconStyle = {
				left: 0
			}

		const newDiscover = this.handleTimePickerChange(this.state.rangePercent, this.state.currentDiscover)
		if(newDiscover !== 0) {
			window.setTimeout(() => this.props.onSliderChange(newDiscover), 0)
		}

		return (
			<div className={ 'MASAS-time-picker ' + this.props.wrapperClassName} ref="svgWrapper">
				<svg ref="svg" style={{ width: '100%', height: '100%' }}>
					<path id={this.props.canvasId} fill="none" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="7" strokeOpacity="0.8" />
				</svg>
				<div className="timePicker-slider--wrapper">
					<div style={{
						position: 'relative',
						width: '100%',
						height: '100%' }}>
						<hr style={{
							position: 'absolute',
							right: 0,
							left: 0,
							bottom: '1rem',
							zIndex: '-2',
							display: 'none',
						}} />
						<img
							src="/static/img/MASAS_slider_thumb_icon.svg"
							style={{
								position: 'absolute',
								bottom: '1rem',
								left: sunIconStyle.left,
								transform: 'translateY(37%)',
								zIndex: '-1',
								display: 'none'
							}}
							alt="slider thumb icon" />
					</div>
					<div className="timeRange-hashtag">
						{
							this.props.showHashtag ?
								this.getHashtag(this.props.sliderValue === -1 ? this.state.rangePercent : this.props.sliderValue)
							:
								''
						}
					</div>
				</div>
				<img src="/static/img/time-picker-sun.png" style={sunIconStyle} />
			</div>
		)
	}
})

export {
	TimePicker as TimePickerInside,
}
