//TODO testing BBPack's libsPack and pagesPack function
'use strict';

const gulp = require('gulp');
const browserify = require('browserify');

const BBPack = require('../index');
const bbpack = new BBPack({
    // uglify: true,
    sourceMap: true,
    watch: true
});
const libsConfig = {
    libs: [
        { src: 'react', expose: 'react' },
        { src: 'react-dom', expose: 'react-dom' },
        { src: './src/selfLib.js', expose: 'selfLib' }
    ],
    savePath: './public/libs.js'
};
const pagesConfig = {
    pages: [
        { path: './public/bundle.js', parts: ['./src/src.js'] }
    ],
    externals: ['react', 'react-dom', 'selfLib']
};

gulp.task('libsPack', (callback) => {
    bbpack.libsPack(libsConfig, callback);
});

gulp.task('pagesPack', (callback) => {
    bbpack.pagesPack(pagesConfig, callback);
});

gulp.task('build', ['libsPack', 'pagesPack']);

gulp.task('watch', () => {
    gulp.watch(['./src/src.js', './src/selfLib.js'], () => {
        console.log('changing--------');
    })
});