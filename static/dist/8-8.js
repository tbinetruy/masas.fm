webpackJsonp([8],{606:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n.d(t,"TwitterCallback",function(){return c});var o=n(63),s=(n.n(o),n(1)),i=n.n(s),r=n(14),c=o({redirect:function(){this.processToken(),window.close()},componentDidMount:function(){this.redirect()},processToken:function(){var e=n.i(r.g)(),t=e.oauth_token,o=e.oauth_token_secret,s="oauth_token_secret="+o+"&oauth_token="+t;opener.document.twitterLogin(s)},render:function(){return i.a.createElement("b",{style:{textAlign:"center"}},"This popup should automatically close in a few seconds")}});!function(){"undefined"!=typeof __REACT_HOT_LOADER__&&__REACT_HOT_LOADER__.register(c,"TwitterCallback","/Users/thomasbinetruy/Documents/websites/masas/static/js/TwitterCallback.jsx")}()}});