import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import {
	changeModalContent,
	toogleIsModalOpened
} from '../../reducers/actions/App.js'

import { toogleHashtagFilter } from '../../reducers/actions/Likes.js'


/**
 * Redux container
 */

const reduxStatePropTypes = {
	hashtagFilter: React.PropTypes.array,
}

const mapStateToProps = function(state) {
	return {
		hashtagFilter: state.likesReducer.hashtagFilter,
	}
}

const reduxDispatchPropTypes = {
	toogleHashtag: PropTypes.func,
	toogleModal: PropTypes.func,
	updateModalContent: PropTypes.func,
}

const mapDispatchToProps = function(dispatch) {
	return {
		toogleModal: () => dispatch(toogleIsModalOpened()),
		updateModalContent: modalContent => dispatch(changeModalContent(modalContent)),
		toogleHashtag: hashtagNumber => dispatch(toogleHashtagFilter(hashtagNumber)),
	}
}


/**
 * Smart component
 */

const smartPropTypes = {
	...reduxStatePropTypes,
	...reduxDispatchPropTypes,

}

const smartDefaultProps = {
}

class FiltersModalSmart extends React.Component {
    constructor(props) {
        super(props)

		this.toggleFilter = this.toggleFilter.bind(this)
    }

	componentWillMount() {
	}

	toggleFilter(hashtagNumber) {
		this.props.toogleHashtag(hashtagNumber)
	}

	render() {
		return (
			<div className="filters-modal--wrapper">
				<h1>Filter for:</h1>
				<div onClick={ this.toggleFilter.bind(this, 0) } className={ 'filter ' + ( this.props.hashtagFilter[0] ? 'active' : '' )}># EarlyMorning</div>
				<div onClick={ this.toggleFilter.bind(this, 1) } className={ 'filter ' + ( this.props.hashtagFilter[1] ? 'active' : '' )}># LateMorning</div>
				<div onClick={ this.toggleFilter.bind(this, 2) } className={ 'filter ' + ( this.props.hashtagFilter[2] ? 'active' : '' )}># EarlyAfternoon</div>
				<div onClick={ this.toggleFilter.bind(this, 3) } className={ 'filter ' + ( this.props.hashtagFilter[3] ? 'active' : '' )}># LateAfternoon</div>
				<div onClick={ this.toggleFilter.bind(this, 4) } className={ 'filter ' + ( this.props.hashtagFilter[4] ? 'active' : '' )}># EarlyEvening</div>
				<div onClick={ this.toggleFilter.bind(this, 5) } className={ 'filter ' + ( this.props.hashtagFilter[5] ? 'active' : '' )}># LateEvening</div>
			</div>
		)
	}
}

FiltersModalSmart.propTypes = smartPropTypes
FiltersModalSmart.defaultProps = smartDefaultProps

const FiltersModal = connect(
    mapStateToProps,
    mapDispatchToProps
)(FiltersModalSmart)

export {
	FiltersModal,
}


