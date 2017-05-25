import React from 'react'
import PropTypes from 'prop-types'

/**
 * Dumb component
 */

const dumbPropTypes = {
	ranking: PropTypes.number,
}

const dumbDefaultProps = {
}

const RankingInfoIconDumb = props => {
	const getInfoText = () => {
		if(props.ranking === 0)
			return 'Out'
		else if(props.ranking === 1)
			return 'Popular'
		else
			return 'Discover'
	}

	var viewBoxHeight = 30
	var lineYCoord = '' + (viewBoxHeight - 10)

	var discoverStart = 33
	var discoverEnd = 87

	var infoPosition = { t1: '0', t2: '0', c: '0'}
	if(props.ranking === 0)
		infoPosition = { t1: '13.4', t2: '13', c: '20' }
	else if(props.ranking === 1)
		infoPosition = { t1: '87.4', t2: '87', c: '100' }
	else {
		infoPosition = {
			t1: (props.ranking * (discoverEnd - discoverStart) + discoverStart) - 15 + '',
			t2: (props.ranking * (discoverEnd - discoverStart) + discoverStart) - 15 + '',
			c: (props.ranking * (discoverEnd - discoverStart) + discoverStart) + '',
		}
	}

	return (
		<div className="RankingInfoIcon--wrapper">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox={ '0 0 120 ' + viewBoxHeight }
				className="line">
				<line x1="10" y1={ lineYCoord } x2={ (discoverStart -3) + ''} y2={ lineYCoord } className="out" />
				<line x1={ discoverStart + '' } y1={ lineYCoord } x2={ discoverEnd + '' } y2={ lineYCoord } className="discover" />
				<line x1={ (discoverEnd + 3) + '' } y1={ lineYCoord } x2="110" y2={ lineYCoord } className="popular" />
				<circle cx={ infoPosition.c } cy={ lineYCoord } r="3" className="circle" />
				<text x={ infoPosition.t1 } y="5" className="line1">Now in</text>
				<text x={ infoPosition.t2 } y="12" className="line2">
					{ getInfoText() }
				</text>
			</svg>
		</div>
	)
}

RankingInfoIconDumb.propTypes = dumbPropTypes
RankingInfoIconDumb.defaultProps = dumbDefaultProps

export {
	RankingInfoIconDumb as RankingInfoIcon,
}