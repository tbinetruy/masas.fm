import { acceptTerms } from './ajaxCalls.jsx'

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { Button } from '../UI/UI.jsx'
import { Terms } from '../Legals/Terms.jsx'

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
}

const mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch({type:'UPDATE_PAGE_TITLE', title: title, pageType: pageType}),
	}
}


/**
 * Smart component
 */

const smartPropTypes = {
	...reduxStatePropTypes,
	...reduxDispatchPropTypes,

	userData: PropTypes.object,
	userPk: PropTypes.number,
	userToken: PropTypes.string,
}

const smartDefaultProps = {
}

class TermsAndCondSmart extends React.Component {
    constructor(props) {
        super(props)

		this.acceptTerms = this.acceptTerms.bind(this)
    }

	acceptTerms() {
		acceptTerms(this.props.userToken, this.props.userData, this.props.userPk)
	}

	render() {
		return (
			<div className="term-and-cond-modal-content">
				<div className="legals-content--wrapper">
					<div className="legals-content">
						<Terms />
					</div>
				</div>
				<p className="accept-text">
					By creating an account I accept MASAS's Terms of Uses and Privacy Policy
				</p>
				<Button isBigButton={ true } onClick={ this.acceptTerms }>Get Early Access</Button>
			</div>
		)
	}
}

TermsAndCondSmart.propTypes = smartPropTypes
TermsAndCondSmart.defaultProps = smartDefaultProps

const TermsAndCond = connect(
    mapStateToProps,
    mapDispatchToProps
)(TermsAndCondSmart)

export {
	TermsAndCond,
}