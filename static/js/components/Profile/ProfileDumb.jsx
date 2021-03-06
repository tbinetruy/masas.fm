import { Marquee } from '../UI/UI.jsx'
import { ProfileEdit } from './ProfileEdit.jsx'
import { ProfileEditLinks } from './ProfileEditLinks.jsx'
import { ProfileTrackList } from './ProfileTrackList.jsx'
import { ProfileWrapper } from './ProfileWrapper.jsx'
import PropTypes from 'prop-types'
import React from 'react'


/**
 * Dumb component
 */

const dumbPropTypes = {
		isEditingProfile: PropTypes.bool,			// is user currently editing profile
		isPublicProfile: PropTypes.bool,			// is comp showing public profile or private profile
		saveProfile: PropTypes.func,				// function called when user saved profile
		toogleEditingProfile: PropTypes.func,		// hides/closes edit profile form
		userData: PropTypes.object,				// object containing user data to display
		userSCSongs: PropTypes.array,				// user SC related info for songs. Not used. Only passed down to track list dumb component
}

const dumbDefaultProps = {
}

class ProfileDumb extends React.Component {
    constructor(props) {
        super(props)

		this.checkLink = this.checkLink.bind(this)
		this.checkPersonalWebsite = this.checkPersonalWebsite.bind(this)
    }

	checkLink(url) {
		var link_set = this.props.userData.link_set

		var checkVar = link_set.filter(({ link }) => {
			return link.includes(url)
		})

		if(checkVar.length)
			return checkVar[0].link
		else
			return ''
	}

	checkPersonalWebsite() {
		var link_set = this.props.userData.link_set

		var checkVar = link_set.filter(({ link }) => {
			return !link.includes('facebook.com') && !link.includes('twitter.com') && !link.includes('soundcloud.com')
		})

		if(checkVar.length)
			return checkVar[0].link
		else
			return ''
	}

	render() {
		const {
			link_set,
			avatar_url,
			name,
			username,
			city,
			occupation,
			songs
		} = this.props.userData
		const { userData, isPublicProfile } = this.props


		// checking if profile doesn't have any info to display in which case we'll rearrange the view layout
		// hence this var
		var isProfileEmpty = false
		if(link_set.length === 0 && (city === null || city === '') && (occupation === null || occupation === ''))
			isProfileEmpty = true

		return (
			<div style={{display: 'flex', flex: 1}}>
				<ProfileWrapper>
					<div className="main--wrapper">
						<div className={ 'profile-info--wrapper ' + ( !songs.length ?  'no-songs' : '') }>
							{ isPublicProfile ?
								<div></div>
								:
								<div className="edit-profile-icon--wrapper">
									{ this.props.isEditingProfile ?
											<div><span onClick={ this.props.toogleEditingProfile } style={{ paddingRight: '0.5rem' }}>cancel</span><span onClick={ this.props.saveProfile }>save</span></div>
										:
											<img onClick={ this.props.toogleEditingProfile } className="abcdefg" src="/static/img/MASAS_edit_profile.svg" alt="edit profile" />
									}
								</div>
							}
							{ avatar_url ?
								<img src={ avatar_url + '?width=400' } alt="profile picture" className="profile-picture" />
								:
								<div className="profile-picture" ></div>
							}
							<div className={ 'text--wrapper ' + (this.props.isEditingProfile ? 'is-editing-profile' : '') }>
								<div className="text--wrapper2" style={{ display: 'flex', flexDirection: 'column' }}>
									<div className={ 'user-info-desktop ' + (this.props.isEditingProfile ? 'hidden' : '') } >
										<span className="username">
											{
												name ?
													<Marquee>{ name }</Marquee>
												:
													<Marquee>{ username }</Marquee>
											}
										</span>
										<div className="occupation--wrapper">
											<span className="location">
												{
													city ?
														<Marquee>{ city.display_name.replace( /,.*?,/, ',' ) }</Marquee>
													:
														''
												}
											</span>
											<span className="occupation">
												{
													occupation ?
														<Marquee>{ occupation }</Marquee>
													:
														''
												}
											</span>
										</div>
									</div>
									<div className={ 'social--wrapper ' + (this.props.isEditingProfile ? 'hidden' : '') } style={ isProfileEmpty ? { display: 'none' } : {} }>
										<div className="social-links">
											{
												this.checkLink('soundcloud.com') !== '' ?
													<a href={ this.checkLink('soundcloud.com') } className="site-logo" target="_blank">
														<img src="/static/img/MASAS_logo_soundcloud.svg" alt="soundcloud" />
													</a> : ''
											}
											{
												this.checkPersonalWebsite() !== '' ?
													<a href={ this.checkPersonalWebsite() } className="site-logo" target="_blank">
														<img src="/static/img/MASAS_logo_world.svg" alt="personal page" />
													</a> : ''
											}
											{
												this.checkLink('twitter.com') !== '' ?
													<a href={ this.checkLink('twitter.com') } className="site-logo" target="_blank">
														<img src="/static/img/twitter.svg" alt="twitter" />
													</a> : ''
											}
											{
												this.checkLink('facebook.com') !== '' ?
													<a href={ this.checkLink('facebook.com') } className="site-logo" target="_blank">
														<img src="/static/img/facebook.svg" alt="facebook" />
													</a> : ''
											}
										</div>
									</div>
								</div>
								<div className="edit-profile--wrapper" style={{ display: (this.props.isEditingProfile ? 'flex' : 'none') }}>
									{ this.props.isEditingProfile ?
										<ProfileEdit show={ !isPublicProfile } />
										:
										''
									}
								</div>
							</div>
						</div>
					</div>
					<div className="song-list--wrapper">
						<div className={ 'edit-social-mobile--wrapper ' + (!this.props.isEditingProfile ? 'hidden' : '')}>
							<ProfileEditLinks show={ !isPublicProfile } />
						</div>
						<ProfileTrackList
							songs={ songs }
							isPublicProfile={ isPublicProfile }
							userSCSongs={ this.props.userSCSongs }
							userData={ userData } />
					</div>

				</ProfileWrapper>
			</div>
		)
	}
}

ProfileDumb.propTypes = dumbPropTypes
ProfileDumb.defaultProps = dumbDefaultProps

export {
	ProfileDumb,
}
