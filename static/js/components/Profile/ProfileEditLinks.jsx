import PropTypes from 'prop-types'
import React from 'react'
import { Textbox } from '../UI/UI.jsx'
import { connect } from 'react-redux'
import { updateEditProfileTextboxValues } from '../../reducers/actions/Profile.js'

/**
 * Redux container
 */

const reduxStatePropTypes = {
	textboxValues: PropTypes.object,
	userData: PropTypes.object,
}

const mapStateToProps = function(state) {
	return {
		textboxValues: state.profileReducer.textboxValues,
		userData: state.appReducer.userData,
	}
}

const reduxDispatchPropTypes = {
	updateTextboxValues: PropTypes.func,
}

const mapDispatchToProps = function(dispatch) {
	return {
		updateTextboxValues: textboxValues => dispatch(updateEditProfileTextboxValues(textboxValues)),
	}
}


/**
 * Smart component
 */

const smartPropTypes = {
	...reduxStatePropTypes,
	...reduxDispatchPropTypes,

	show: PropTypes.bool.isRequired,		// should comp be shown
}

const smartDefaultProps = {
}

class ProfileEditLinksSmart extends React.Component {
    constructor(props) {
        super(props)

		this.updateLink1 = this.updateLink1.bind(this)
		this.updateLink2 = this.updateLink2.bind(this)
		this.updateLink3 = this.updateLink3.bind(this)
		this.updateLink4 = this.updateLink4.bind(this)
    }

	componentWillMount() {
		if(this.props.show)
			this.props.userData.link_set.map(({ link }) => {
				// using set timeout to give time to update app state after each map iteration
				window.setTimeout(() => {
					if(link.includes('soundcloud.com'))
						this.updateLink1(link)

					if(link.includes('twitter.com'))
						this.updateLink2(link)

					if(link.includes('.') && !(link.includes('soundcloud.com')) && !(link.includes('facebook.com'))&& !(link.includes('twitter.com')))
						this.updateLink3(link)

					if(link.includes('facebook.com'))
						this.updateLink4(link)
				},0)
			})
	}

	updateLink1(url) {
		var link_set = [...this.props.textboxValues.link_set]
		link_set[0] = url
		this.props.updateTextboxValues({ link_set })
	}

	updateLink2(url) {
		var link_set = [...this.props.textboxValues.link_set]
		link_set[1] = url
		this.props.updateTextboxValues({ link_set })
	}

	updateLink3(url) {
		var link_set = [...this.props.textboxValues.link_set]
		link_set[2] = url
		this.props.updateTextboxValues({ link_set })
	}

	updateLink4(url) {
		var link_set = [...this.props.textboxValues.link_set]
		link_set[3] = url
		this.props.updateTextboxValues({ link_set })
	}

	render() {
		if(this.props.show)
			return (
				<div className="links-edit--wrapper">
					<div className="link-edit">
						<img src="/static/img/MASAS_logo_soundcloud.svg" alt="soundcloud" />
						<Textbox onChange={ this.updateLink1 } value={ this.props.textboxValues.link_set[0] } />
					</div>
					<div className="link-edit">
						<img src="/static/img/twitter.svg" alt="twitter" />
						<Textbox onChange={ this.updateLink2 } value={ this.props.textboxValues.link_set[1] } />
					</div>
					<div className="link-edit">
						<img src="/static/img/MASAS_logo_world.svg" alt="personal page" />
						<Textbox onChange={ this.updateLink3 } value={ this.props.textboxValues.link_set[2] } />
					</div>
					<div className="link-edit">
						<img src="/static/img/facebook.svg" alt="facebook" />
						<Textbox onChange={ this.updateLink4 } value={ this.props.textboxValues.link_set[3] } />
					</div>
				</div>
			)
		else
			return <div></div>
	}
}

ProfileEditLinksSmart.propTypes = smartPropTypes
ProfileEditLinksSmart.defaultProps = smartDefaultProps

const ProfileEditLinks = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileEditLinksSmart)

export {
	ProfileEditLinks,
}
