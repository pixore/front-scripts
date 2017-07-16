[![Build Status][travis]][travis-url]
[![Npm version][npm]][npm-url]
# Pixore front-scripts

**Currently under development.**
## Installation
```sh
npm install -g create-react-app
```

## Scripts

- [pixore-front-scripts start](pixore-front-scripts-start)
- [pixore-front-scripts build](pixore-front-scripts-start)
- [pixore-front-scripts test](pixore-front-scripts-start)

### `pixore-front-scripts start`
Runs the app in development environmnet with livereload. By default it will use port 80.

|  Option  | Description                    |  Type  |
|----------|--------------------------------|--------|
| `--port` | Use this port instead of 80    | Number |

> **Note:** also It will look at the environmnet variables for `PORT` as a first option.


### `pixore-front-scripts build`
Builds the app for production to the build folder.

### `pixore-front-scripts test`
Launches the test runner with karma and mocha

## Todo list
- Make karma optional

[npm]: https://img.shields.io/npm/v/@pixore/front-scripts.svg
[npm-url]: https://www.npmjs.com/package/@pixore/front-scripts
[travis]: https://travis-ci.org/pixore/front-scripts.svg?branch=master
[travis-url]: https://travis-ci.org/pixore/front-scripts