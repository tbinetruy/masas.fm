/**
 * FETCHES LIKES INFO, FILTERS IT IF NECESSARY, AND FEEDS THE DATA
 * TO A SUB-COMPONENT THAT DISPLAYS IT
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { LikesArtworks } from './LikesArtworks.jsx'
import { FiltersModal } from './FiltersModal.jsx'
var { Textbox } = require('../UI/UI.jsx')
import { LikesWrapper } from './LikesWrapper.jsx'

var { isSubsequence, timeIntervalURLToString } = require('../../MASAS_functions.jsx')

import {
	fetchLikes,
	toogleHashtagFilter,
	updateLikes,
	updateLikesSearchInput,
} from '../../reducers/actions/Likes.js'

import {
	changeModalContent,
	toogleIsModalOpened,
	updatePageTitle,
} from '../../reducers/actions/App.js'


/**
 * Redux container
 */

const reduxStatePropTypes = {
	SCinfo: PropTypes.array,
	hashtagFilter: PropTypes.array,
	searchInput: PropTypes.string,
	userData: PropTypes.object,
	userLikes: PropTypes.array,
}

const mapStateToProps = function(state) {
	return {
		userData: state.appReducer.userData,
		SCinfo: state.likesReducer.SCinfo,
		searchInput: state.likesReducer.searchInput,
		hashtagFilter: state.likesReducer.hashtagFilter,
		userLikes: state.likesReducer.userLikes,
	}
}

const reduxDispatchPropTypes = {
	getLikes: PropTypes.func,
	toggleHashtag: PropTypes.func,
	toogleModal: PropTypes.func,
	updateLikes: PropTypes.func,
	updateModalContent: PropTypes.func,
	updateSearchInput: PropTypes.func,
	updateTitle: PropTypes.func,
}

const mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch(updatePageTitle(title, pageType)),
		getLikes: () => dispatch(fetchLikes()),
		updateLikes: SCinfo => dispatch(updateLikes(SCinfo)),
		toogleModal: () => dispatch(toogleIsModalOpened()),
		updateModalContent: modalContent => dispatch(changeModalContent(modalContent)),
		toogleHashtag: hashtagNumber => dispatch(toogleHashtagFilter(hashtagNumber)),
		updateSearchInput: input => dispatch(updateLikesSearchInput(input)),
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

class LikesSmart extends React.Component {
    constructor(props) {
        super(props)

		this.getLikes = this.getLikes.bind(this)
		this.filterLikes = this.filterLikes.bind(this)
		this.openFiltersModal = this.openFiltersModal.bind(this)
		this.toggleFilter = this.toggleFilter.bind(this)
		this.updateSearchInput = this.updateSearchInput.bind(this)
    }

	componentWillMount() {
		this.props.updateTitle('Likes', '0')		// 0 = menu icon; 1 = arrow back

		this.getLikes()
	}

	componentDidMount() {
	}

	componentDidUpdate(prevProps) {
		if(JSON.stringify(prevProps.userData) !== JSON.stringify(this.props.userData))
			this.getLikes()
	}

	componentWillUnmount() {
		for(var i = 0; i < this.props.hashtagFilter.length; i++) {
			if(this.props.hashtagFilter[i])
				this.props.toogleHashtag(i)
		}
	}

	getLikes() {
		this.props.getLikes()
	}

	filterLikes() {
		if(this.props.userLikes) {
			var songList = this.props.userLikes

			// sort by liked time
			songList.sort((a,b) => { return Date.parse(b.MASAS_songInfo.created) - Date.parse(a.MASAS_songInfo.created) })

			var radioTimeString = timeIntervalURLToString

			var filteredSongList = songList.filter((song) => {
				if(song === 0)
					return false

				// match filter string entered by user with a string of info relevant to each song.
				// should refactor this into a "searchStringFilter" function
				var songSearchString = radioTimeString(
					song.MASAS_songInfo.song.timeInterval)
					+ ' '
					+ song.SC_songInfo.title
					+ ' '
					+ song.SC_songInfo.tag_list
					+ ' '
					+ song.SC_songInfo.user.username

				return isSubsequence(this.props.searchInput, songSearchString)
			})

			// filter by hashtag buttons
			var testVar = this.props.hashtagFilter.filter((hashtag) => {
				return hashtag
			})

			// loop and filter for each hashtag button selected by user
			if(testVar.length !== 0) {
				for(var i = 0; i < this.props.hashtagFilter.length; i++) {
					if(!this.props.hashtagFilter[i]) {
						filteredSongList = filteredSongList.filter((song) => {
							var timeIntervalURL = song.MASAS_songInfo.song.timeInterval
							var hashtagNumber = timeIntervalURL.substr(timeIntervalURL.length - 2, 1)
							return parseInt(hashtagNumber) - 1 !== i
						})
					}
				}
			}

			return filteredSongList
		} else
			return
	}

	openFiltersModal() {
		this.props.updateModalContent(<FiltersModal />)
		this.props.toogleModal()
	}

	toggleFilter(hashtagNumber) {
		this.props.toogleHashtag(hashtagNumber)
	}

	updateSearchInput(searchInput) {
		this.props.updateSearchInput(searchInput)
	}

	render() {
		return (
			<LikesWrapper>
					{
						this.props.userLikes.length ?
							<div className="likes-searchbar--wrapper" id="likes-searchbar-wrapper">
								<img src="/static/img/MASAS_search.svg" alt="serach-icon" />
								<Textbox id="likes--search-textbox" value={ this.props.searchInput } onChange={ this.updateSearchInput } />
								<img onClick={ this.openFiltersModal } className="filter-icon" alt="filter-songs" src="/static/img/MASAS_icon_filter.svg" />
							</div>
						:
							''
					}
					{
						this.props.userLikes.length ?
							<div className="filters--wrapper">
								<div onClick={ this.toggleFilter.bind(this, 0) } id="filter-early-morning" className={ 'tag-filter ' + ( this.props.hashtagFilter[0] ? 'enable' : '' )}>#EarlyMorning</div>
								<div onClick={ this.toggleFilter.bind(this, 1) } id="filter-late-morning" className={ 'tag-filter ' + ( this.props.hashtagFilter[1] ? 'enable' : '' )}>#LateMorning</div>
								<div onClick={ this.toggleFilter.bind(this, 2) } id="filter-early-afternoon" className={ 'tag-filter ' + ( this.props.hashtagFilter[2] ? 'enable' : '' )}>#EarlyAfternoon</div>
								<div onClick={ this.toggleFilter.bind(this, 3) } id="filter-late-afternoon" className={ 'tag-filter ' + ( this.props.hashtagFilter[3] ? 'enable' : '' )}>#LateAfternoon</div>
								<div onClick={ this.toggleFilter.bind(this, 4) } id="filter-early-evening" className={ 'tag-filter ' + ( this.props.hashtagFilter[4] ? 'enable' : '' )}>#EarlyEvening</div>
								<div onClick={ this.toggleFilter.bind(this, 5) } id="filter-late-evening" className={ 'tag-filter ' + ( this.props.hashtagFilter[5] ? 'enable' : '' )}>#LateEvening</div>
							</div>
						:
							''
					}

					<LikesArtworks
						SCinfo={ this.props.SCinfo }
						userData={ this.props.userData }
						userLikes={ this.filterLikes(this.props.userLikes) } />

			</LikesWrapper>
		)
	}
}


LikesSmart.propTypes = smartPropTypes
LikesSmart.defaultProps = smartDefaultProps

const Likes = connect(
    mapStateToProps,
    mapDispatchToProps
)(LikesSmart)

export {
	Likes,
}





