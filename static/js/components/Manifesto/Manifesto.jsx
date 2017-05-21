import * as React from 'react'
import { connect }from 'react-redux'

import {
	Body,
	Link,
} from '../UI/UI.jsx'

import {
	updateTipBar,
} from '../../reducers/actions/Header.js'


/**
 * Redux container
 */

const reduxStatePropTypes = {

}

const mapStateToProps = function(state) {
	return {
	}
}

const reduxDispatchPropTypes = {
	updateTipBar: React.PropTypes.func,
}

const mapDispatchToProps = function(dispatch) {
	return {
		updateTipBar: (text, step, tipCTA) => dispatch(updateTipBar(text, step, tipCTA))
	}
}


/**
 * Dumb component
 */

const ManifestoDumb = props => (
	<Body wide={ true }>
		<div className="manifesto--wrapper">
			<h1>Our Manifesto</h1>
			<ol>
				<li>
					<h2>1. Culture </h2>
					<p>
						I want to live in a world where we transcend the boundaries
						of language and frontiers. A world driven by the spirit of
						sharing and kindness. Where we can all positively influence
						each other's moods in the midst of our daily routine.
					</p>
				</li>
				<li>
					<h2>2. Mindset</h2>
					<p>
						There is one universal language that translates emotions
						to your soul and vivifies time, it's called Music- and in
						the heart of each artist's masterpiece is an uplifting energy
						calling to be disseminated, spreading joy and happiness -
						that's our mission
					</p>
				</li>
				<li>
					<h2>3. Values</h2>
					<p>
						The world we want to live in is fair for everyone, giving the
						voice back to humans, listeners, musicians, composers, curious
						minds, music hunters and dancers. We are all our own kind of
						Artist, and together, we can cultivate happiness - through music.
					</p>
				</li>
			</ol>
			<div className='appendix'>
				<h2>So what’s the Crowdradio?</h2>
				<p>
					It’s a radio that is entirely powered by its community. Artists share
					their music - The community votes - And everyone can help make it better!
				</p>
			</div>
			<div className='signature'>
				<p>
					MASAS - "Make A Sound And Share"
				</p>
				<p>
					<a href="https://github.com/MASASFM/MASAS" target="_blank">#OpenSource</a>
				</p>
			</div>
		</div>
	</Body>
)


/**
 * Smart component
 */

const smartPropTypes = {
	...reduxStatePropTypes,
	...reduxDispatchPropTypes,
}

const smartDefaultProps = {
}

class ManifestoSmart extends React.Component {
    constructor(props) {
        super(props)
    }

	componentWillUnmount() {
		// hide crowdradio tip
		this.props.updateTipBar('')
	}

	componentDidMount() {
		// show crowdradio tip
		this.props.updateTipBar('A New Concept of Radio', 11, <Link to="/discover">Participate</Link>)
	}

	render() {
		return <ManifestoDumb />
	}
}

ManifestoSmart.propTypes = smartPropTypes
ManifestoSmart.defaultProps = smartDefaultProps

const Manifesto = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManifestoSmart)

export {
	Manifesto,
}

