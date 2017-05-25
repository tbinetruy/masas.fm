import{
	changeHomePageNumber,
	changeTimePickerDemo
} from '../../reducers/actions/Home.js'

import { Button } from '../UI/UI.jsx'
import { LoginForm } from '../Login/LoginForm.jsx'
import PropTypes from 'prop-types'
import React from 'react'
import { browserHistory } from 'react-router'
import { connect }from 'react-redux'
import { updatePageTitle } from '../../reducers/actions/App.js'


/**
 * Redux container
 */

const reduxStatePropTypes = {
	currentPage: PropTypes.number,
	demoTimePickerNumber: PropTypes.number,
	user: PropTypes.string,
}

const mapStateToProps = function(state) {
	return {
		user: state.appReducer.MASASuser,
		currentPage: state.homeReducer.currentPage,
		demoTimePickerNumer: state.homeReducer.timePickerDemo,
	}
}

const reduxDispatchPropTypes = {
	goToLogin: PropTypes.func,
	goToPage: PropTypes.func,
	updateTimePickerNumber: PropTypes.func,
	updateTitle: PropTypes.func,
}

const mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch(updatePageTitle(title, pageType)),
		goToLogin: () => browserHistory.push('/login'),
		goToPage: (pageNumber, totalNumberPages) => dispatch(changeHomePageNumber(pageNumber, totalNumberPages)),
		updateTimePickerNumber: (number) => dispatch(changeTimePickerDemo(number))
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

class HomeSmart extends React.Component {
    constructor(props) {
        super(props)

		this.state = {
			pageNumber: 1, 		// page number
			value: 0
		}

		this.scrollToInfo = this.scrollToInfo.bind(this)
    }

	componentWillMount() {
		this.props.updateTitle('Home', '0')		// 0 = menu icon; 1 = arrow back
	}

	componentWillUnmount() {
		this.props.goToPage(1, 4)
	}

	scrollToInfo() {
	}

	render() {
		const currentPage = this.props.currentPage
		const pageCount = 4

		return (
			<div className="home--wrapper">

				{
					currentPage !== 1 ?
						<div className="page-up--wrapper">
							<img onClick={this.props.goToPage.bind(null, currentPage - 1, pageCount)} src="/static/img/MASAS_arrow_down.svg" alt="down arrow" className="page-up-icon" />
						</div>
					:
						''
				}

				<div
					className="multiPage--wrapper"
					id="multiPage--wrapper"
					style={{
						overflowY: 'hidden',
					}}>

					<div className="page" id="homepage-login">
						<div className="logo">
						</div>

						<div style={{ visibility: ( this.props.user ? 'hidden' : 'visible') }}>
							<LoginForm
								fullForm={false}
								buttonTitle="Request an Invitation"
								subtitle="via Facebook" />
						</div>

						<div className="link-button--wrapper">
							<Button className="upload-link-button" onClick={ () => browserHistory.push('/upload') } isBigButton={ true } isSecondaryAction={ true }>Share My Sounds</Button>
							<Button className="popular-link-button" onClick={ () => browserHistory.push('/crowdradio') } isBigButton={ true } isSecondaryAction={ false }>Play Crowdradio</Button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}


HomeSmart.propTypes = smartPropTypes
HomeSmart.defaultProps = smartDefaultProps

const Home = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeSmart)

export {
	Home,
}