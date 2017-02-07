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
    constructor (config) {
        // default support es6\7 and react and css-module in less
        const defaultTransforms = [
            {
                transform: babelify,
                config: {
                    presets: ['es2015', 'react', 'stage-3']
                }
            },
            {
                plugin: lessModulesify,
                config: {
                    sourceMap: config.sourceMap,
                    lessCompileOption: {}
                }
            }
        ];

        this._transforms = config.transforms ? config.transforms : defaultTransforms;
        this._sourceMap = config.sourceMap;
        this._uglify = config.uglify;
    }

    /**
     * browserify's transform
     * @param {Object} stream - browserify stream
     * @param {Object} savePath - target file's path(includes the filename)
     * @return {Object} - gulp stream after transform
     * @private
     */
    _browserifyTransform (stream, savePath) {
        _.forEach(this._transforms, (transform) => {
            if (transform.transform) {
                stream = stream.transform(transform.transform, transform.config);
            } else if (transform.plugin) {
                stream = stream.plugin(transform.plugin, transform.config);
            }
        });

        stream = stream
            .bundle()
            .pipe(source(savePath))
            .pipe(buffer());

        if (this._sourceMap) stream = stream.pipe(sourcemaps.init({ loadMaps: true }));
        if (this._uglify) stream = stream.pipe(uglify());
        if (this._sourceMap) stream = stream.pipe(sourcemaps.write('./'));

        return stream;
    }

    /**
     * packing the libs which are used in most parts
     * @param {Object} config - pack config
     * @public
     */
    libsPack (config) {

    }

    /**
     * packing the js files which are used for the pages
     * @param {Object} config - pack config
     * @public
     */
    pagesPack (config) {

    }
}

module.exports = BBPack;