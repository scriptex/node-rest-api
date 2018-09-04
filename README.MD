[![Build Status](https://travis-ci.org/scriptex/node-rest-api.svg?branch=master)](https://travis-ci.org/scriptex/node-rest-api)
[![Greenkeeper badge](https://badges.greenkeeper.io/scriptex/node-rest-api.svg)](https://greenkeeper.io/)
[![Analytics](https://ga-beacon.appspot.com/UA-83446952-1/github.com/scriptex/node-rest-api/README.md)](https://github.com/scriptex/node-rest-api/)

# Shop REST API using NodeJS, Express and MongoDB

This is a Typescript port of the awesome REST API tutorial which can be found here: https://github.com/academind/node-restful-api-tutorial/tree/13-controllers/.

-----

**This is still a work in progress.**

TODO:
1. Extensive types annotation
2. Interfaces implementation
3. Tests

-----

Create a `.env` file using the `.env.example` file and add your [Mongo Atlas](https://www.mongodb.com/cloud/atlas) admin password:

```sh
ATLAS_PWD=<YOUR_PASSWORD_HERE>
JWT_KEY=secret
ROOT=http://localhost
PORT=3000
```

To install and run it:

```sh
npm i # or yarn

npm start # or yarn start
```
