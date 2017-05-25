/**
 * Need to remove jquery dependency
 */

import Autocomplete from 'react-autocomplete'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'


/**
 * Redux container
 */

const reduxStatePropTypes = {
	userCity: PropTypes.object,
}

const mapStateToProps = function(state) {
	return {
		userCity: state.appReducer.userData.city
	}
}

const reduxDispatchPropTypes = {

}

const mapDispatchToProps = function(dispatch) {
	return {
	}
}


/**
 * Smart component
 */

const smartPropTypes = {
	...reduxStatePropTypes,
	...reduxDispatchPropTypes,

	onChange: PropTypes.func,
}

const smartDefaultProps = {
}

class CountryAutocompleteSmart extends React.Component {
    constructor(props) {
        super(props)

		this.counter = 0

		this.state = {
			value: '',
			cities: [],
			loading: false,
		}

		this.getCities = this.getCities.bind(this)
		this.onChange = this.onChange.bind(this)
    }

	componentDidMount() {
		this.getCities()

		if(this.props.userCity !== null)
			this.setState({ value: this.props.userCity.display_name})
	}

	getCities() {
		$.ajax({
			type: 'GET',
			url: '/api/cities/?q=' + this.state.value,
			success: ({ results }) => {
				this.setState({
					cities: results.splice(0,15)
				})
			},
			error: () => {
			}
		})
	}

	onChange(event, value) {
		this.counter = this.counter + 1
		var { counter } = this

		this.setState({ value })

		window.setTimeout(() => {
			if(counter === this.counter) {
				this.setState({ loading: true })
				this.getCities()
				this.props.onChange('')
			}
		}, 500)
	}

	render() {
		return (
			<div className="MASAS-textbox country-autocomplete--wrapper" style={{ position: 'relative' }}>
				<label htmlFor="cities-autocomplete" className="MASAS-label">City</label>
				<Autocomplete
					ref="autocomplete"
					value={ this.state.value }
					items={ this.state.cities }
					getItemValue={ (item) => item.name_ascii }
					renderMenu={ (items) => {
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
						this.setState({ value: item.display_name, cities: [ item ]})
						this.props.onChange(item.url)
					}}
					onChange={ this.onChange }
					renderItem={ (item, isHighlighted) => (
						<div
							className={isHighlighted ? 'highlighted-item' : 'item'}
							key={item.geoname_id}
							id={item.geoname_id}>
							{item.display_name}
						</div>
					)}
				/>
			</div>
		)
	}
}

CountryAutocompleteSmart.propTypes = smartPropTypes
CountryAutocompleteSmart.defaultProps = smartDefaultProps

const CountryAutocomplete = connect(
    mapStateToProps,
    mapDispatchToProps
)(CountryAutocompleteSmart)

export {
	CountryAutocomplete,
}

