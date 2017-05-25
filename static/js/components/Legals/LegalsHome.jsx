import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Body, Button } from '../UI/UI.jsx'
import { LegalsContent } from './LegalsContent.jsx'
import { EnforcementGuidelines } from './EnforcementGuidelines.jsx'
import { Guidelines } from './Guidelines.jsx'
import { LearnCopyright } from './LearnCopyright.jsx'
import { Privacy } from './Privacy.jsx'
import { ReportCopyright } from './ReportCopyright.jsx'
import { Terms } from './Terms.jsx'
import { Rest } from './Rest.jsx'
import { updatePageTitle } from '../../reducers/actions/App.js'
import { toogleLegalsPageNumber } from '../../reducers/actions/Legals.js'


/**
 * Redux container
 */

const reduxStatePropTypes = {
	pageNumber: PropTypes.number,
}

const mapStateToProps = function(state) {
	return {
		pageNumber: state.legalsReducer.pageNumber,
	}
}

const reduxDispatchPropTypes = {
	goToPage: PropTypes.func,
	updateTitle: PropTypes.func,
}

const mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch(updatePageTitle(title, pageType)),
		goToPage: pageNumber => dispatch(toogleLegalsPageNumber(pageNumber))
	}
}


/**
 * Smart component
 */

const smartPropTypes = {
	...reduxStatePropTypes,
	...reduxDispatchPropTypes,

	backButtonFunc: PropTypes.func,
	splashScreenLegals: PropTypes.bool,
}

const smartDefaultProps = {
	splashScreenLegals: false,
	backButtonFunc: () => {},
}

class LegalsHomeSmart extends React.Component {
    constructor(props) {
        super(props)
    }

	componentDidMount() {
		if(window.location.pathname === '/legals')
			this.props.updateTitle('Legals', '0')		// 0 = menu icon; 1 = arrow back
	}

	componentWillUpdate() {
		if(!this.props.splashScreenLegals)
			this.props.updateTitle('Legals', '0')		// 0 = menu icon; 1 = arrow back
	}

	render() {
		const indexLinks = (
			<div className="legal-links--wrapper">
				<span onClick={ this.props.goToPage.bind(this, 1) } className="legal-links">Terms of Uses</span>
				<span onClick={ this.props.goToPage.bind(this, 3) } className="legal-links">Privacy Policy</span>
				<span onClick={ this.props.goToPage.bind(this, 7) } className="legal-links">Cookie Policy</span>
			</div>
			)

		switch(this.props.pageNumber) {
			case 1:
				return <LegalsContent
					splashScreenLegals={ this.props.splashScreenLegals}><Terms /></LegalsContent>
			case 2:
				return <LegalsContent
					splashScreenLegals={ this.props.splashScreenLegals}><Guidelines /></LegalsContent>
			case 3:
				return <LegalsContent
					splashScreenLegals={ this.props.splashScreenLegals}><Privacy /></LegalsContent>
			case 4:
				return <LegalsContent
					splashScreenLegals={ this.props.splashScreenLegals}><LearnCopyright /></LegalsContent>
			case 5:
				return <LegalsContent
					splashScreenLegals={ this.props.splashScreenLegals}><ReportCopyright /></LegalsContent>
			case 6:
				return <LegalsContent
					splashScreenLegals={ this.props.splashScreenLegals}><EnforcementGuidelines /></LegalsContent>
			case 7:
				return <LegalsContent
					splashScreenLegals={ this.props.splashScreenLegals}><Rest /></LegalsContent>
			default:
				if(!this.props.splashScreenLegals)
					return (
						<Body>
							<div className="legals--wrapper">
								<img src="/static/img/MASAS_icon_legals_deco1.svg" alt="stars" className="star-icon" />
								<div className="logo--wrapper">
									<img src="/static/img/MASAS_logo-M.svg" alt="logo" className="logo" />
								</div>
								<div className="text--wrapper">
									<p>
										MASAS aims to be fair and transparent when it comes to the use of it's interactive and collaborative platform
									</p>
									<p>
										Below are information that should be read be all users:
									</p>
								</div>
								{ indexLinks }
							</div>
						</Body>
					)
				else
					return (
						<div className="text--wrapper">
							<img src="/static/img/MASAS_logo-M.svg" alt="logo" className="logo" />
							<p>
								Please, carefully read the following documents because logging in will constitute your approval of:
							</p>
							{ indexLinks }
							<Button
								isBigButton={ false }
								onClick={ this.props.backButtonFunc }
								isSecondaryAction={ true }
								className="legals-index-back-button" >
								Back
							</Button>
						</div>
						)
		}
	}
}

LegalsHomeSmart.propTypes = smartPropTypes
LegalsHomeSmart.defaultProps = smartDefaultProps

const LegalsHome = connect(
    mapStateToProps,
    mapDispatchToProps
)(LegalsHomeSmart)

export {
	LegalsHome,
}
