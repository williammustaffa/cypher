## Cypher: HTML5 game engine ##

![circleci: build status](https://circleci.com/gh/williammustaffa/cypher.png?style=shield) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A simple and easy-to-use html5 game engine, which will let you code using ES6 with some GML-like code language and logic.
If you have some knowledge in GML, you already ROCK!

## Development ##
For the development we are using webpack-dev-server, which will compile/transpile your ES6 code to ES5.
To start the dev server, run the following command:
```
npm install
npm start
```
## Eslint
This project has specific eslint rules for ES6 within the file .eslinrc.
There are extensions for running eslint directly in your text editor/IDE, but you can simply check the eslint errors by running in your project folder:
```
eslint -c ./.eslintrc ./path/to/target
```

or simply run the commands below which will also fix some minor eslint issues automatically.

For `./core`:
```
npm run eslint:core
```

For `./src`:
```
npm run eslint:src
```

**Obs:** _When running `git commit` in your console, eslint will run automatically these two commands to prevent non-linted code in the branch._

## Build ##
Building is a really simple task here. 
You just need to run the following command:
```
npm build
```

## Documentation ##
Let's wait a release... Because this can change a lot in the future.