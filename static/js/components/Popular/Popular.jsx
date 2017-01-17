var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/Popular.jsx")


var { BlurBackground } = require("../MASAS_mixins.jsx")

var ArtworkLine = require("../Discover/ArtworkLine.jsx")
var PopularTimer = require("./PopularTimer.jsx")


var Popular = React.createClass({
	mixins: [ BlurBackground ],

	propTypes: {
		userPk: React.PropTypes.string,

		updateTitle: React.PropTypes.func,
	},

	getInitialState: function() {
		return {
			spinnerProgress: 0,
		};
	},

	componentWillMount: function() {
		this.props.updateTitle('Crowdradio', '0')
	},

	componentDidMount: function() {
	},

	componentWillUnmount: function() {
	},

	getContent: function() {
		const userPk = parseInt(this.props.userPk)
		const allowedUserPk = [4,5,6,10]

		let content = <div>Coming Soon</div>
		if(allowedUserPk.includes(userPk))
			content = (
				<div className="popular-content--wrapper">
					<ArtworkLine
						playFromPopular={ true }/>
				</div>
			)

		return content
	},

	render: function() {

		return (
			<div className="popular--wrapper">
				<div className="title-top">
					<div className="hide-desktop">
						<PopularTimer />
					</div>
					<h1 className="hide-mobile">Crowdradio</h1>
				</div>
				{
					this.getContent()
				}
				<div className="popular-timer hide-mobile title-bottom">
					<PopularTimer />
				</div>
			</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(Popular)
