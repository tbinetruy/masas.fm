import React from 'react'
import PropTypes from 'prop-types'

const dumbPropTypes = {
	children: PropTypes.node,
	className: PropTypes.string,				// class names
	facebook: PropTypes.bool, 			// is button style for FB login
	isBigButton: PropTypes.bool, 			// is it a big button
	isDisabled: PropTypes.bool,			// is button disabled
	isSecondaryAction: PropTypes.bool,		// is it a secondary button
	noBorders: PropTypes.bool,				// should button have borders
	onClick: PropTypes.func.isRequired,		// what to do when user clicks on button
	soundcloud: PropTypes.bool,			// is it soundcloud themes button
	twitter: PropTypes.bool, 			// is button style for Twitterlogin
	wrapperStyle: PropTypes.object,		// styles associated with button wrapper
}

const dumbDefaultProps = {
	noBorders: false,
	className: '',
	isDisabled: false,
	isSecondaryAction: false,
	isBigButton: true,
	wrapperStyle: {},
	soundcloud: false,
	facebook: false,
	twitter: false,
}

const ButtonDumb = props => (
	<div
		className={
			'MASAS-button '
			+ (props.isSecondaryAction ? 'secondary-button ' : '')
			+ (props.className ? (' ' + props.className + ' ') : '')
			+ (props.isBigButton ? 'MASAS-big-button ' : '')
			+ (props.noBorders ? ' no-borders ' : '')
			+ (props.isDisabled ? ' disabled ' : '')
			+ (props.soundcloud ? ' soundcloud-login-button' : '')
			+ (props.facebook ? ' facebook-login-button' : '')
			+ (props.twitter ? ' twitter-login-button' : '')
		}
		onClick={ !props.isDisabled ? props.onClick : ( () => {} ) }
		style={ props.wrapperStyle }>
		<div className={'wrapper'}>
			{
				props.soundcloud ?
					<img src="/static/img/MASAS_logo_soundcloud.svg" alt="soundcloud login" />
				:
					''
			}
			{
				props.facebook ?
					<img src="/static/img/facebook.svg" className="facebook-icon" alt="facebook login" />
				:
					''
			}
			{
				props.twitter ?
					<img src="/static/img/facebook.svg" alt="twitter login" />
				:
					''
			}
			{ props.children }
		</div>
	</div>
)


ButtonDumb.propTypes = dumbPropTypes
ButtonDumb.defaultProps = dumbDefaultProps

export {
	ButtonDumb as Button,
}