import React from 'react'

class Discover extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			comp: null,
		}
	}

	async componentDidMount() {
		const { Discover } = await import('./components/Discover/Discover.jsx')
		this.setState({
			comp: <Discover />
		})
	}

	render() {
		return <div style={{display: 'flex', flex: 1}}>{ this.state.comp }</div>
	}
}

class InvitationPending extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			comp: null,
		}
	}

	async componentDidMount() {
		const { InvitationPending } = await import('./components/Login/InvitationPending.jsx')
		this.setState({
			comp: <InvitationPending />
		})
	}

	render() {
		return <div style={{display: 'flex', flex: 1}}>{ this.state.comp }</div>
	}
}

class Legals extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			comp: null,
		}
	}

	async componentDidMount() {
		const { LegalsHome } = await import('./components/Legals/LegalsHome.jsx')
		this.setState({
			comp: <LegalsHome />
		})
	}

	render() {
		return <div style={{display: 'flex', flex: 1}}>{ this.state.comp }</div>
	}
}

class Likes extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			comp: null,
		}
	}

	async componentDidMount() {
		const { Likes } = await import('./components/Likes/Likes.jsx')
		this.setState({
			comp: <Likes />
		})
	}

	render() {
		return <div style={{display: 'flex', flex: 1}}>{ this.state.comp }</div>
	}
}

class Login extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			comp: null,
		}
	}

	async componentDidMount() {
		const { LoginForm } = await import('./components/Login/LoginForm.jsx')
		this.setState({
			comp: <LoginForm />
		})
	}

	render() {
		return <div style={{display: 'flex', flex: 1}}>{ this.state.comp }</div>
	}
}

class Manifesto extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			comp: null,
		}
	}

	async componentDidMount() {
		const { Manifesto } = await import('./components/Manifesto/Manifesto.jsx')
		this.setState({
			comp: <Manifesto />
		})
	}

	render() {
		return <div style={{display: 'flex', flex: 1}}>{ this.state.comp }</div>
	}
}

class Popular extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			comp: null,
		}
	}

	async componentDidMount() {
		const { Popular } = await import('./components/Popular/Popular.jsx')
		this.setState({
			comp: <Popular />
		})
	}

	render() {
		return <div style={{display: 'flex', flex: 1}}>{ this.state.comp }</div>
	}
}

class Profile extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			comp: null,
		}
	}

	async componentDidMount() {
		const { Profile } = await import('./components/Profile/Profile.jsx')
		this.setState({
			comp: <Profile />
		})
	}

	render() {
		return <div style={{display: 'flex', flex: 1}}>{ this.state.comp }</div>
	}
}

class SignUp extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			comp: null,
		}
	}

	async componentDidMount() {
		const { SignUp } = await import('./components/Login/SignUp.jsx')
		this.setState({
			comp: <SignUp />
		})
	}

	render() {
		return <div style={{display: 'flex', flex: 1}}>{ this.state.comp }</div>
	}
}

class SoundcloudCallback extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			comp: null,
		}
	}

	async componentDidMount() {
		const { SoundcloudCallback } = await import('./SoundcloudCallback.jsx')
		this.setState({
			comp: <SignUp />
		})
	}

	render() {
		return <div style={{display: 'flex', flex: 1}}>{ this.state.comp }</div>
	}
}

class TwitterCallback extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			comp: null,
		}
	}

	async componentDidMount() {
		const { TwitterCallback } = await import('./TwitterCallback.jsx')
		this.setState({
			comp: <TwitterCalback />
		})
	}

	render() {
		return <div style={{display: 'flex', flex: 1}}>{ this.state.comp }</div>
	}
}

class UploadSC extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			comp: null,
		}
	}

	async componentDidMount() {
		const { UploadSC } = await import('./components/UploadSC/UploadSC.jsx')
		this.setState({
			comp: <UploadSC />
		})
	}

	render() {
		return <div style={{display: 'flex', flex: 1}}>{ this.state.comp }</div>
	}
}

export {
	Discover,
	InvitationPending,
	Legals,
	Likes,
	Login,
	Manifesto,
	Popular,
	Profile,
	SignUp,
	SoundcloudCallback,
	TwitterCallback,
	UploadSC,
}