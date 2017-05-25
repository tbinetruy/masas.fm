/**
 * NEEDS DIRECT PARENT WITH => position: relative, height = something, width = something
 */

import PropTypes from 'prop-types'
import React from 'react'


/**
 * Smart component
 */

const smartPropTypes = {
	className: PropTypes.string,
}

const smartDefaultProps = {
}

class MarqueeSmart extends React.Component {
    constructor(props) {
        super(props)

		this.state = {
			overflow: false,			// (BOOL) is text overflowing
		}

		this.resizer = this.resizer.bind(this)
		this.checkTextOverflow = this.checkTextOverflow.bind(this)
    }

	componentDidMount() {
		// recompute animationDelay if need be on window resize
		$(window).resize(this.resizer)

		// check if overflow and compute animationDelay if need be
		this.checkTextOverflow()
	}

	componentWillUnmount() {
		$(window).off('resize', this.resizer)
	}

	resizer() {
		this.setState({ overflow: false })
		this.checkTextOverflow()
	}

	// called after state change induced render
	componentDidUpdate() {
		this.checkTextOverflow()
	}

	componentWillReceiveProps(nextProps) {

	}

	// update state if overflow
	checkTextOverflow() {
		const element = this.refs.wrapper

		const a = this.refs.wrapper.offsetWidth
		const b = this.refs.text.offsetWidth

		if (b > a) {
			if(!this.state.overflow) {
				this.setState({ overflow: true })
			}
		} else {

			if(this.state.overflow)
				this.setState({ overflow: false })
		}
	}

	render() {
		// compute animationDelay on render
		let animationDelay = null

		if(typeof(this.refs.wrapper) !== 'undefined') {
			const a = this.refs.wrapper.offsetWidth
			const b = this.refs.text.offsetWidth
			animationDelay = -a / (a+b) * 10 + 's'
		}

		return (
			<div className={ (this.props.className ? this.props.className : '') + ' MASAS_marquee'} ref="wrapper">
				<div className="MASAS_marquee--wrapper2" style={ this.state.overflow ? { display: 'block' } : {} }>
					<span ref="text" style={{ animationDelay: (animationDelay ? animationDelay : '0s') }} className={ 'textBis' + ( this.state.overflow ? ' text' : '' ) }>{ this.props.children }</span>
				</div>
			</div>
		)
	}
}

MarqueeSmart.propTypes = smartPropTypes
MarqueeSmart.defaultProps = smartDefaultProps


export {
	MarqueeSmart as Marquee,
}