var React = require("react")

var {
	getDiscoverNumberFromCurrentTime,
	discoverHashtagNames,
  } = require("../../MASAS_functions.jsx")

var PopularTimer = React.createClass({
	getInitialState: function() {
		return {
			time: new Date(),
		}
	},

	getHashtag: function() {
		const hastagNames = discoverHashtagNames()
		const discoverNumer = getDiscoverNumberFromCurrentTime()

		return hastagNames[discoverNumer - 1]
	},

	formatNumber: function(number) {
		if(number < 10)
			return "0" + number

		return number
	},

	render: function() {
		// event loop hack
		// update state.time evey 10 sec
		window.setTimeout(() => this.setState({ time: new Date() }), 10*1000)

		return (
			<div className="popular-timer--wrapper">
				<h2 className="hashtag">
					{ this.getHashtag() }
				</h2>
				<h3 className="time">
					{
						this.formatNumber(this.state.time.getHours())
						+ ":"
						+ this.formatNumber(this.state.time.getMinutes())
					}
				</h3>
			</div>
		)
	}
})

module.exports = PopularTimer