
const defaultState = {}

const templateReducer = function(state = defaultState, action) {

	switch(action.type) {
		case 'TYPE':
			return {
				...state,
				type: action.type
			};

		default:
			return state
	}
}

export {
	defaultState,
	templateReducer,
}