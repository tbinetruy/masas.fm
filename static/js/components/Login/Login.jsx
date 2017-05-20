import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { LoginForm } from './LoginForm.jsx'
var { Body } = require('../UI/UI.jsx')

/**
 * Redux container
 */

const reduxStatePropTypes = {
	title: PropTypes.string,
}

const mapStateToProps = function(state) {
	return {
		title: state.appReducer.pageTitle,
	}
}

const reduxDispatchPropTypes = {
	updateTitle: PropTypes.func,
}

const mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: () => dispatch({type:'UPDATE_PAGE_TITLE', title: 'Login', pageType: 0})
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

class LoginSmart extends React.Component {
    constructor(props) {
        super(props)
    }

	componentDidMount() {
		this.props.updateTitle()
	}

	render() {
		var marginHeight = '3rem'
		var marginStyle = {
			minHeight:  marginHeight,
			maxHeight: marginHeight
		}

		return (
			<Body>
				<div className="app-body" >
					<div className="row row-display-none-sm no-margin" style={ marginStyle }>
						<div className="col-md-2">
							<div className="box"></div>
						</div>
						<div className="col-md-8">
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
							<div className="box page-content">
								<LoginForm fullForm={true} />
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
			</Body>
		)
	}
}

LoginSmart.propTypes = smartPropTypes
LoginSmart.defaultProps = smartDefaultProps

const Login = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginSmart)

export {
	Login,
}