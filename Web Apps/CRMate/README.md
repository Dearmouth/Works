## Prerequisites
Make sure you have either `npm` or `yarn` installed on your machine.

## Getting started
1. Clone this repository and checkout to development.
```
cd wherever-you-keep-your-projects
git clone https://github.com/tzcl/it-project
cd it-project
git checkout development
```
2. Put the appropriate .env file into the client folder.
3. Put the appropriate .env file into the server folder.
4. Run `npm install` in the client and server folders.

## Running the application locally as two separate applications 
1. Run `npm run dev` in the server folder to run the backend Express app. This runs `nodemon` which restarts the server when any changes are made. 
2. Run `npm start` in the client folder to start the React app. This refreshes the browser automatically when any changes are made. 

## Running the containerized application 
1. Run `docker-compose up` inside the root directory. The entire application will be located at the port specified in the docker-compose.yaml file.
