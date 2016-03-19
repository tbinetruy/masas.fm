var React = require("react")
var ReactDOM = require("react-dom")

var ProfileWrapper = require("../../containers/Profile/ProfileWrapper.jsx")
var Sidebar = require("react-sidebar")
var NavSidebar = require("../../containers/NavSidebar/NavSidebar.jsx")
var Header = require("../../containers/Header/Header.jsx")
var Footer = require("../../containers/Footer/Footer.jsx")
var TrackItem = require("../../containers/Profile/TrackItem.jsx")

var {goToURL} = require("../../../MASAS_functions.jsx")
// var {getCookie} = require("../../../MASAS_functions.jsx")
var { Button } = require("../../containers/UI/UI.jsx")

// var Template = (props) => {

// }

var Profile = React.createClass({
	propTypes: {
	},

	getInitialState: function() {
		return {
			userInfo: null,				// user entry in REST API
			userSCSongs: [],			// song info from SC using songs from user entry
		};
	},

	componentWillMount: function() {
		this.props.updateTitle('My Profile', '0')		// 0 = menu icon; 1 = arrow back

		$.ajax({
			type: "GET",
			url: 'api/users/' + this.props.userPk + '/',	

				 // -u"<client_id>:<client_secret>" 
			success: (data) => {
				console.log(data)
				var idString = data.songs.map((song) => {return song.SC_ID}).join()
				SC.get('tracks', {limit: 200, ids: idString}).then( (response) => {
					console.log(response)
					this.setState({userInfo: data, userSCSongs: response})
				})
			},
			error: (err) => {
				console.log(err)
			},
		})
	},

	getSongs: function() {
		var songs = this.state.userSCSongs

		if (!songs) 
			return (
				<div className="no-songs--wrapper">
					<div className="image--wrapper">
						<img src="/static/img/MASAS_logo_soundcloud.svg" className="SC-logo" alt="soundcloud sync" />
						<img src="/static/img/MASAS_icon_synch_separator.svg" className="sync-icon" alt="soundcloud sync" />
						<img src="/static/img/MASAS_logo-M.svg" className="MASAS-logo" alt="soundcloud sync" />
					</div>
					<div className="upload-button">
						<Button onClick={goToURL.bind(null, "/sc-sync")}>Upload my first sound</Button>
					</div>
				</div>
				)
		else {
			var songs = this.state.userInfo.songs

			var compareFn = (a, b) => {
				var dateA = a.dateUploaded
				var dateB = b.dateUploaded
				if (dateA > dateB) {
					return -1
				}
				if (dateB > dateA) {
					return 1
				}
					return 0
			}
			songs.sort(compareFn)

			var songList =  songs.map((song) => { 
				var SC_songInfo = this.state.userSCSongs.filter((el) => {
					return el.id === song.SC_ID
				})[0]

				return <TrackItem key={song.SC_ID} track={ SC_songInfo } MASAS_songInfo={song}/>
			})

			return (
				<div className="track-table--wrapper">
					{songList}
				</div>
				)
		}
	},

	render: function() {
		return (
			<div style={{display: 'flex', flex: 1}}>
			{ this.state.userInfo ?
				<ProfileWrapper>
					<div className="profile-info--wrapper">
						<div className="user-info-desktop">
							<span className="username">
								{this.state.userInfo.username}
							</span>
							<span className="location">
								Amsterdam - Holland
							</span>
							<span className="occupation">
								DJ & Music Producer
							</span>
						</div>
						<img src="/static/img/menupicture.jpg" alt="profile picture" className="profile-picture" />
						<div className="tab--wrapper">
							<div className="tab" style={{ borderBottom: '4px solid white'}}>
								info
							</div>
							<div className="tab">
								post
							</div>
						</div>
						<div className="social--wrapper">
							<div className="social-links right">
								<img src="/static/img/MASAS_logo_soundcloud.svg" alt="soundcloud" />
								<img src="/static/img/MASAS_logo_world.svg" alt="soundcloud" />
							</div>
							<div className="occupation--wrapper">
								<div className="occupation">
									DJ & Music Producer
								</div>
								<div className="location">
									<span className="city">
										Amsterdam
									</span>
									-
									<span className="country">
										Holland
									</span>
								</div>
							</div>
							<div className="social-links left">
								<img src="/static/img/twitter.svg" alt="soundcloud" />
								<img src="/static/img/facebook.svg" alt="soundcloud" />
							</div>
						</div>
					</div>
					<div className="social-stats--wrapper">
						<div className="section" style={{borderRight: '1px solid white'}}>
							<div className="section-title">
								<img src="/static/img/MASAS_followers.svg" alt="soundcloud" />
								Followers
							</div>
							<span className="number">1240</span>
						</div>
						<div className="section total-plays" style={{borderRight: '1px solid white'}}>
							<div className="section-title">
								<img src="/static/img/MASAS_logo_tunes.svg" alt="total plays" />
								Total plays
							</div>
							<span className="number">1240</span>
						</div>
						<div className="section">
							<div className="section-title">
								<img src="/static/img/MASAS_logo_tunes.svg" alt="soundcloud" />
								Following
							</div>
							<span className="number">1240</span>
						</div>
					</div>
					<div className="song-list--wrapper">
						<div>
						{ this.getSongs() }
						</div>
					</div>



				</ProfileWrapper>
			:
				<ProfileWrapper />
			}
			</div>
		)
	}
});

var styles = {
	container: {
		minHeight: '100vh',
		maxHeight: '100vh',
		display: 'flex',
		flexDirection: 'column',
	}
}

module.exports = Profile