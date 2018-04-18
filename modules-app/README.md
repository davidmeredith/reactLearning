# Bundling with browserify or weback 

See tutorial for basic bundling with browserify or webpack: 
<https://www.sitepoint.com/javascript-modules-bundling-transpiling/>

Tutorial shows how to bundle using either browserify or webpack.
Tutorial also shows how to transpile from either CoffeeScript, TypeScript or ES6 into ES5.

```bash
mkdir modules-app
cd modules-app
npm init -y
npm install --save-dev browserify webpack jspm lodash
mkdir src
touch src/{entry,lib}.js index.html
```

Then edit the files as in the tutorial. 

Update the package.json scripts key with: 

```json
"scripts": {
  "browserify": "browserify ./src/entry.js -o ./bundle.js",
  "webpack": "webpack ./src/entry.js bundle.js"
},
```
then to run browserify or webpack run: 

```bash
npm run browserify
echo 'or to run weback'
npm run webpack
```


