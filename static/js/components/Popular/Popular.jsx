var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/Popular.jsx")


var { BlurBackground } = require("../MASAS_mixins.jsx")

var ArtworkLine = require("../Discover/ArtworkLine.jsx")


var Popular = React.createClass({
	mixins: [ BlurBackground ],

	propTypes: {
		updateTitle: React.PropTypes.func,
	},

	getInitialState: function() {
		return {
			spinnerProgress: 0,
		};
	},

	componentWillMount: function() {
		this.props.updateTitle('Popular', '0')
	},

	componentDidMount: function() {
	},

	componentWillUnmount: function() {
	},

	render: function() {
		return (
			<div className="popular--wrapper">
				<h1>Crowdradio</h1>
				<div className="popular-content--wrapper">
					<ArtworkLine
						playFromPopular={ true }/>
				</div>
			</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(Popular)
