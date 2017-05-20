import React, { PropTypes, createClass } from 'react'
import { connect } from 'react-redux'

import { MobileBlurBackground } from '../MASAS_mixins.jsx'


/**
 * Redux container
 */

const reduxStatePropTypes = {
	SCinfo: PropTypes.array,
	title: PropTypes.string,
	userLikes: PropTypes.array,
}

const mapStateToProps = function(state) {
	return {
		title: state.appReducer.pageTitle,
		SCinfo: state.likesReducer.SCinfo,
		userLikes: state.likesReducer.userLikes,
	}
}

const reduxDispatchPropTypes = {

}

const mapDispatchToProps = function(dispatch) {
	return {
	}
}


/**
 * Smart component
 */

const smartPropTypes = {
	...reduxStatePropTypes,
	...reduxDispatchPropTypes,

	children: PropTypes.node,
}

const LikesWrapperSmart = createClass({
	mixins: [ MobileBlurBackground ],

	propTypes: smartPropTypes,

	componentWillMount: function() {
		this.scrollOffset = 70
	},

	componentDidMount: function() {
		if(this.props.userLikes.length) {
			this.scrollOffset = document.getElementsByClassName('likes-searchbar--wrapper')[0].offsetHeight + document.getElementsByClassName('filters--wrapper')[0].offsetHeight + 10
			$('.box.page-content')[0].scrollTop = this.scrollOffset
		}
	},

	componentDidUpdate: function(prevProps, prevState) {
		if(this.props.userLikes.length && document.getElementsByClassName('likes-searchbar--wrapper')[0]	)
			this.scrollOffset = document.getElementsByClassName('likes-searchbar--wrapper')[0].offsetHeight + document.getElementsByClassName('filters--wrapper')[0].offsetHeight + 10

		if(this.props.userLikes.length === 1&& !prevProps.userLikes.length) {
			$('.box.page-content')[0].scrollTop = this.scrollOffset
		}
	},

	render: function() {
		var marginHeight = '4.2rem'
		var marginStyle = {
			minHeight:  marginHeight,
			maxHeight: marginHeight
		}
		return (
			<div className="app-body body--wrapper" >
				<div className="row row-display-none-sm no-margin" style={ marginStyle }>
					<div className="col-md-12 page-title--wrapper">
						<div className="box page-title">{ this.props.title }</div>
						<hr />
					</div>
				</div>
				<div className="row no-margin likes-scroll--wrapper">
					<div className="col-xs-12 col-md-12 page-content--wrapper">
						<div ref="scroll" className="box page-content" style={{ overflow: 'scroll', justifyContent: 'initial', backgroundColor: 'rgba(0,0,0,0)'}}>
							<div
								className="likes--wrapper"
								style={{ minHeight: 'calc(100% + ' + (this.props.userLikes.length ? this.scrollOffset : '0') + 'px)'  }}>
								{ this.props.children }
							</div>
						</div>
					</div>
				</div>

			</div>
		)
	}
})


const LikesWrapper = connect(
    mapStateToProps,
    mapDispatchToProps
)(LikesWrapperSmart)

export {
	LikesWrapper,
}
