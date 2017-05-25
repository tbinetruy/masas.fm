import React from 'react'
import PropTypes from 'prop-types'

import { goToURL } from '../../MASAS_functions.jsx'
import { Button } from '../UI/UI.jsx'
import { TrackItem } from '../Profile/TrackItem.jsx'


/**
 * Dumb component
 */
const dumbPropTypes = {
	isMiniProfile: PropTypes.bool,			// is tracklist in miniprofile mode
	isPublicProfile: PropTypes.bool,			// is profile shown public or private
	songs: PropTypes.array,				// songs to show
	userData: PropTypes.object,			// object containing user data
}

const dumbDefaultProps = {
	isPublicProfile: false,
	isMiniProfile: false,
}

const ProfileTrackList = props => {
	var { songs } = props

	if (!songs.length)
		return (
			!props.isPublicProfile ?
				<div className="no-songs--wrapper">
					<div className="upload-button">
						<p className="bold">
							Congratulation { props.userData.name ? props.userData.name : props.userData.username }, you're now part of the familly
						</p>
						<p>
							This is your profile, all your uploaded sound will be shown here.
						</p>
						<p>
							What would you like to do now?
						</p>
						<Button isSecondaryAction={ true } onClick={goToURL.bind(null, '/upload')}>Share My First Sound</Button>
						<Button onClick={goToURL.bind(null, '/discover')}>Discover music</Button>
					</div>
				</div>
				:
				<div className="no-songs--wrapper">
					<div className="upload-button">
						<Button onClick={ () => {} } isSecondaryAction={ true } isDisabled={ true }>This user has no sounds</Button>
					</div>
				</div>
			)
	else {
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
			var SC_songInfo = props.userSCSongs.filter((el) => {
				return el.id === song.SC_ID
			})[0]

			// return nothing if song no longer exists on soundcloud
			if(SC_songInfo === undefined)
				return

			return <TrackItem
					key={song.SC_ID}
					track={ SC_songInfo }
					MASAS_songInfo={song}
					allowOpen={ !props.isPublicProfile }
					isMiniProfile={ props.isMiniProfile ? true : false } />
		})

		return (
			<div>
				<div className={ 'track-table--wrapper' + (props.isMiniProfile ? ' mini-profile' : ' aa') }>
					{ songList }
				</div>
			</div>
		)
	}
}

ProfileTrackList.propTypes = dumbPropTypes
ProfileTrackList.defaultProps = dumbDefaultProps

export {
	ProfileTrackList,
}