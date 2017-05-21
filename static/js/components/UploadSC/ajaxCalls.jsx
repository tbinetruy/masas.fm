const $ = require('jquery')

const getUserTracks = (userPk, success, error) => {

		$.ajax({
			type: 'GET',
			url: 'api/users/' + userPk + '/',
			success: success,
			error: error,
		})

}

export {
	getUserTracks,
}