var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/UploadSC.jsx")

var { Body } = require("../UI/UI.jsx")
var UploadSCItem = require("./UploadSCItem.jsx")
var PickTimeUpload = require("./PickTimeUpload.jsx")
var UploadSCHome = require("./UploadSCHome.jsx")
var UploadSCSongTable = require("./UploadSCSongTable.jsx")
var NoSCSongs = require("./NoSCSongs.jsx")


var UploadSC = React.createClass({
	propTypes: {
		isConnectedSoundcloud: React.PropTypes.bool,
		choosingTime: React.PropTypes.object,
		isModalOpened: React.PropTypes.bool,
		userData: React.PropTypes.object,
		userPk: React.PropTypes.string,
		masasUserTracks: React.PropTypes.array,
		modalType: React.PropTypes.number,
		SCusername: React.PropTypes.string,
		soundcloudUserTracks: React.PropTypes.array,
		MASASuser: React.PropTypes.string,

		updateTitle: React.PropTypes.func,
		updateModalType: React.PropTypes.func,
		updateModalContent: React.PropTypes.func,
		toogleModal: React.PropTypes.func,
		updateMasasUserTracks: React.PropTypes.func,
		updateSCusername: React.PropTypes.func,
		getUserSCTracks: React.PropTypes.func,
		getUserTracks: React.PropTypes.func,
		updateSoundcloudUserTracks: React.PropTypes.func,
		updateIsConnectedSC: React.PropTypes.func,
		blurBg: React.PropTypes.func,
		saturateBg: React.PropTypes.func,
		blurMobileBr: React.PropTypes.func,
	},

	componentWillMount: function() {
		this.props.updateTitle('Upload', '0')
		if(this.props.isConnectedSoundcloud)
			this.getUserTracks()

	},

	componentWillUnmount: function() {
		this.props.blurBg(false)
		this.props.blurMobileBr(false)
	},

	componentDidMount: function() {
		this.updateBackgroundFilter()
	},

	updateBackgroundFilter: function() {
		if(this.props.choosingTime)
			this.props.blurBg(false)
		else if(this.props.isConnectedSoundcloud) {
			this.props.blurBg(false)
			this.props.blurMobileBr(true)
		} else {
			this.props.blurBg(false)
			this.props.blurMobileBr(true)
		}
	},


	getUserSCTracks: function() {
		SC.get(document.MASAS.SC.tracks_uri, {limit: 100}).then( (response) => {  // async call to SC servers
		// SC.get("me/tracks", {limit: 100}).then( (response) => {  // for dev tests
			this.props.updateSoundcloudUserTracks(response)
		})
	},

	connectToSC: function() {
		SC.connect().then( () => {
			this.props.updateIsConnectedSC(true)
			SC.get('/me').then( (r) => {
				// store suername for mobile
				this.props.updateSCusername(r.username)

				// get user track (first from MASAS API (requires log in) and then from SC API)
				this.getUserTracks()
			}).catch( () => {
				this.props.updateSCusername(null)
			})
			this.getUserTracks()
		}).catch( (error) => alert('Error: ' + error.message) )
	},

	tracksTable: function() {
		if (this.props.soundcloudUserTracks)
			return this.props.soundcloudUserTracks.map((track) => {
				var synced = false
				if(this.props.masasUserTracks.filter(function(song) { return song.SC_ID === track.id }).length)
					synced = true

				return <UploadSCItem
						key={ track.id }
						track={ track }
						synced={ synced }
						streamable={ track.streamable }
						public={ track.sharing === "public" ? true : false } />
			})
	},

	logoutSC: function() {
		location.reload()
	},

	componentWillReceiveProps: function(nextProps) {
		if(this.props.choosingTime !== nextProps.choosingTime && nextProps.choosingTime === null)
			this.props.updateTitle('Upload', '0')

		// update masas user track prop to have the sync icon updatd in real time
		if(this.props.choosingTime !== nextProps.choosingTime)
			this.getUserTracks()

		this.updateBackgroundFilter()
	},

	getUserTracks: function() {
		var success =  (data) => {
			this.props.updateMasasUserTracks(data.songs)
			this.getUserSCTracks()
		}

		var error = () => {
		}

		this.props.getUserTracks(this.props.userPk, success, error)
	},

	render: function() {
		let content = <div></div>
		let title = ""
		let pageNumber = 1

		if(this.props.choosingTime) {
			content = (
					<PickTimeUpload
						logoutSC={ this.logoutSC }/>
			)
			title = "Now pick the right time for your sound"
			pageNumber = 3
		} else {
			if(this.props.isConnectedSoundcloud && this.props.userPk) {
				if(this.props.soundcloudUserTracks) {
					if(this.props.soundcloudUserTracks.length === 0) {
						return (
							<Body>
								<NoSCSongs
									logoutSC={ this.logoutSC } />
							</Body>
						)
					} else {
						content = <UploadSCSongTable />
						title = "Today let’s feature..."
						pageNumber = 2
					}
				}
			} else {
				content = <UploadSCHome
					getUserTracks={ this.getUserTracks }/>
				title = "Get Featured on our Crowd-Radio"
				pageNumber = 1
			}
		}

		return (
			<Body>
				<div className="outer-upload-sc--wrapper">
					<div className="header">
						<h2>{ title }</h2>
						<div className="nav-dots">
							<div className={ "dot" + (pageNumber === 1 ? " fill" : "") }></div>
							<div className={ "dot" + (pageNumber === 2 ? " fill" : "") }></div>
							<div className={ "dot" + (pageNumber === 3 ? " fill" : "") }></div>
						</div>
					</div>
					<div className="content">
						{ content }
					</div>
				</div>
			</Body>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(UploadSC)
