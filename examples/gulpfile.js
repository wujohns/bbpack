//TODO need rewrite
'use strict';

const gulp = require('gulp');
const browserify = require('browserify');

const BBPack = require('../index');
const bbpack = new BBPack({
    sourceMap: true
});

const stream = browserify({
    entries: ['./src.js'],
    debug: true
});

bbpack
    ._browserifyTransform(stream, './bundle.js')
    .pipe(gulp.dest('./'));
