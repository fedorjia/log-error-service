const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const { responseMiddleware, setupExceptionMiddlewares } = require('node-response-middleware')
const cors = require('cors')
const util = require('util')

const setting = require('./setting')
const router = require('./controller')
const mongodb = require('./helper/mongodb');
const authorization = require('./middleware/auth')

const app = express()

app.use(cors()) // CORS
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(expressValidator()) // validator
app.use(helmet()) // secure Express apps

// response
app.use(responseMiddleware)

// authorization
app.use(authorization)

// router
app.use(router)

// setup exception handler middleware
setupExceptionMiddlewares(app)

/**
 * connect mongodb & start listening
 */
global.mongoClient = null;
mongodb.connect().then((client) => {
	global.mongoClient = client;
	app.listen(setting.appport);
	util.log(setting.appname + ' launched at: ' + setting.appport);
}).catch((err) => {
	util.log('connect mongodb error: ' + err.message);
});