/**
 * module bundler with simple configure
 */
'use strict';

const packageConfig = {
    // 基础说明配置
    name: 'bbpack',
    version: '0.2.4',
    author: 'wujohns',
    description: 'module bundler with simple configure which based on browserify',
    homepage: 'https://github.com/wujohns/bbpack',
    license: 'MIT',

    /**
     * 代码库
     */
    repository: {
        type: 'git',
        url: 'https://github.com/wujohns/bbpack.git'
    },

    /**
     * 关键字
     */
    keywords: [
        'browserify', 'pack', 'module', 'bundler', 'cmd', 'bb'
    ],

    /**
     * bugs
     */
    bugs: {
        url: 'https://github.com/wujohns/bbpack/issues'
    },

    /**
     * scripts
     */
    scripts: {
        test: './node_modules/mocha/bin/mocha ./test/build.test.js'
    },

    engine: {
        node: '>=4.0.0'
    },

    dependencies: {
        'lodash': '^4.17.2',
        'async': '^2.1.4',
        'globby': '~6.0.0',

        'gulp': '~3.9.1',
        'gulp-util': '^3.0.7',          // gulp utils
        'gulp-sourcemaps': '~2.2.0',    // sourcemap for dev
        'gulp-uglify': '~2.0.0',        // uglify code

        'browserify': '~13.1.1',            // browserify
        'vinyl-source-stream': '~1.1.0',    // browserify's write stream
        'vinyl-buffer': '~1.0.0',           // transform browserify stream to gulp stream
        'watchify': '^3.7.0',               // watch files' change
        'less-modulesify': '^1.0.10',       // css module feature for less

        'babelify': '~7.3.0',               // babel for browserfiy
        'babel-preset-es2015': '~6.18.0',   // es6 support
        'babel-preset-react': '~6.16.0',    // react support
        'babel-preset-stage-3': '~6.17.0',  // es7 support(stage-3)
        'babel-plugin-syntax-export-extensions': '^6.13.0',  // 对export方面的扩展
    },

    devDependencies: {
        'mocha': '^3.2.0',
        'chai': '^3.5.0',
        'react': '^15.3.2',
        'react-dom': '^15.3.2',
        'rimraf': '^2.5.4'
    }
};

const fs = require('fs');
const ws = fs.createWriteStream('./package.json', {
    encoding: 'utf8',
    flags: 'w',
    mode: '666'
});
ws.end(JSON.stringify(packageConfig, null, 2));