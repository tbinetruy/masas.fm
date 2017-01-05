var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/Popular.jsx")


var {goToURL} = require("../../MASAS_functions.jsx")
var { BlurBackground } = require("../MASAS_mixins.jsx")
var { Button, Body, MasasSpinner } = require("../UI/UI.jsx")

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
		// store masas spinner progress in this so we can clear it on unmount
		var counter = 0
		this.timer = window.setInterval( () => {
			counter = counter + 0.01
			if(counter > 1)
				window.clearInterval(this.timer)

			this.setState({ spinnerProgress: counter})	
		}, 50)
	},
	
	componentWillUnmount: function() {
		window.clearInterval(this.timer)
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
