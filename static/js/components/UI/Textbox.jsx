import React, { PropTypes } from 'react'


/**
 * Smart component
 */

const smartPropTypes = {
	children: PropTypes.node,
	error: PropTypes.bool,				// true = error
	id: PropTypes.string, 				// name used to display textbox and error UI properly
	isRequired: PropTypes.bool,
	labelError: PropTypes.string,			// textbox label when error
	onChange: PropTypes.func,			// callback called when input field changes
	value: PropTypes.string,				// value of input field
}

const smartDefaultProps = {
	onChange: () => {},
	required: false,
}

class TextboxSmart extends React.Component {
    constructor(props) {
        super(props)

		this.state = {
			input: '',
		}

		this.onInputChange = this.onInputChange.bind(this)
    }

	onInputChange(e) {
		this.props.onChange(e.target.value)
	}

	render() {
		return (
			<div className="MASAS-textbox">
				<div className={'MASAS-textbox--wrapper' + (this.props.error ? ' error' : '')}>
					<input id={this.props.id} value={ this.props.value } onChange={ this.onInputChange } className="MASAS-text-input" type="text" />
					<label className={ 'MASAS-label' + (this.props.isRequired ? ' required' : '') } htmlFor={this.props.id}>
						{
							this.props.children ?
								this.props.error ?
									this.props.labelError
								:
									( this.props.children + ( this.props.isRequired ? ' *' : '' ) )
							:
								null
						}
					</label>
				</div>
			</div>
		)
	}
}


TextboxSmart.propTypes = smartPropTypes
TextboxSmart.defaultProps = smartDefaultProps

export {
	TextboxSmart as Textbox,
}