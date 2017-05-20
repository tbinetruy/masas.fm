import React, { PropTypes } from 'react'

import { browserHistory } from 'react-router'

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
	const goToURL = (path) => browserHistory.push(path)

	return (
		<span onClick={ props.onClick }>
			<span onClick={ !props.disabled ? goToURL.bind(null, props.to) : null }
				className={ 'MASAS-link ' + (props.className ? props.className : '') + (props.disabled ? ' disabled' : '') }
			>
				{ props.children }
			</span>
		</span>
	)
}

LinkDumb.propTypes = dumbPropTypes
LinkDumb.defaultProps = dumbDefaultProps

export {
	LinkDumb as Link,
}