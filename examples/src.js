'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const style = require('./style.less');

const Todo = () => {
    return (
        <div className={ `${ style.title }` }>kkkppp</div>
    );
};

console.log('lol');

ReactDOM.render(
    <Todo></Todo>,
    document.getElementById('title')
);