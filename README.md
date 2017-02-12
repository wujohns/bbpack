# bbpack
module bundler with simple configure which based on [browserify]
[browserify]: http://browserify.org/   

## Getting started  

Using bbpack by run the build script (`node build`)

build.js ---

```
const BBPack = require('bbpack');
const bbpack = new BBPack({
	sourceMap: true,
	uglify: false,
	watch: true
});

bbpack.pagesPack({
	pages: [
		{ path: './dist/bundle.js', parts: ['./src/src.js'] }
	]
});
```

src/src.js ---
```
CMD ....
```

## Options  

### Init Params
`sourceMap` - `Boolean`. Add sourceMap or not, default `false`
`uglify` - `Boolean`. Uglify or not, default `false`
`watch` - `Boolean`. Rebuild the file when source file changed, default `false`
`transforms` - `Array`. Custom browserify's transforms or plugins, default:
```
[
	{
	    plugin: require('less-modulesify'),
	    config: {
	        sourceMap: config.sourceMap,
	        lessCompileOption: {}
	    }
	},
	{
	    transform: require('babelify'),
	    config: {
	        presets: ['es2015', 'react', 'stage-3']
	    }
	}
]
```
`afterPipes` - `Array`. Custom afterPipes, default `[]`, see [bbpack-examples](https://github.com/wujohns/bbpack-examples) for its' usage

### Methods
```
var BBPack = require('bbpack');
var bbpack = new BBPack({
	...Init Params
});
```

```
bbpack.pagesPack(pagesConfig, callback)
```
***pagesConfig***  
Object

***callback***  
Function, default `() => {}`

`pagesConfig.pages` is an array.  
`pagesConfig.pages[].path` is a string. The target path the file after building saved  
`pagesConfig.pages[].src` is an array. The source files, can use [globby](https://www.npmjs.com/package/globby) formed  
`pagesConfig.extenals` is an array. the elements in this array are exposed by libsPack

```
bbpack.libsPack(libsConfig, callback)
```

***libsConfig***  
Object

***callback***  
Function, default `() => {}`

`libsConfig.libs` is an array.  
`libsConfig.libs[].src` is a string. The node_module's name or the package's path  
`libsConfig.libs[].expose` is a string. Custom the package's name  
`libsConfig.savePath` is a string. The libs save path after packed  

## Examples  

Just see [bbpack-examples](https://github.com/wujohns/bbpack-examples)

## Licence  
MIT  