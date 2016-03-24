# Instantly Lunch Randomizer [![Build Status](https://travis-ci.org/rgdelato/instantly-lunch.svg?branch=master)](https://travis-ci.org/rgdelato/instantly-lunch) [![Coverage Status](https://coveralls.io/repos/github/rgdelato/instantly-lunch/badge.svg?branch=master)](https://coveralls.io/github/rgdelato/instantly-lunch?branch=master)

A small demo app to give myself a React project to work on.

Hosted on Surge at http://instantlylunch.surge.sh/ and works with the Redux Dev Tools [Chrome extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd).


## File Structure
* `index.js` - initial store creation, wiring to Firebase, and basic rendering/routing
* `components` - React components
* `containers` - Redux `connect` calls to React components
* `reducers` - reducers
* `actions` - action creators and action string constants
* `styles` - placeholder CSS, mostly copied from Bourbon
