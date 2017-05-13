import * as React from 'react'
import { connect }from 'react-redux'


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
class TemplateSmart extends React.Component {
    constructor(props) {
        super(props)
    }

	render() {
		return (
			<div>
			</div>
		)
	}
}

Template.propTypes = {
}

const Template = connect(
    mapStateToProps,
    mapDispatchToProps
)(TemplateSmart)

export {
	Template
}


