import PropTypes from 'prop-types'
import React from 'react'

/**
 * Dumb component
 */

const dumbPropTypes = {
		children: PropTypes.node,
		error: PropTypes.bool,				// true = error
		id: PropTypes.string,
		labelError: PropTypes.string,			// textbox label when error
}

const dumbDefaultProps = {
}

const PasswordDumb = props => (
	<div className="MASAS-password">
		<div className={ 'wrapper' + (props.error ? ' error ' : '') }>
			<label className="MASAS-label" htmlFor={ props.id }>
				{ props.error ?
					props.labelError
					:
					props.children
				}
			</label>
			<input id={ props.id } className="MASAS-password-input" type="password" />
		</div>
	</div>
)

PasswordDumb.propTypes = dumbPropTypes
PasswordDumb.defaultProps = dumbDefaultProps

export {
	PasswordDumb as Password,
}
