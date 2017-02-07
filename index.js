// TODO If it's nessary, seperate some logic to lib folder
'use strict';

// base utils
const _ = require('lodash');
const async = require('async');
const globby = require('globby');

// gulp utils
const gulp = require('gulp');
const gutil = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

// browserify utils
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const babelify = require('babelify');
const watchify = require('watchify');
const lessModulesify = require('less-modulesify');

class BBPack {
    /**
     * normal js operation(uglify and sourcemap)
     * @param {Object} stream - gulp stream
     * @param {Object} config - config
     * @return {Object} - the gulp stream after transform
     * @private
     */
    static _commonTransform (stream, config) {
        if (_.get(config, 'sourcemap')) stream = stream.pipe(sourcemaps.init({ loadMaps: true }));
        if (_.get(config, 'uglify')) stream = stream.pipe(uglify());
        if (_.get(config, 'sourcemap')) stream = stream.pipe(sourcemaps.write('./'));
        return stream;
    }

    /**
     * //TODO to support custom browserify's transform and plugin config
     * browserify's transform
     * @param {Object} stream - browserify stream
     * @param {Object} savePath - target file's path(includes the filename)
     * @return {Object} - gulp stream after transform
     * @private
     */
    static _browserifyTransform (stream, savePath) {
        return stream
            .transform(babelify, {
                presets: [
                    'es2015',   // 对 es6 代码的转换
                    'react',    // 对 jsx 的转换
                    'stage-3'   // 对 es7 代码的转换（启用ES7 async支持）
                ],
                plugins: [
                    'transform-object-assign'   // 转换 es6 Object.assign插件
                ]
            })
            .plugin(lessModulesify, {
                lessCompileOption: {}
            })
            .bundle()
            .pipe(source(savePath))
            .pipe(buffer());
    }

    /**
     * packing the libs which are used in most parts
     * @param {Object} config - pack config
     */
    static libPack (config) {

    }

    /**
     * packing the js files which are used for the pages
     * @param {Object} config - pack config
     */
    static pagePack (config) {

    }
}