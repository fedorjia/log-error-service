const LoggerModel = require('../model/logger')
const model = new LoggerModel()

module.exports = {

	async create(data) {
		data.created_at = Date.now()
		return await model.insertOne(data)
	},

	async query(q, pageIndex, pageSize) {
		return await model.queryByCursor(q, (pageIndex - 1) * pageSize, pageSize)
	}
}
