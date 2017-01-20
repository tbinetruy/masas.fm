var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/ProfileEdit.jsx")

var { Textbox } = require("../UI/UI.jsx")
var ProfileEditLinks = require("./ProfileEditLinks.jsx")
var CountryAutocomplete = require("./CountryAutocomplete.jsx")

var ProfileEdit = React.createClass({
	propTypes: {
		textboxValues: React.PropTypes.object,
		userData: React.PropTypes.object,
		show: React.PropTypes.bool.isRequired,		// should comp be shown

		updateTextboxValues: React.PropTypes.func,
	},

	componentDidMount: function() {
		if(this.props.userData.city !== null)
			this.props.updateTextboxValues({ city: this.props.userData.city.url })

		if(this.props.userData.name !== "")
			this.props.updateTextboxValues({ name: this.props.userData.name })

		if(this.props.userData.occupation !== "")
			this.props.updateTextboxValues({ occupation: this.props.userData.occupation })
	},

	updateName: function(name) {
		this.props.updateTextboxValues({ name })
	},

	updateCity: function(city) {
		this.props.updateTextboxValues({ city })
	},

	updateOccupation: function(occupation) {
		this.props.updateTextboxValues({ occupation })
	},

	render: function() {
		let {
			name,
			occupation
		} = this.props.textboxValues

		if(name === null)
			name = ""

		if(occupation === null)
			occupation = ""

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
						<CountryAutocomplete onChange={ this.updateCity }/>
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
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(ProfileEdit)
