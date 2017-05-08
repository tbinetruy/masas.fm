var React = require('react')

var ReactRedux = require('react-redux')
var { mapStateToProps, mapDispatchToProps } = require('./containers/Header.jsx')

var { getPathList } = require('../../MASAS_functions.jsx')
var HeaderDropdown = require('./HeaderDropdown.jsx')
var Link = require('../UI/Link.jsx')

var Header = React.createClass({
	propTypes: {
		pageType: React.PropTypes.number,
		pageTitle: React.PropTypes.string,
		user: React.PropTypes.string,
		isPlayerBarOpened: React.PropTypes.bool,
		backArrowFunc: React.PropTypes.func,
		notificationText: React.PropTypes.string,
		isAppFetching: React.PropTypes.bool,
		songPlaying: React.PropTypes.string,
		MASASuser: React.PropTypes.string,
		// isModalOpened: React.PropTypes.bool,
		// toogleModal: React.PropTypes.func,
		// updateModalContent: React.PropTypes.func,
		modalType: React.PropTypes.number,
		isModalOpened: React.PropTypes.bool,

		onSetNavSidebarOpen: React.PropTypes.func,
		toogleIsOpened: React.PropTypes.func,
		goToHomepageSlide1: React.PropTypes.func,
		closeModal: React.PropTypes.func,
	},

	render: function() {
		let formatForModal = false
		if(this.props.modalType === 5 && this.props.isModalOpened)
			formatForModal = true

		return (
			<nav  className={ 'header' + (formatForModal ? ' show-mobile' : '') }>
				<div className="ajax-loader--wrapper">
					<div className={ 'ajax-loader' + (this.props.isAppFetching ? ' visible' : '') }>
					</div>
				</div>
				<div className="notification--wrapper1">
					{
						this.props.notificationText !== '' ?
							<div className="notification--wrapper2">
								<div className="notification-text" id="notification-text">
									{ this.props.notificationText }
								</div>
							</div>
						:
							''
					}
				</div>
				<div className="top-decoration--top-border">
				</div>
				<div className="top-decoration">
				</div>
				<div className="row middle-xs desktop-header">
					<div className="col-xs-10 links--wrapper">
						<div className="box" style={{
							display: 'flex',
							flex: 2,
							flexDirection: 'row',
							justifyContent: 'space-between',
							position: 'relative',
							maxWidth: '37rem',
						}}>
							<Link to="/" className="logo" onClick={ () => { this.props.goToHomepageSlide1(); this.props.closeModal() } }>
								<img src="/static/img/navlogo.png" alt="MASAS" className="logo" />
							</Link>
							<div className="header-links--wrapper" style={{ display: 'flex' }}>
								<div className={ 'header-link first' + (getPathList.discover === window.location.pathname ? ' active' : '')}>
									<Link onClick={ this.props.closeModal } to="/discover" disabled={ false }>Discover</Link>
								</div>
								<div className={ 'header-link' + (getPathList.likes  === window.location.pathname ? ' active' : '') }>
									<Link onClick={ this.props.closeModal } to="/likes" disabled={false}>Likes</Link>
								</div>
								<div className={ 'header-link' + (getPathList.upload === window.location.pathname ? ' active' : '') }>
									<Link onClick={ this.props.closeModal } to="/upload" disabled={false}>Upload</Link>
								</div>
							</div>
						</div>
						<HeaderDropdown />
					</div>
				</div>
				<div className="row middle-xs phone-header">
					<div className="col-xs-3">
						<div className="box" style={ formatForModal ? { pointerEvents: 'none', opacity: 0 } : {} }>
							{ this.props.pageType === 0 ?
								<img onClick={ this.props.onSetNavSidebarOpen} src="/static/img/MASAS_hamburger_menu.svg" alt="menu" className="menu-icon" />
								:
								<img onClick={ () => { this.props.backArrowFunc(); this.props.closeModal() } } src="/static/img/MASAS_arrow_left.svg" alt="back" className="menu-icon" />
							}
						</div>
					</div>
					<div className="col-xs-6">
							<div className="box title">{ this.props.pageTitle }</div>
					</div>
					<div className="col-xs-3">
					</div>
				</div>
			</nav>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(Header)
