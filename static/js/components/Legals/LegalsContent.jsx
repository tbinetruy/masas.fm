import React, { PropTypes } from 'react'
import { connect }from 'react-redux'

import { Body, Button } from '../UI/UI.jsx'

import { updatePageTitle } from '../../reducers/actions/App.js'
import { toogleLegalsPageNumber } from '../../reducers/actions/Legals.js'

/**
 * Redux container
 */

const reduxStatePropTypes = {

}

const mapStateToProps = function(state) {
	return {
	}
}

const reduxDispatchPropTypes = {
	updateTitle: PropTypes.func,
	gotToHome: PropTypes.func,
}

const mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, backArrowFunc) => dispatch(updatePageTitle(title, 1, backArrowFunc)),
		goToHome: () => dispatch(toogleLegalsPageNumber(0))
	}
}


/**
 * Smart component
 */

const smartPropTypes = {
	...reduxStatePropTypes,
	...reduxDispatchPropTypes,

	splashScreenLegals: PropTypes.bool,
}

const smartDefaultProps = {
	splashScreenLegals: false
}

class LegalsContentSmart extends React.Component {
    constructor(props) {
        super(props)
    }

	componentWillMount() {
		if(!this.props.splashScreenLegals && window.location.pathname === '/legals')
			this.props.updateTitle('Legals', this.props.goToHome )
	}

	render() {
		const content = (
			<div className="legals-content--wrapper">
				<div className="legals-content">
					{ this.props.children }
				</div>
				<div onClick={ this.props.goToHome } className="back-icon">
					<img src="/static/img/MASAS_arrow_left.svg" alt="back" />
				</div>
				<Button
					isBigButton={ false }
					onClick={ this.props.goToHome }
					isSecondaryAction={ true }
					className="back-to-legals-summary">
					Back
				</Button>
			</div>
		)

		if(this.props.splashScreenLegals)
			return content
		else
			return (
				<Body>
					{ content }
				</Body>
			)
	}
}

LegalsContentSmart.propTypes = smartPropTypes
LegalsContentSmart.defaultProps = smartDefaultProps

const LegalsContent = connect(
    mapStateToProps,
    mapDispatchToProps
)(LegalsContentSmart)

export {
	LegalsContent,
}
