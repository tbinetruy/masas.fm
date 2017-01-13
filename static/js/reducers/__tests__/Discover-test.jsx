'use strict'

jest.unmock('../Discover.jsx')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import { discoverReducer as reducer, defaultState } from '../Discover.jsx'

describe('discover reducer', () => {

	it('should return the initial state', () => {
		expect(
			reducer(undefined, {})
		).toEqual(
			defaultState
		)
	})

	it('should change discoverNumber', () => {
		expect(
			reducer(defaultState, {
				type: 'CHANGE_DISCOVER_NUMBER',
				discoverNumber: 3
			})
		).toEqual({
			...defaultState,
			discoverNumber: 3
		})

		// boundary conditions
		expect(
			reducer(defaultState, {
				type: 'CHANGE_DISCOVER_NUMBER',
				discoverNumber: 0
			})
		).toEqual({
			...defaultState,
			discoverNumber: 1
		})

		expect(
			reducer(defaultState, {
				type: 'CHANGE_DISCOVER_NUMBER',
				discoverNumber: 7
			})
		).toEqual({
			...defaultState,
			discoverNumber: 1
		})
	})

	it('should add song to history 1', () => {
		// ADD SONG TO DEFAULT STATE

		const testVar1 = { url: 'a' }
		const MASAS_songInfo1 = { timeInterval: 'http://hey.com/api/status/timeInterval/2/', ...testVar1 }
		const SC_songInfo1 = { testVar1 }
		const artistInfo1 = { artist: 'artist1'}

		expect(
			reducer(defaultState, {
				type: 'ADD_SONG_TO_HISTORY',
				MASAS_songInfo: MASAS_songInfo1,
				SC_songInfo: SC_songInfo1,
				artistInfo: artistInfo1,
			})
		).toEqual({
			...defaultState,
			history: {
					...defaultState.history,
					all: [
						{
							MASAS_songInfo: MASAS_songInfo1,
							SC_songInfo: SC_songInfo1,
							artistInfo: artistInfo1,
						},
					]
				}
		})
	})

	it('should add song to history 2', () => {
		// ADD SONG TO ARBITRARY STATE
		const testVar1 = { url: 'a' }
		const MASAS_songInfo1 = { timeInterval: 'http://hey.com/api/status/timeInterval/2/', ...testVar1 }
		const SC_songInfo1 = { testVar1 }
		const artistInfo1 = { artist: 'artist1'}

		const testVar2 = { url: 'b' }
		const MASAS_songInfo2 = { timeInterval: 'http://hey.com/api/status/timeInterval/2/', ...testVar2 }
		const SC_songInfo2 = { testVar2 }
		const artistInfo2 = { artist: 'artist2'}

		const newState = {
			...defaultState,
			history: {
					...defaultState.history,
					all: [
						{
							MASAS_songInfo: MASAS_songInfo1,
							SC_songInfo: SC_songInfo1,
							artistInfo: artistInfo1,
						},
					]
				}
		}

		expect(
			reducer(newState, {
				type: 'ADD_SONG_TO_HISTORY',
				MASAS_songInfo: MASAS_songInfo2,
				SC_songInfo: SC_songInfo2,
				artistInfo: artistInfo2,
			})
		).toEqual({
			...defaultState,
			history: {
				...newState.history,
				all: [
					{
						MASAS_songInfo: MASAS_songInfo1,
						SC_songInfo: SC_songInfo1,
						artistInfo: artistInfo1,
					},
					{
						MASAS_songInfo: MASAS_songInfo2,
						SC_songInfo: SC_songInfo2,
						artistInfo: artistInfo2,
					},
				]
			}
		})
	})

	it('should add song to history 3', () => {
		// SONG DOESN'T ADD IF LATEST IN LIST
		const testVar3 = { url: 'c' }
		const MASAS_songInfo3 = { timeInterval: 'http://hey.com/api/status/timeInterval/2/', ...testVar3 }
		const SC_songInfo3 = { testVar3 }
		const artistInfo3 = { artist: 'artist3'}

		const newState3 = {
			...defaultState,
			history: {
					...defaultState.history,
					all: [
						{
							MASAS_songInfo: MASAS_songInfo3,
							SC_songInfo: SC_songInfo3,
							artistInfo: artistInfo3,
						},
					]
				}
		}

		expect(
			reducer(newState3, {
				type: 'ADD_SONG_TO_HISTORY',
				MASAS_songInfo: MASAS_songInfo3,
				SC_songInfo: SC_songInfo3,
				artistInfo: artistInfo3,
			})
		).toEqual({
			...newState3,
			history: {
				...newState3.history
			}
		})
	})


	it('has boundary conditions', () => {
		const testVar1 = { url: 'a' }
		const MASAS_songInfo1 = { timeInterval: 'http://hey.com/api/status/timeInterval/2/', ...testVar1 }
		const SC_songInfo1 = { testVar1 }
		const artistInfo1 = { artist: 'artist1'}

		const newState = {
			...defaultState,
			history: {
					...defaultState.history,
					all: [
						{
							MASAS_songInfo: MASAS_songInfo1,
							SC_songInfo: SC_songInfo1,
							artistInfo: artistInfo1,
						},
					]
				}
		}
	})

	it('should remove song from history', () => {
		const testVar1 = { test: 'a' }
		const MASAS_songInfo1 = { timeInterval: 'http://hey.com/api/status/timeInterval/2/', testVar1 }
		const SC_songInfo1 = { testVar1 }

		const testVar2 = { test: 'a' }
		const MASAS_songInfo2 = { timeInterval: 'http://hey.com/api/status/timeInterval/2/', testVar2 }
		const SC_songInfo2 = { testVar2 }

		const newState = {
			...defaultState,
			history: {
				...defaultState.history,
				all: [
					{
						MASAS_songInfo: MASAS_songInfo1,
						SC_songInfo: SC_songInfo1
					},
					{
						MASAS_songInfo: MASAS_songInfo2,
						SC_songInfo: SC_songInfo2
					},
					{
						MASAS_songInfo: MASAS_songInfo1,
						SC_songInfo: SC_songInfo1
					},
				]
			}
		}

		expect(
			reducer(newState, {
				type: 'POP_SONG_FROM_HISTORY',
			})
		).toEqual({
			...newState,
			history: {
					...newState.history,
					all: [
						{
							MASAS_songInfo: MASAS_songInfo1,
							SC_songInfo: SC_songInfo1
						},
						{
							MASAS_songInfo: MASAS_songInfo2,
							SC_songInfo: SC_songInfo2
						},
					]
				}
		})

	})

})