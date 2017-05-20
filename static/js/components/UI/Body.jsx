import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

/**
 * Redux container
 */

const reduxStatePropTypes = {
	isModalOpened: PropTypes.bool,
	modalType: PropTypes.number,
	title: PropTypes.string,
}

const mapStateToProps = function(state) {
	return {
		title: state.appReducer.pageTitle,
		modalType: state.appReducer.modalType,
		isModalOpened: state.appReducer.isModalOpened,
	}
}

const reduxDispatchPropTypes = {

}

const mapDispatchToProps = function(dispatch) {
	return {
	}
}


/**
 * Smart component
 */

const smartPropTypes = {
	...reduxStatePropTypes,
	...reduxDispatchPropTypes,

	children: PropTypes.node,
	noBackground: PropTypes.bool,		// should Body background be dark or transparent
	wide: PropTypes.bool,				// full screen width body
}

const smartDefaultProps = {
	noBackground: false,				// show dark background by default
	wide: false,
}

class BodySmart extends React.Component {
    constructor(props) {
        super(props)
    }

	render() {
		var marginHeight = '4.2rem'
		var marginStyle = {
			minHeight:  marginHeight,
			maxHeight: marginHeight
		}


		if(!this.props.wide)
			return (
				<div className="app-body body--wrapper" >
					<div className="row row-display-none-sm no-margin" style={ marginStyle }>
						<div className="col-md-2">
							<div className="box"></div>
						</div>
						<div
							style={{
								visibility: this.props.isModalOpened && this.props.modalType === 2 ? 'hidden' : 'visible'
							}}
							className="col-md-8 page-title--wrapper">
							<div className="box page-title">{ this.props.title }</div>
							<hr />
						</div>
						<div className="col-md-2">
							<div className="box"></div>
						</div>
					</div>
					<div className="row no-margin">
						<div className="col-md-2 col-display-none-sm">
							<div className="box"></div>
						</div>
						<div className="col-xs-12 col-md-8 page-content--wrapper">
							<div className={ 'box page-content' + ( this.props.noBackground ? ' no-background' : '' ) }>
								{ this.props.children }
							</div>
						</div>
						<div className="col-md-2 col-display-none-sm">
							<div className="box"></div>
						</div>
					</div>
					<div className="row row-display-none-sm no-margin" style={ marginStyle }>
						<div className="col-xs-12">
						</div>
					</div>
				</div>
			)
		else
			return (
				<div className="app-body body--wrapper wide">
					{ this.props.children }
				</div>
			)
	}
}

BodySmart.propTypes = smartPropTypes
BodySmart.defaultProps = smartDefaultProps

const Body = connect(
    mapStateToProps,
    mapDispatchToProps
)(BodySmart)

export {
	Body,
}
