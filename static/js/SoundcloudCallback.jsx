import * as createClass from 'create-react-class'
import React from 'react'

const SoundcloudCallback = createClass({

	redirect: function() {
	},

	componentDidMount: function() {
		window.setTimeout(opener.SC.connectCallback.call(window), 1);
	},

  render() {
    return (
		<body onLoad={ this.redirect() }>
			<b style={{ textAlign: 'center' }}>This popup should automatically close in a few seconds</b>
		</body>
    );
  }
});

export {
	SoundcloudCallback,
}