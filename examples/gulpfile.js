//TODO testing BBPack's libsPack and pagesPack function
'use strict';

const gulp = require('gulp');
const browserify = require('browserify');

const BBPack = require('../index');
const bbpack = new BBPack({
    uglify: true,
    sourceMap: true,
    watch: true
});

const stream = browserify({
    entries: ['./src.js'],
    debug: true
});

bbpack._browserifyTransform(stream, './bundle.js');
