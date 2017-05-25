require('babel-polyfill')
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Autocomplete from 'react-autocomplete'

import {
	updateApiGenres,
	updateSelectedGenre,
	updateTextboxValue,
} from '../../reducers/actions/Popular.js'

/**
 * Redux container
 */

const reduxStatePropTypes = {
	genres: PropTypes.array,
	value: PropTypes.string,
}

const mapStateToProps = function(state) {
	return {
		genres: state.popularReducer.genre.apiGenres,
		value: state.popularReducer.genre.textboxValue,
	}
}

const reduxDispatchPropTypes = {
	updateGenres: PropTypes.func,
	updateSelectedGenre: PropTypes.func,
	updateValue: PropTypes.func,
}


const mapDispatchToProps = function(dispatch) {
	return {
		updateGenres: genres => dispatch(updateApiGenres(genres)),
		updateValue: value => dispatch(updateTextboxValue(value)),
		updateSelectedGenre: genre => dispatch(updateSelectedGenre(genre)),
	}
}


/**
 * Smart component
 */

const smartPropTypes = {
	...reduxStatePropTypes,
	...reduxDispatchPropTypes,
}

const smartDefaultProps = {
}

class GenreAutocompleteSmart extends React.Component {
    constructor(props) {
        super(props)

		this.genres = []

		this.getAllGenres = this.getAllGenres.bind(this)
		this.onChange = this.onChange.bind(this)
    }

	componentDidMount() {
		this.getAllGenres()
	}

	async getAllGenres(url = '/api/genres/') {
		const genres = await fetch(url)
		const genresJSON = await genres.json()
		const { results } = genresJSON
		const nextUrl = genresJSON.next

		this.props.updateGenres(this.props.genres.concat(results))

		if(nextUrl)
			this.getAllGenres(nextUrl)
	}

	onChange(value) {
		this.props.updateValue(value)
	}

	render() {
		return (
			<Autocomplete
				ref="autocomplete"
				value={ this.props.value }
				items={
					this.props.genres.filter(e =>
						e.name
						.toLowerCase()
						.includes(
							this.props.value.toLowerCase()
						)
					).slice(0, 4)
				}
				getItemValue={ item => item.name }
				renderMenu={ items => {
					return <div className="menu-style">{ items }</div>
				}}
				inputProps={{
					className: 'MASAS-text-input item',
					id: 'genre',
					name: 'cities'
				}}
				wrapperProps={{
					className: 'MASAS-textbox--wrapper wrapper-style genres-autocomplete--wrapper'
				}}
				wrapperStyle={{ display: 'flex', position: 'relative' }}
				onSelect={ (value, item) => {
					this.props.updateSelectedGenre(item.name)
					this.onChange(item.name)
				}}
				onChange={ (e, value) => this.onChange(value) }
				renderItem={ (item, isHighlighted) => (
					<div
						className={isHighlighted ? 'highlighted-item' : 'item'}
						key={item.pk}
						id={item.name}>
						{item.name}
					</div>
				)}
			/>
		)
	}
}

GenreAutocompleteSmart.propTypes = smartPropTypes
GenreAutocompleteSmart.defaultProps = smartDefaultProps

const GenreAutocomplete = connect(
    mapStateToProps,
    mapDispatchToProps
)(GenreAutocompleteSmart)

export {
	GenreAutocomplete,
}


