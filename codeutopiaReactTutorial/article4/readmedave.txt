// transcript below to get sample working. 

sudo npm install -g browserify
npm install --save react react-dom
npm install --save babelify babel-preset-react
npm install --save-dev babel-core

// React without ES6 
// (this was an older tutorial using the 'createReactClass() method,
// therefore needed to install 'create-react-class' module
// Note - its better to use more modern 'class MyClass extends React.Component' )
// https://stackoverflow.com/questions/46482433/reactjs-createclass-is-not-a-function
// https://reactjs.org/docs/react-without-es6.html 
npm install create-react-class --save

// build, the -t performs a transform, i.e. tell browserify to use babelify to 
// transform our code. 
browserify -t [ babelify --presets [ react ] ] src/index.js -o build/app.js

// Add our custom build line (line above) to the package 'scripts' under 'build' key
vim package.json
npm run build
