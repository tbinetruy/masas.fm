import {
	changeModalContent,
	toogleIsModalOpened,
} from '../../../reducers/actions/App.js'


const mapStateToProps = function(state) {
	return {

	}
}

const mapDispatchToProps = function(dispatch) {
	return {
		chooseTime: (song) => dispatch({type:'SYNC_SONG', song: song}),
		toogleModal: () => dispatch(toogleIsModalOpened()),
		updateModalContent: (modalContent, modalType) => dispatch(changeModalContent(modalContent, modalType)),
	}
}

export {
	mapDispatchToProps,
	mapStateToProps,
}
