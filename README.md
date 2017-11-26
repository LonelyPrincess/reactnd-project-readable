# React & Redux: Readable

This is the final project for the second module of the [Udacity's React Nanodegree](https://www.udacity.com/course/react-nanodegree--nd019), "React & Redux".

## Project description

This application will allow users to post content related to a fixed set of categories. For any of the published posts, any user may update their overall score as well as include comments.

Since no authentication system is implemented, any user can vote for a post as many times as they want. Also, anyone can edit or delete existing posts or comments.

## Installation and deployment

### Pre-requisites

Before being able to run this application, you must have [Node Package Manager](https://nodejs.org/en/) or [Yarn](https://yarnpkg.com/) installed on your system.

### Get the application running

The current repository contains both server and client code for this application, so you'll need to run both in order to make it work.

### Start the server

Since the server for this project is not deployed anywhere online, the first step to be able to run the React & Redux application is to deploy the server in your computer.

In order to do so, you must open a console in the project's root folder and type the following commands:

```bash
# Move to server directory
> cd server

# Install all project's dependencies
> npm install

# Run application's server
> npm start
```

After doing this, you should see a message in your console telling you that the server is now running and listening for new requests:

```bash
Server listening on port 3001, Ctrl+C to stop
```

### Start the client application

Once we have our server running, we can now proceed to start the client application that will make use of said back-end.

In order to so, the steps are pretty much the same we did to start the server. Open a new console in our project's root folder, and type the following commands:

```bash
# Move to client directory
> cd client

# Install all project's dependencies
> npm install

# Run application's server
> npm start
```

After running the `start` command, the console output should tell you at which URL is the application running.

```bash
The app is running at:

  # URL where the app is running
  http://localhost:3000/
```

Now that your application server is running, you only have to enter that URL in your browser and you'll be able to navigate through the application.

## More information

Shall you need more information about the API or the client side of this application, you may check out the specific `README` files for both [server](server/README.md) and [client](client/README.md) projects.
