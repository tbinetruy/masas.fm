// STATEFUL COMPONENT => CHANGE !!!! (integrate w/ redux states)

var React = require("react")
var ReactDOM = require("react-dom")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/Profile.jsx")

var Sidebar = require("react-sidebar")
var ProfileWrapper = require("./ProfileWrapper.jsx")
var NavSidebar = require("../NavSidebar/NavSidebar.jsx")
var Header = require("../Header/Header.jsx")
var Footer = require("../Footer/Footer.jsx")
var TrackItem = require("../Profile/TrackItem.jsx")
var ProfileEditLinks = require("./ProfileEditLinks.jsx")
var ProfileEdit = require("./ProfileEdit.jsx")

var { goToURL, getCookie, updateNotificationBar, updateProfileInfo } = require("../../MASAS_functions.jsx")
var { Button, Body, Textbox } = require("../UI/UI.jsx")


var Profile = React.createClass({
	propTypes: {
		isEditingProfile: React.PropTypes.bool,
		toggleEditingProfile: React.PropTypes.func,
		textboxValues: React.PropTypes.object,
	},

	getInitialState: function() {
		return {
			userSCSongs: [],			// song info from SC using songs from user entry
		}
	},

	componentWillMount: function() {
		this.props.updateTitle('My Profile', '0')		// 0 = menu icon; 1 = arrow back

		this.getSCinfo()
	},

	getSCinfo: function() {
		if(typeof(this.props.userData.songs) !== "undefined") {
			var idString = this.props.userData.songs.map((song) => {return song.SC_ID}).join()

			SC.get('tracks', {limit: 200, ids: idString}).then( (response) => {
				this.setState({ userSCSongs: response })
			})
		}
	},

	componentDidUpdate: function(prevProps, prevState) {
		if(JSON.stringify(this.props.userData.songs) !== JSON.stringify(prevProps.userData.songs))
			this.getSCinfo()
	},

	displaySongs: function() {
		var songs = this.props.userData.songs

		if (!songs) 
			return (
				<div className="no-songs--wrapper">
					<div className="image--wrapper">
						<img src="/static/img/MASAS_logo_soundcloud.svg" className="SC-logo" alt="soundcloud sync" />
						<img src="/static/img/MASAS_icon_synch_separator.svg" className="sync-icon" alt="soundcloud sync" />
						<img src="/static/img/MASAS_logo-M.svg" className="MASAS-logo" alt="soundcloud sync" />
					</div>
					<div className="upload-button">
						<Button onClick={goToURL.bind(null, "/upload")}>Upload my first sound</Button>
					</div>
				</div>
				)
		else {
			var songs = this.props.userData.songs

			var compareFn = (a, b) => {
				var dateA = new Date(a.dateUploaded)
				var dateB = new Date(b.dateUploaded)

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

				// return nothing if song no longer exists on soundcloud
				if(SC_songInfo === undefined)
					return

				return <TrackItem key={song.SC_ID} track={ SC_songInfo } MASAS_songInfo={song}/>
			})

			return (
				<div className="track-table--wrapper">
					{songList}
				</div>
				)
		}
	},

	saveProfile: function() {
		const header = "Bearer " + this.props.userToken
		var csrftoken = getCookie("csrftoken")

		var textboxValues = { ...this.props.textboxValues }
		var links = textboxValues.link_set
		delete textboxValues.link_set
		textboxValues.city = textboxValues.city

		// UPDATE PROFILE PART I (everything but links)
		$.ajax({
			type: "PATCH",
			url: this.props.userData.url,
			headers: {
				"Authorization": header,
				"X-CSRFToken": csrftoken
			},
			contentType: "application/json",
			data: JSON.stringify(textboxValues), 
			success: (r) => {
				updateNotificationBar('Profile updated !')
				updateProfileInfo()
				this.props.toggleEditingProfile()
			},
			error: (e) => {
				updateNotificationBar("Error updating profile...")
				// this.props.toggleEditingProfile()
			}
		})

		// UPDATE PROFILE LINKS

		// link user entered doesn't exist, we create it
		this.props.textboxValues.link_set.map((textboxLink) => {
			var match = this.props.userData.link_set.filter((userLink) => {
				return textboxLink === userLink.link
			})

			// new link => POST
			if(match.length === 0 && textboxLink !== "") {
				$.ajax({
					type: "POST",
					headers: {
						"Authorization": header,
						"X-CSRFToken": csrftoken
					},
					url: "/api/links/",
					contentType: "application/json",
					data: JSON.stringify({
						link: textboxLink,
						user: this.props.userData.url
					}),
					success: (r) => {
						updateProfileInfo()
						console.log(r)
					},
					error: (e) => {
						console.log(e)
					}
				})
			}
		})

		// link user has in DB isn't in textboxes user has entered, we delete link in DB
		this.props.userData.link_set.map((userLink) => {
			var match = this.props.textboxValues.link_set.filter((textboxLink) => {
				return userLink.link === textboxLink
			})

			// new link => DELETE
			if(match.length === 0) {
				$.ajax({
					type: "DELETE",
					headers: {
						"Authorization": header,
						"X-CSRFToken": csrftoken
					},
					url: userLink.url,
					success: (r) => {
						updateProfileInfo()
						console.log(r)
					},
					error: (e) => {
						console.log(e)
					}
				})
			}
		})

	},

	cancelEdit: function() {
		this.props.toggleEditingProfile()	
	},

	render: function() {
		var testVar = (Object.keys(this.props.userData).length !== 0 && this.props.userData.constructor === Object )

		if(testVar) {
			return (
				<div style={{display: 'flex', flex: 1}}>
					<ProfileWrapper>
						<div className="main--wrapper">
							<div className="profile-info--wrapper">
								<div className="edit-profile-icon--wrapper">
									{ this.props.isEditingProfile ?
											<div><span onClick={ this.cancelEdit } style={{ paddingRight: "0.5rem" }}>cancel</span><span onClick={ this.saveProfile }>save</span></div>
										:
											<img onClick={ this.props.toggleEditingProfile } className="abcdefg" src="/static/img/edit_pencil.svg" alt="edit profile" />
									}
								</div>
								<img src={ this.props.userData.avatar_url + "?width=400" } alt="profile picture" className="profile-picture" />
								<div className="tab--wrapper">
									<div className="tab" style={{ borderBottom: '4px solid white'}}>
										info
									</div>
									<div className="tab">
										post
									</div>
								</div>
								<div className={ "text--wrapper " + (this.props.isEditingProfile ? "is-editing-profile" : "") }>
									<div className={ "user-info-desktop " + (this.props.isEditingProfile ? "hidden" : "") } >
										<span className="username">
											{
												this.props.userData.name ? 
													this.props.userData.name 
												:
													this.props.userData.username
											}
										</span>
										<div className="occupation--wrapper">
											<span className="location">
												{ 
													this.props.userData.city ?
														this.props.userData.city.display_name.replace( /,.*?,/, ',' )
													:
														""
												}
											</span>
											<span className="occupation">
												{ 
													this.props.userData.occupation ?
														this.props.userData.occupation
													:
														""
												}
											</span>
										</div>
									</div>
									<div className={ "social--wrapper " + (this.props.isEditingProfile ? "hidden" : "") }>
										<div className="social-links right">
											<img src="/static/img/MASAS_logo_soundcloud.svg" alt="soundcloud" />
											<img src="/static/img/MASAS_logo_world.svg" alt="personal page" />
										</div>
										<div className="occupation--wrapper">
											<div className="occupation">
												{ 
													this.props.userData.occupation ?
														this.props.userData.occupation
													:
														""
												}
											</div>
											<div className="location">
												<span className="city">
													{ 
														this.props.userData.city ?
															this.props.userData.city.display_name.substring(0, this.props.userData.city.display_name.indexOf(',')) + " "
														:
															""
													}
												</span>
												-
												<span className="country">
													{ 
														this.props.userData.city ?
															this.props.userData.city.display_name.substring(this.props.userData.city.display_name.lastIndexOf(',') + 1, this.props.userData.city.display_name.length)
														:
															""
													}
												</span>
											</div>
										</div>
										<div className="social-links left">
											<img src="/static/img/twitter.svg" alt="twitter" />
											<img src="/static/img/facebook.svg" alt="facebook" />
										</div>
									</div>
									<div className="edit-profile--wrapper" style={{ display: (this.props.isEditingProfile ? "flex" : "none") }}>
										{ this.props.isEditingProfile ? 
											<ProfileEdit />
											:
											""
										}
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
						</div>
						<div className="song-list--wrapper">
							<div className={ "edit-social-mobile--wrapper " + (!this.props.isEditingProfile ? "hidden" : "")}>
								<ProfileEditLinks />
							</div>
							<div>
							{ this.displaySongs() }
							</div>
						</div>

					</ProfileWrapper>
				</div>
			)
		} else {
			return (
				<div style={{display: 'flex', flex: 1}}>
					<ProfileWrapper/>
				</div>
			)
		}
	}
})

var styles = {
	container: {
		display: 'flex',
		flexDirection: 'column',
	}
}

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(Profile)