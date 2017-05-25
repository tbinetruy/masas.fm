import PropTypes from 'prop-types'
import React from 'react'

import { Link } from 'react-router-dom'

/**
 * Dumb component
 */

const dumbPropTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
	to: PropTypes.string,				// path to forward to
}

const dumbDefaultProps = {
	onClick: () => {},
}

const LinkDumb = props => {
	const disableLink = e => e.preventDefault()

	return (
		<span onClick={ props.onClick }>
			<Link to={ props.to ? props.to : '/' }
				className={ 'MASAS-link ' + (props.className ? props.className : '') + (props.disabled ? ' disabled' : '') }
			>
				{ props.children }
			</Link>
		</span>
	)
}

LinkDumb.propTypes = dumbPropTypes
LinkDumb.defaultProps = dumbDefaultProps

export {
	LinkDumb as Link,
}