const TOOGLE_IS_FOOTER_OPENED = 'TOOGLE_IS_FOOTER_OPENED'
const SET_PLAYER_PROGRESS_BAR = 'SET_PLAYER_PROGRESS_BAR'

function toogleIsFooterOpened() {
	return {
		type: TOOGLE_IS_FOOTER_OPENED,
	}
}

function setPlayerProgressBar(progress) {
	return {
		type: SET_PLAYER_PROGRESS_BAR,
		progress
	}
}

export {
	SET_PLAYER_PROGRESS_BAR,
	TOOGLE_IS_FOOTER_OPENED,

	setPlayerProgressBar,
	toogleIsFooterOpened,
}