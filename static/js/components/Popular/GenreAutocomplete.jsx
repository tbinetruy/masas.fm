import * as React from 'react'
import { connect }from 'react-redux'

const Autocomplete = require('react-autocomplete')


/**
 * Redux container
 */

const mapStateToProps = function(state) {
	return {
	}
}

const mapDispatchToProps = function(dispatch) {
	return {
	}
}


/**
 * Smart component
 */
class GenreAutocompleteSmart extends React.Component {
    constructor(props) {
        super(props)

		this.state = {
			value: '',
			loading: false,
			genres: [],
		}

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

		this.setState({ genres: this.state.genres.concat(results) })

		if(nextUrl)
			this.getAllGenres(nextUrl)
	}

	onChange(value) {
		this.setState({ value })
	}

	render() {
		return (
			<Autocomplete
				ref="autocomplete"
				value={ this.state.value }
				items={ this.state.genres.filter(e => e.name.includes(this.state.value)).slice(0, 4) }
				getItemValue={ item => item.name }
				renderMenu={ items => {
					return <div className="menu-style">{ items }</div>
				}}
				inputProps={{
					className: 'MASAS-text-input',
					id: 'city',
					name: 'cities'
				}}
				wrapperProps={{
					className: 'MASAS-textbox--wrapper wrapper-style'
				}}
				onSelect={ (value, item) => {
					this.setState({ value: item.name, genres: [ item ]})
					this.props.onChange(item.name)
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
	onChange: React.PropTypes.func,
}

const GenreAutocomplete = connect(
    mapStateToProps,
    mapDispatchToProps
)(GenreAutocompleteSmart)

export {
	GenreAutocomplete,
}


