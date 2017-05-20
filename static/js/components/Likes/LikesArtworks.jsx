/**
 * DISPLAYS USER LIKES (propTypes)
 * creates invisible artworks to keep the last line aligned left using flexbox
 */

const { defaultState } = require('../../reducers/Likes.jsx')

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { LikesItem } from './LikesItem.jsx'
import { changeBgState } from '../../reducers/actions/App.js'
import { updateNumberLikesShown } from '../../reducers/actions/Likes.js'
import { NoLikesComponent } from './NoLikesComponent.jsx'
import { Button } from '../UI/UI.jsx'
const defaultNumRowLikesShown = defaultState.numRowLikesShown


/**
 * Redux container
 */

const reduxStatePropTypes = {
	bgFilter: PropTypes.object,
	numRowLikesShown: PropTypes.number,
	userLikesUnfiltered: PropTypes.array,
}

const mapStateToProps = function(state) {
	return {
		bgFilter: state.appReducer.bgFilter,
		userLikesUnfiltered: state.likesReducer.userLikes,
		numRowLikesShown: state.likesReducer.numRowLikesShown
	}
}

const reduxDispatchPropTypes = {
	blurBg: PropTypes.func,
	blurBgMobile: PropTypes.func,
	saturateBg: PropTypes.func,
	saturateBgMobile: PropTypes.func,
	updateNumberLikesShown: PropTypes.func,
}

const mapDispatchToProps = function(dispatch) {
	return {
		updateNumberLikesShown: number => dispatch(updateNumberLikesShown(number)),
		blurBg: (blur) => dispatch(changeBgState.blur(blur)),
		saturateBg: (sat) => dispatch(changeBgState.saturate(sat)),
		blurBgMobile: (blur) => dispatch(changeBgState.blurMobile(blur)),
		saturateBgMobile: (sat) => dispatch(changeBgState.saturateMobile(sat)),
	}
}


/**
 * Smart component
 */

const smartPropTypes = {
	...reduxStatePropTypes,
	...reduxDispatchPropTypes,

	SCinfo: PropTypes.array,
	showMoreLikesButton: PropTypes.bool,
	updateShowMoreLikesButton: PropTypes.func,
	userData: PropTypes.object,
	userLikes: PropTypes.array,
}

const smartDefaultProps = {
}

class LikesArtworksSmart extends React.Component {
    constructor(props) {
        super(props)
    }

	componentWillMount() {
		this.numArtworkPerLine = 10
	}

	componentWillUnmount() {
		// hide extra like artworks when umounting
		this.props.updateNumberLikesShown(defaultNumRowLikesShown)
	}

	// show songs if user has any likes
	// otherwise, let him know he hasn't liked any songs yet
	renderLikes() {
		if (!this.props.userLikesUnfiltered.length)
			return <NoLikesComponent />
		else {
			// // sort by uploaded time
			const songs = this.props.userLikes

			var songList =  songs.map((song) => {
				return <LikesItem
						key={ song.MASAS_songInfo.pk }
						MASAS_songPk={ song.MASAS_songInfo.pk }
						SCinfo={ song.SC_songInfo }
						MASASinfo={ song.MASAS_songInfo.song }
						artistInfo={ song.artistInfo }
						isShowingArtistInfo={ song.showProfile } />
			})

			// songList = this.filterLikes(songList)
			if(this.shouldFilterLikes()) {
				const totalNumArtworkShown = this.props.numRowLikesShown * this.numArtworkPerLine
				songList = songList.slice(0, totalNumArtworkShown)
			}

			return songList
		}
	}

	/**
		** Purpose **
		returns width of artwork and likes wrapper before component render

		** returns **
		{ artworkWidth: int, likesWrapperWidth: int }
		units: px
	*/
	getElementsWidth() {
		// insert artwork wrapper in body to get its width
		// for the artwork, we can just get the hardcoded width from css

		var $artworkWrapper = $('<div class=\'likes-scroll--wrapper\'><div class=\'likes--wrapper\'><div class=\'likes-artworks--wrapper\'><div class=\'likes-item--wrapper\'><div class=\'artwork--wrapper\'><img class=\'artwork\'/></div></div></div></div></div>').hide().appendTo('body')
		const artworkInnerWidth = $artworkWrapper.css('width').replace('px', '')
		// const artworkMargin = window.getComputedStyle(document.getElementsByClassName('likes-item--wrapper')[0]).margin.replace('px', '')
		const artworkWidth = parseInt(artworkInnerWidth)


		// same for likes wrapper
		// but now we have to get the getComputedStyle() because width is dynamically defined based on window width
		var $likesWrapper = $('<div class=\'likes-scroll--wrapper\'><div class=\'likes--wrapper\'></div></div>').hide().appendTo('body')
		const likesWrapperWidth = window.getComputedStyle(document.getElementsByClassName('likes--wrapper')[0]).width.replace('px', '')

		// remove dummy elements now that we have their width
		$artworkWrapper.remove()
		$likesWrapper.remove()

		return { artworkWidth, likesWrapperWidth }
	}

	/**
		** goal **
		calculates how many are missing on the last line to align all artworks left

		** output **
		jsx elements
	*/
	alignArtworksLeft() {
		// don't align if user has no likes
		if(!this.props.userLikes.length)
			return

		const { artworkWidth, likesWrapperWidth } = this.getElementsWidth()

		const A = likesWrapperWidth
		const B = artworkWidth

		if(B === 0)
			return

		let artworkCount = 0
		if(this.props.SCinfo)
			artworkCount = this.props.SCinfo.length		// artwork count

		// calculate how many artworks fit in a line
		const n_line = Math.floor(A/B)
		this.numArtworkPerLine = n_line

		// calculate how many artworks are on the last line
		const n_lastLine = artworkCount % n_line

		// return the missing artworks to align the last line to the left if need be
		let divArray = []
		for(let i = 0; i < (n_line - n_lastLine); i++) {
			divArray.push(<div key={ i } className="filler-artwork" style={{ height: 0, width: artworkWidth }}></div>)
		}

		return divArray
	}

	shouldFilterLikes() {
		const songList = this.props.userLikes
		const totalNumArtworkShown = this.props.numRowLikesShown * this.numArtworkPerLine

		if(songList.length > totalNumArtworkShown)
			return true
		else
			return false
	}

	render() {
		return (
			<div className="likes-artworks--wrapper">
				{ this.renderLikes() }
				{ this.alignArtworksLeft() }
				<div
					className="button-container"
					style={{ display: (this.shouldFilterLikes() ? 'flex' : 'none') }}>
					<Button
						onClick={ () => this.props.updateNumberLikesShown(this.props.numRowLikesShown + defaultNumRowLikesShown) }
						isSecondaryAction={ true }
						isBigButton={ true }>Load more</Button>
				</div>
			</div>
		)
	}
}

LikesArtworksSmart.propTypes = smartPropTypes
LikesArtworksSmart.defaultProps = smartDefaultProps

const LikesArtworks = connect(
    mapStateToProps,
    mapDispatchToProps
)(LikesArtworksSmart)

export {
	LikesArtworks,
}
