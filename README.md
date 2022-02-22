## Installation

### Client
`cd client` to move into the client directory.\
Run `npm install` to install neccessary packages for our client.\
Run `npm start` to run the react app in your browser.

### Server
`cd server` to move into the server directory.\
Create a virtual environment with `python3 -m venv venv`.\
While in the server directory, run the virtual environment with `./venv/Scripts/activate` in cmd.\
If you are using powershell, run the virtual environment with `./venv/Scripts/activate.ps1` instead.\
Install dependencies by running `pip install -r requirements.txt`.\
Run `uvicorn main:app --reload` to run the server.\
You can deactivate your virtual environment by running `deactivate`.

## Available Client Scripts 

In the /client directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
