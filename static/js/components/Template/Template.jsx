import React, { PropTypes } from 'react'
import { connect }from 'react-redux'

/**
 * Dumb component
 */

const dumbPropTypes = {
}

const dumbDefaultProps = {
}

const TemplateDumb = props => (
	<div>
	</div>
)

TemplateDumb.propTypes = dumbPropTypes
TemplateDumb.defaultProps = dumbDefaultProps

/**
 * Redux container
 */

const mapStateToProps = function(state) {
	return {
	}
}

const mapDispatchToProps = function(dispatch) {
	return {
	}
}


/**
 * Smart component
 */

const smartPropTypes = {
	...dumbPropTypes,
}

const smartDefaultProps = {
	...dumbDefaultProps,
}

class TemplateSmart extends React.Component {
    constructor(props) {
        super(props)
    }

	render() {
		return (
			<TemplateDumb />
		)
	}
}

TemplateSmart.propTypes = smartPropTypes
TemplateSmart.defaultProps = smartDefaultProps

const Template = connect(
    mapStateToProps,
    mapDispatchToProps
)(TemplateSmart)

export {
	Template,
}


