'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const selfLib = require('selfLib');
const style = require('./style.less');

const Todo = () => {
    return (
        <div className={ `${ style.title }` }>kkkppp</div>
    );
};

selfLib.fn();

ReactDOM.render(
    <Todo></Todo>,
    document.getElementById('title')
);