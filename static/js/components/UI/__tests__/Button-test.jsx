'use strict'

jest.unmock('../Button.jsx')

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Button from '../Button.jsx';

const emptyCallback= () => {}

describe('Button', () => {
	it('has correct text', () => {
		// Render a button with capitals
		const button = TestUtils.renderIntoDocument(
			<Button
				onClick={ emptyCallback }>hello</Button>
		)

		const buttonNode = ReactDOM.findDOMNode(button)

		// Verify that the text is correct
		expect(buttonNode.children[0].textContent).toEqual('hello')
	})

	it('is a secondary button', () => {
		// Render a white button
		const button = TestUtils.renderIntoDocument(
			<Button
				onClick={ emptyCallback }
				isSecondaryAction={true}>hello</Button>
		)

		const buttonNode = ReactDOM.findDOMNode(button)

		// Verify that the button is white
		expect(buttonNode.className).toEqual('MASAS-button secondary-button MASAS-big-button ')	// trailling space necessary
	})

	it('is a primary button', () => {
		// Render a not white buton
		const button = TestUtils.renderIntoDocument(
			<Button
				onClick={ emptyCallback }
				isSecondaryAction={false}>hello</Button>
		)

		const buttonNode = ReactDOM.findDOMNode(button)

		// Verify that the button is not white
		expect(buttonNode.className).toEqual('MASAS-button MASAS-big-button ')
	})
})