import * as React from "react"

import { Body } from "../UI/UI.jsx"

const styles = {
	ol: {
		listStyleType: 'decimal',
	},
}

class Manifesto extends React.Component {
	constructor(props) {
		super(props)
	}

	render = () => {
		return (
			<Body wide={ true }>
				<div className="manifesto--wrapper">
					<h1>Our Manifesto</h1>
					<ol>
						<li>
							<h2>1. Culture</h2>
							<p>
								I want to live in a world where we transcend the
								boundaries of language and frontiers. A world driven
								by the spirits of sharing and mindfulness. Where we
								can all positively influence each other's moods in
								the midst of our daily routine.
							</p>
						</li>
						<li>
							<h2>2. Mindset</h2>
							<p>
								I want to live in a world where we transcend the
								boundaries of language and frontiers. A world driven
								by the spirits of sharing and mindfulness. Where we
								can all positively influence each other's moods in
								the midst of our daily routine.
							</p>
						</li>
						<li>
							<h2>3. Values</h2>
							<p>
								The world we want to live in is fair for everyone,
								giving the voice back to humans, listeners, musicians,
								composers, curious minds, music hunters and dancers.
								We are all our own kind of Artist, and together,
								we can cultivate happiness - through music with MASAS.fm
							</p>
						</li>
					</ol>
				</div>
			</Body>
		)
	}
}

export {
	Manifesto,
}

