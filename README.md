# Ethereum API


## Setup
Using `docker`, you can run with the command
```
docker-compose up
```
Running locally, you will need to install all the required package defined in the `package.json` with the following command
```
npm install
```
and then run with
```
npm run dev
```
if you plan on working with the dev environment. You can set up your own script in the `package.json` file under the section `sripts`

## Calls
You must make sure all POST calls are in the form of `x-www-form-urlencoded`.