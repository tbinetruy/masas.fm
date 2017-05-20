const TOOGLE_LEGALS_PAGE_NUMBER = 'TOOGLE_LEGALS_PAGE_NUMBER'

function toogleLegalsPageNumber(pageNumber) {
	return {
		type: TOOGLE_LEGALS_PAGE_NUMBER,
		pageNumber,
	}
}

export {
	TOOGLE_LEGALS_PAGE_NUMBER,
	toogleLegalsPageNumber,
}