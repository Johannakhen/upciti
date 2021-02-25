# This is a test for Upcity

The goal of this exercise is to build a user interface for the provided backend.

#### Run docker-compose up

If any difficulties/ errors with docker

- cd frontend
- Delete node modules
- npm i
- npm node-sass
- npm install react-scripts@3.4.1 -g
- run docker-compose up --build --force-recreate

If still any errors

- cd frontend
- Replace in package.json ./node_modules/.bin/react-scripts start to react-scripts start
- npm i
- npm run start

When getting an error from /devices the app will call data.json with dummy datas

## UX/UI

Simple dashboard view with a fixed sidebar and the content as a data table

## Components

Datatable.js that render the provided datas

Options to search and filter datas

Pagination to handle navigation of the content

## Backend

Use fastai middleware to remove CORS restrictions

## Screenshots

Images of the app
