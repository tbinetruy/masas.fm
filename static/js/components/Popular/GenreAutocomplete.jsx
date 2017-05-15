import * as React from 'react'
import { connect }from 'react-redux'

const Autocomplete = require('react-autocomplete')

import {
	updateApiGenres,
	updateSelectedGenre,
	updateTextboxValue,
} from '../../reducers/actions/Popular.js'

/**
 * Redux container
 */

const mapStateToProps = function(state) {
	return {
		genres: state.popularReducer.genre.apiGenres,
		selectedGenre: state.popularReducer.genre.selectedGenre,
		value: state.popularReducer.genre.textboxValue,
	}
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

GenreAutocompleteSmart.propTypes = {
	genres: React.PropTypes.array,
	selectedGenre: React.PropTypes.string,
	updateGenres: React.PropTypes.func,
	updateSelectedGenre: React.PropTypes.func,
	updateValue: React.PropTypes.func,
	value: React.PropTypes.string,
}

const GenreAutocomplete = connect(
    mapStateToProps,
    mapDispatchToProps
)(GenreAutocompleteSmart)

export {
	GenreAutocomplete,
}


