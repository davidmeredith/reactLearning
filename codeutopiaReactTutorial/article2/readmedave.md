# Building and Running Simple React App that does not use ES6 import/export

## Install

Example app uses node/CommonJS rather than ES6 import/export. Note that other 
ES6 features such as arrow functions etc can still be used.

``` bash
sudo npm install -g browserify
npm install --save react react-dom
npm install --save babelify babel-preset-react
npm install --save-dev babel-core
```

Note that this tutorial was based on an older tutorial using the 'createReactClass() method,therefore, i originally needed to install 'create-react-class' module, see:
<https://stackoverflow.com/questions/46482433/reactjs-createclass-is-not-a-function>

``` bash
npm install create-react-class --save
```

Its better to use more modern 'class MyClass extends React.Component', so i re-wrote the Chat and ChatMessage classes to use the class approach which means i could remove the  'create-react-class' dependency from package.js, see these instructions:  <https://reactjs.org/docs/react-without-es6.html> 

## Building

We use a custom build by adding the following line to the package 'scripts' under 'build' key. On build, the -t performs a transform, i.e. tell browserify to use babelify to transform our code using the react preset - a preset is a set of plugins used to support particular language features (not sure specifying 'react' preset is actually needed because 'react' and 'es2015' are both used by default by babel).

```bash
browserify -t [ babelify --presets [ react ] ] src/index.js -o build/app.js
```

then run:

```bash
npm run build
```

## Dev build

Add the following line to 'scripts' under 'watch' key: 

```
"watch": "watchify -v -t [ babelify --presets [ react ] ] src/index.js -o build/app.js"
```

then run: 

```bash
npm run watch
```