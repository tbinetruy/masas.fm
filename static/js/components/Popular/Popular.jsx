var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/Popular.jsx")


var { BlurBackground } = require("../MASAS_mixins.jsx")
var { Body } = require("../UI/UI.jsx")

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
			<Body noBackground={ true }>
				<ArtworkLine 
					playFromPopular={ true }/>
			</Body>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(Popular)
