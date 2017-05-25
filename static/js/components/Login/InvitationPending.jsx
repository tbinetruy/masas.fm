import { Button } from '../UI/UI.jsx'
import React from 'react'

const InvitationPending= props => (
	<div className="invitation-pending--wrapper">
		<img src="/static/img/MASAS_icon_check_round.svg" alt="check logo" />
		<h2>thank you for your interest</h2>
		<Button
			isDisabled={ true }
			isBigButton={ true }
			isSecondaryAction={ true }
			onClick={ () => {} }
		>
			InvitationPending
		</Button>
		<p>
			We will send you an email when your invitation will be approved by a MASAS lover. With MASAS, we
			hope to nurture the true essence of an ever-expanding grassroots movement. Be part of the
			evolution, by simply sharing.
		</p>
	</div>
)

export {
	InvitationPending,
}