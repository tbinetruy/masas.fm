import {
	login
} from "../../../reducers/actions/Login.js"

export const mapStateToProps = state => {
	return {

	}
}

export const mapDispatchToProps = dispatch => {
	return {
		login: token => dispatch(login('twitter', token)),
	}
}

