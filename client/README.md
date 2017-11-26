# React & Redux: Readable

[![Build Status](https://travis-ci.org/LonelyPrincess/reactnd-project-readable.svg?branch=master)](https://travis-ci.org/LonelyPrincess/reactnd-project-readable)
[![Inline docs](http://inch-ci.org/github/LonelyPrincess/reactnd-project-readable.svg?branch=master&style=shields)](http://inch-ci.org/github/LonelyPrincess/reactnd-project-readable)
![Live demo](https://img.shields.io/badge/live%20demo-unavailable-red.svg)

This is the final project for the second module of the [Udacity's React Nanodegree](https://www.udacity.com/course/react-nanodegree--nd019), "React & Redux".

## Project description

This application will allow users to post content related to a fixed set of categories. For any of the published posts, any user may update their overall score as well as include comments.

Since no authentication system is implemented, any user can vote for a post as many times as they want. Also, anyone can edit or delete existing posts or comments.

## Installation and deployment

### Pre-requisites

Before being able to run this application, you must have [Node Package Manager](https://nodejs.org/en/) or [Yarn](https://yarnpkg.com/) installed on your system.

### Get the application running

If you have all the required software installed, the first step to run this application is to install all of its dependencies and start the application's server.

To do so, you must open a console and, once located into the client project's root directory, run the following commands:

```bash
# Install all project's dependencies
> npm install

# Run application's server
> npm start
```

These instructions assume that you've installed [Node Package Manager](https://nodejs.org/en/). If you are using [Yarn](https://yarnpkg.com/) instead, just replace `npm` with `yarn` in the commands listed above.

After running the `start` command, the console output should tell you at which URL is the application running.

```bash
The app is running at:

  # URL where the app is running
  http://localhost:3000/
```

Now you only have to enter that URL into your favourite browser, and that's it! You're all set!

## Project structure

The project folder structure is as follows:

```bash
├── public
└── src
    ├── main
    ├── res
        ├── data
        ├── images
        ├── stylesheets
    ├── test
```

Two folders can be found at the project's root path, being the `src` the most important one as it is the place where all of the application source code will live. The other one, `public`, will contain public resources that can be directly accessed via a direct request to the server, such as the application _favicon_ and the _index.html_ file.

The `src` directory is divided in three parts, each one with a different purpose:

- `main` - As the name implies, this folder contains the main code for the project, being it the wrapper for all the files where the app's functionality is implemented.

- `res` - Resources to be used by the application, including images, stylesheets or mock data files that can be used for testing purposes.

- `test` - Code for unit testing is wrapped into this folder.

## Aspects to consider

### Project status

This project is still under development and you may encounter some bugs while using it. If you come across any of them, feel free to [open a new issue](https://github.com/LonelyPrincess/reactnd-project-readable/issues/new) so it can be eventually be fixed.

### Non-responsive design

Please, note that _the design is still incomplete_ and it has only been tested in high screen resolutions with at least 860px of width. It's pretty unlikely it will look good on smaller screens, so until I update it to be responsive, I don't encourage testing the application in resolutions with a width under 800px.

Since that's not the goal of this project in particular, improving it to be responsive is not one of my priorities as of now, so it'll take a while for that to happen.

### Browser support

This application has been tested in the following browsers:

* Google Chrome (~60.0.3112.113)
* Firefox Developer Edition (~56.0b11)

It's possible that _it might present unexpected behaviours or rendering problems in older browsers_ that have no support for the latest ES2015, HTML5 or CSS3 features.

Since Chrome was one of the main tools used while developing and debugging this application, it's highly recommended to run it in a recent version of Google Chrome.

### Credits

If you need information of the resources used on this project, take a look at [this file](CREDITS.md). This includes links to some useful documentation resources, tools involved in the development process and credits to the authors of the icons used throughout the application.
