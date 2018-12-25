const format = require('util').format
const setting = require('../setting')
// const bluebird = require("bluebird")
const { promisify } = require('util')
const mongodb = require("mongodb")

// promise mongo
// bluebird.promisifyAll(mongodb)

/***
 * connect db
 */
exports.connect = function() {
	// return mongodb.MongoClient.connectAsync(
	// 	format("mongodb://%s:%s", setting.mongo.host, setting.mongo.port), {
	// 	useNewUrlParser: true
	// })

	const connectAsync = promisify(mongodb.MongoClient.connect).bind(mongodb.MongoClient)
	return connectAsync(
		format("mongodb://%s:%s", setting.mongo.host, setting.mongo.port), {
			useNewUrlParser: true
		})
}
