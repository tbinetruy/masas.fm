import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { Textbox } from '../UI/UI.jsx'
import { ProfileEditLinks } from './ProfileEditLinks.jsx'
import { CountryAutocomplete } from './CountryAutocomplete.jsx'
import { updateEditProfileTextboxValues } from '../../reducers/actions/Profile.js'

/**
 * Redux container
 */

const reduxStatePropTypes = {
	textboxValues: React.PropTypes.object,
	userData: React.PropTypes.object,
}

const mapStateToProps = function(state) {
	return {
		textboxValues: state.profileReducer.textboxValues,
		userData: state.appReducer.userData,
	}
}

const reduxDispatchPropTypes = {
	updateTextboxValues: React.PropTypes.func,
}

const mapDispatchToProps = function(dispatch) {
	return {
		updateTextboxValues: textboxValues => dispatch(updateEditProfileTextboxValues(textboxValues))
	}
}


/**
 * Smart component
 */

const smartPropTypes = {
	...reduxStatePropTypes,
	...reduxDispatchPropTypes,

	show: React.PropTypes.bool.isRequired,		// should comp be shown
}

const smartDefaultProps = {
}

class ProfileEditSmart extends React.Component {
    constructor(props) {
        super(props)

		this.updateName = this.updateName.bind(this)
		this.updateCity = this.updateCity.bind(this)
		this.updateOccupation = this.updateOccupation.bind(this)
    }

	componentDidMount() {
		if(this.props.userData.city !== null)
			this.props.updateTextboxValues({ city: this.props.userData.city.url })

		if(this.props.userData.name !== '')
			this.props.updateTextboxValues({ name: this.props.userData.name })

		if(this.props.userData.occupation !== '')
			this.props.updateTextboxValues({ occupation: this.props.userData.occupation })
	}

	updateName(name) {
		this.props.updateTextboxValues({ name })
	}

	updateCity(city) {
		this.props.updateTextboxValues({ city })
	}

	updateOccupation(occupation) {
		this.props.updateTextboxValues({ occupation })
	}

	render() {
		let {
			name,
			occupation
		} = this.props.textboxValues

		if(name === null)
			name = ''

		if(occupation === null)
			occupation = ''

		if(this.props.show)
			return (
				<div className="profile-edit--wrapper">
					<div className="personal-info">
						<Textbox
							onChange={ this.updateName }
							value={ name }
							id="stage-name"
							isRequired={ true }>
							Stage Name
							</Textbox>
						<CountryAutocomplete onChange={ this.updateCity } />
						<Textbox onChange={ this.updateOccupation } value={ occupation } id="occupation">Occupation</Textbox>
					</div>
					<div className="links-info">
						<ProfileEditLinks show={ this.props.show } />
					</div>
				</div>
			)
		else
			return <div></div>
	}
}

ProfileEditSmart.propTypes = smartPropTypes
ProfileEditSmart.defaultProps = smartDefaultProps

const ProfileEdit = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileEditSmart)

export {
	ProfileEdit,
}
