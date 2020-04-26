# The Shame Game

Backend for our submission to hack:now, UC Berkeley's online hackathon.

[Devpost](https://devpost.com/software/the-shame-game)

## Installation

[Getting Started](https://firebase.google.com/docs/functions/get-started)

## Usage

Each function is stored in its own file for modularity and referenced in/exported to `index.js` which is necessary for deploying to Firebase Cloud Functions.

Functions can be accessed through the Firebase SDK for Cloud Functions, detailed [here](https://firebase.google.com/docs/functions/callable).

## Contributing
Simply create a new pull request that includes your functions .js file, in addition to an updated index.js that includes the newly-created function.
