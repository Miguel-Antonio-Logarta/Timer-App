## Installation

### Client
`cd client` to move into the client directory.\
Run `npm install` to install neccessary packages for our client.\
Run `npm start` to run the react app in your browser.

### Server
# First Steps
`cd server` to move into the server directory.\
Create a virtual environment with `python -m venv venv`.\
While in the server directory, run the virtual environment with `./venv/Scripts/activate` in cmd.\
If you are using powershell, run the virtual environment with `./venv/Scripts/activate.ps1` instead.\
Install dependencies by running `pip install -r requirements.txt`.\
Run `uvicorn main:app --reload` to run the server.\
You can deactivate your virtual environment by running `deactivate`.
# Configuration
Create a .env file with `touch .env`\
Go into your .env file and insert the following values:
```
DB_USERNAME=
DB_PASSWORD=
DB_HOSTNAME=
DB_PORT=
DB_NAME=
SECRET_KEY=
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=525600
CORS=http://localhost:3000
```
* **DB_USERNAME** should be your database name
* **DB_PASSWORD** should be your database password
* **DB_HOSTNAME** should be your database hostname (ex: localhost or 127.0.0.1)
* **DB_PORT** should be your database port 
* **DB_NAME** is the name of your database.
* **SECRET_KEY** can be generated by running `openssl rand -hex 32` in your terminal. Copy and paste the 64 character string into **SECRET_KEY**
* **ALGORITHM** is the algorithm used to hash passwords. I am currently using HS256
* **ACCESS_TOKEN_EXPIRE_MINUTES** is the time it takes for a token to expire
* **CORS** contains a url that we allow http requests to come from. In this case, it is http://localhost:3000 which is the default port that the react client runs on
After that, you should be all set to run the server.

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
