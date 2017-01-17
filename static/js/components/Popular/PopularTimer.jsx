var React = require("react")

var PopularTimer = React.createClass({
	getInitialState: function() {
		return {
			time: new Date(),
		}
	},

	render: function() {
		// event loop hack
		// update state.time evey 10 sec
		window.setTimeout(() => this.setState({ time: new Date() }), 10*1000)

		return (
			<div className="popular-timer--wrapper">
				<h2 className="hashtag">#EarlyFoo</h2>
				<h3 className="time">
					{
						this.state.time.getHours()
						+ ":"
						+ this.state.time.getMinutes()
					}
				</h3>
			</div>
		)
	}
})

module.exports = PopularTimer