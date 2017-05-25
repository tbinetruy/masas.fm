import React from 'react'
import * as createClass from 'create-react-class'

import { BlurBackground } from '../MASAS_mixins.jsx'
import { Button } from '../UI/UI.jsx'
import { goToURL } from '../../MASAS_functions.jsx'

/**
 * Dumb component
 */

const dumbPropTypes = {
}

const dumbDefaultProps = {
}

const NoLikesComponentDumb = props => (
	<div className="no-like--wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', minHeight: '17rem'}}>
			<img src="/static/img/MASAS_no_likes.svg" alt="like icon" />
			<p style={{ fontSize: '1.2rem'}}>
				You haven't liked any sounds yet
			</p>
			<Button
				isBigButton={ true }
				isSecondaryAction={ false }
				onClick={ () => goToURL('/discover') }>
				Start discovering new music
			</Button>
		</div>
	</div>
)

NoLikesComponentDumb.propTypes = dumbPropTypes
NoLikesComponentDumb.defaultProps = dumbDefaultProps


/**
 * Smart component
 *
 * blur bg mixin forces use of createClass
 */

const NoLikesComponentSmart = createClass({
	mixins: [ BlurBackground ],

	propTypes: {
	},

	render: function() {
		return (
			<NoLikesComponentDumb />
		)
	}
})

export {
	NoLikesComponentSmart as NoLikesComponent,
}