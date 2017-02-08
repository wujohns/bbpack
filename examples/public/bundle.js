(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var selfLib = require('selfLib');
var style = require('./style.less');

var Todo = function Todo() {
    return React.createElement('div', { className: '' + style.title }, 'kkkppp');
};

console.log('lollxlllpppp');
selfLib.fn();

ReactDOM.render(React.createElement(Todo, null), document.getElementById('title'));

},{"./style.less":2,"react":"react","react-dom":"react-dom","selfLib":"selfLib"}],2:[function(require,module,exports){
module.exports = {"title":"_title_1ynku_1"};
                            (function() {
                                var head = document.getElementsByTagName('head')[0];
                                var link = document.createElement('link');
                                link.rel = 'stylesheet';
                                link.type = 'text/css';
                                link.href = 'data:text/css;base64,Ll90aXRsZV8xeW5rdV8xIHsKICBoZWlnaHQ6IDEwMHB4OwogIHdpZGh0OiAyMDBweDsKICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7Cn0KLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklrVTZMMmRwZEdoMVlpOWlZbkJoWTJzdlpYaGhiWEJzWlhNdmMzSmpMM04wZVd4bExteGxjM01pTENJOGFXNXdkWFFnWTNOeklEUStJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSkJRVUZCTzBWQlEwa3NZMEZCUVR0RlFVTkJMR0ZCUVVFN1JVRkRRU3h6UWtGQlFUdERRME5JSWl3aVptbHNaU0k2SW5SdkxtTnpjeUo5ICov'
                                head.appendChild(link);
                            }())
                        
},{}]},{},[1])

//# sourceMappingURL=bundle.js.map
