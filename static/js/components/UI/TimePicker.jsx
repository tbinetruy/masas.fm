import React from 'react'
import PropTypes from 'prop-types'

import { TimePickerInside } from './TimePickerInside.jsx'
import NoUISlider from 'react-nouislider'


/**
 * Smart component
 */

const smartPropTypes = {
	currentDiscover: PropTypes.number.isRequired, 		// 1-6 used to check if necessary to call onChange calback
	initialDiscover: PropTypes.number.isRequired, 			// 1-6 starting slider position
	onFirstSunMove: PropTypes.func,				// called on first user interaction with the sun
}

const smartDefaultProps = {
	initialDiscover: 1,
	currentDiscover: 1,
	onSliderChange: () => {},
}

class TimePickerSmart extends React.Component {
    constructor(props) {
        super(props)

		this.updateCanvas = this.updateCanvas.bind(this)
    }

	shouldComponentUpdate(nextProps, nextState) {
		// don't rerender if current discover changes
		if(nextProps.currentDiscover !== this.props.currentDiscover)
			return false

		return true
	}

	updateCanvas(e) {
		if(this.refs.canvas !== undefined)
			this.refs.canvas.setState({ rangePercent: parseFloat(e) })
	}

	render() {
		const startValue = (this.props.initialDiscover - 0.5) * 100 / 6

		return (
			<div className="time-picker-wrapper-comp">
				<NoUISlider
					range={{ min: 0, max: 100}}
					start={ [startValue] }
					onUpdate={ this.updateCanvas }
					/>
				<TimePickerInside
					{ ...this.props }
					ref="canvas"
					rangePercent={ startValue }
					onFirstSunMove={ this.props.onFirstSunMove }
					/>
			</div>
		)
	}
}

TimePickerSmart.propTypes = smartPropTypes
TimePickerSmart.defaultProps = smartDefaultProps

export {
	TimePickerSmart as TimePicker,
}