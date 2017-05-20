import React, { PropTypes } from 'react'
import { connect }from 'react-redux'

import {
	changeUnsplashArtist,
	getNewBackground,
} from '../../reducers/actions/Home.js'

/**
 * Redux container
 */

const reduxStatePropTypes = {
	backgroundURL: PropTypes.string,
	isModalOpened: PropTypes.bool,
	modalType: PropTypes.number,
	unsplashArtistName: PropTypes.string,
	unsplashArtistUsername: PropTypes.string,
}

const mapStateToProps = function(state) {
	return {
		unsplashArtistUsername: state.homeReducer.unsplashArtistUsername,
		unsplashArtistName: state.homeReducer.unsplashArtistName,
		backgroundURL: state.homeReducer.backgroundURL,
		isModalOpened: state.appReducer.isModalOpened,
		modalType: state.appReducer.modalType,
	}
}

const reduxDispatchPropTypes = {
	updateBackgroundURL: PropTypes.func,
	updateUnsplashArtist: PropTypes.func,
}

const mapDispatchToProps = function(dispatch) {
	return {
		updateUnsplashArtist: () => dispatch(changeUnsplashArtist()),
		updateBackgroundURL: () => dispatch(getNewBackground()),
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

class UnsplashControlsSmart extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidUpdate() {
		if(document.getElementById('app-bg-image'))
			document.getElementById('app-bg-image').style.backgroundImage = 'url(' + this.props.backgroundURL + ')'
	}

	render() {
		return (
			<div className={ 'unsplash-controls ' + (this.props.modalType === 2 && this.props.isModalOpened ? 'hidden' : '') }>
				<div className="artist-controls">
					<a onClick={ this.props.updateUnsplashArtist }>
						<img src="/static/img/MASAS_icon_change_photograph.svg" alt="random-artist" />
					</a>
					<a href={ 'https://unsplash.com/' + this.props.unsplashArtistName } target="_blank">{ this.props.unsplashArtistName }</a>
				</div>
				<div className="background-controls">
					<a onClick={ this.props.updateBackgroundURL }>
						<img src="/static/img/MASAS_icon_change_unsplash_user.svg" alt="random-background" />
					</a>
				</div>
			</div>
		)
	}
}

UnsplashControlsSmart.propTypes = smartPropTypes
UnsplashControlsSmart.defaultProps = smartDefaultProps

const UnsplashControls = connect(
    mapStateToProps,
    mapDispatchToProps
)(UnsplashControlsSmart)

export {
	UnsplashControls,
}
