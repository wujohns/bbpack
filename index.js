// TODO 对默认的案例进行测试，主要是lessModulesify与babelify的前后顺序问题
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
     * @param {Object}  config - pack config
     * @param {Array}   config.transforms - browserify's transforms and plugins list
     * @param {Boolean} config.sourceMap - using sourceMap or not
     * @param {Boolean} config.uglify - uglify code or not
     * @param {Boolean} config.watch - auto building when file changes or not
     * @constructor
     */
    constructor (config) {
        if (!config) {
            config = {};
        }
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

        this._transforms = _.get(config, 'transforms', defaultTransforms);
        this._sourceMap = _.get(config, 'sourceMap', false);
        this._uglify = _.get(config, 'uglify', false);
        this._watch = _.get(config, 'watch', false);
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

        return stream.pipe(gulp.dest('./'));
    }

    /**
     * multy streams' end events together
     * @param {String} taskName - stream's flag or custom name
     * @param {Array} streams - target streams
     * @param {Function} callback - callback function
     * @private
     */
    _streamsEndListening (taskName, streams, callback) {
        async.each(streams, (stream, callback) => {
            stream.on('end', () => {
                return callback();
            });
        }, () => {
            console.log(`${ taskName } finished`);
            return callback();
        });
    }

    /**
     * packing the libs which are used in most parts
     * @param {Object} config - pack config
     * @public
     */
    libsPack (config, callback) {
        const libs = _.get(config, 'libs', []);
        const savePath = _.get(config, 'savePath');

        const streams = [];
        let addListener = false;
        const bundle = (stream) => {
            let tmpStream = stream;
            libs.forEach((lib) => {
                tmpStream = tmpStream.require(lib.src, { expose: lib.expose });
            });
            tmpStream = this._browserifyTransform(tmpStream, savePath);
            if (!addListener) {
                streams.push(tmpStream);
                addListener = true;
            }
            // TODO add auto reload feature
        }

        let stream = browserify();
        if (this._watch) {
            stream = stream.plugin(watchify);
            stream.on('update', () => bundle(stream));
            stream.on('log', gutil.log);
        }
        bundle(stream);

        this._streamsEndListening('libsPack', streams, callback);
    }

    /**
     * packing the js files which are used for the pages
     * @param {Object} config - pack config
     * @public
     */
    pagesPack (config, callback) {
        const pages = _.get(config, 'pages', []);
        const externals = _.get(config, 'externals', []);

        const streams = [];
        pages.forEach((page) => {
            let addListener = false;
            const bundle = (stream) => {
                let tmpStream = stream.external(externals);
                tmpStream = this._browserifyTransform(tmpStream, page.path);
                if (!addListener) {
                    streams.push(tmpStream);
                    addListener = true;
                }
                // TODO add reload feature
            };

            globby(page.parts).then((entries) => {
                let stream = browserify({
                    entries: entries,
                    debug: true
                });
                if (this._watch) {
                    stream = stream.plugin(watchify);
                    stream.on('update', () => bundle(stream));
                    stream.on('log', gutil.log);
                }
                bundle(stream);
            });
        });
        this._streamsEndListening('pagesPack', streams, callback);
    }
}

module.exports = BBPack;