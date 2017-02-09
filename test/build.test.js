'use strict';

const fs = require('fs');
const path = require('path');
const mocha = require('mocha');
const rimraf = require('rimraf');
const lessModulesify = require('less-modulesify');
const babelify = require('babelify');
const should = require('chai').should();
const BBPack = require('../index');
const bbpack = new BBPack({
    transforms: [
        {
            plugin: lessModulesify,
            config: {
                sourceMap: true,
                lessCompileOptions: {}
            }
        },
        {
            transform: babelify,
            config: {
                presets: ['es2015', 'react', 'stage-3']
            }
        }
    ],
    uglify: true,
    watch: false,
    sourceMap: true,
    afterPipes: []
});

describe('compile', function () {
    this.timeout(10000);
    it('libsPack', (done) => {
        bbpack.libsPack({
            libs: [
                { src: 'react', expose: 'react' },
                { src: 'react-dom', expose: 'react-dom' },
                { src: path.join(__dirname, './src/selfLib.js'), expose: 'selfLib' }
            ],
            savePath: path.join(__dirname, './dist/libs.js')
        }, (err) => {
            should.not.exist(err);
            return done();
        });
    });

    it('pagesPack', (done) => {
        bbpack.pagesPack({
            pages: [
                { path: path.join(__dirname, './dist/bundle.js'), parts: [path.join(__dirname, './src/src.js')] }
            ],
            externals: ['react', 'react-dom', 'selfLib']
        }, (err) => {
            should.not.exist(err);
            return done();
        });
    });

    after((done) => {
        rimraf(path.join(__dirname, './dist'), {}, (err) => {
            should.not.exist(err);
            return done();
        })
    })
});