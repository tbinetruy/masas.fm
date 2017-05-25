import React from 'react'
import PropTypes from 'prop-types'

/**
 * Smart component
 */

const smartPropTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	id: PropTypes.string,
	onChange: PropTypes.func.isRequired,			// function called on onchange callback
}

const smartDefaultProps = {
}

class CheckboxSmart extends React.Component {
    constructor(props) {
        super(props)

		this.state = {
			isChecked: false,					// (BOOL) is checkbox checked
		}

		this.handleOnChange = this.handleOnChange.bind(this)
    }

	handleOnChange(e) {
		this.setState({ isChecked: !this.state.isChecked })
		this.props.onChange(!this.state.isChecked)
	}

	render() {
		return (
			<div className={ 'MASAS-checkbox ' + (this.props.className ? this.props.className : '')}>
				<input
					type="checkbox"
					checked={ this.state.isChecked }
					onChange={ this.handleOnChange }
					className="input"
					id={this.props.id} />
				<label className="label" htmlFor={this.props.id}>{this.props.children}</label>
			</div>
		)
	}
}

CheckboxSmart.propTypes = smartPropTypes
CheckboxSmart.defaultProps = smartDefaultProps

export {
	CheckboxSmart as Checkbox,
}