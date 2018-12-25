const ObjectID = require('mongodb').ObjectID;
const setting = require('../setting')
const DEFAULT_DB = setting.mongo.dbname

class Model {

	constructor({db = DEFAULT_DB, collection = null}) {
		this.collection = collection
		this.db = db
	}

	_co() {
		if(!this.database) {
			this.database = mongoClient.db(this.db)
		}
		return this.database.collection(this.collection);
	}

	/**
	 * save
	 */
	async insertOne(data) {
		const obj = await this._co().insertOne(data);
		return obj.ops[0]._id
	}

	/**
	 * findById
	 */
	async findById(id) {
		return await this._co().findOne({_id: ObjectID(id)});
	}

	/**
	 * findOne
	 */
	async findOne(q) {
		return await this._co().findOne(q);
	}

	/**
	 * findOneAndUpdate
	 */
	async findOneAndUpdate(q, set) {
		const o = await this._co().findOneAndUpdate(q, set)
		return o.value
	}

	/**
	 * findByIdAndUpdate
	 */
	async findByIdAndUpdate(id, set) {
		const o = await this._co().findOneAndUpdate({_id: ObjectID(id)}, set)
		return o.value
	}

	/**
	 * findOneAndDelete
	 */
	async findOneAndDelete(q) {
		return await this._co().findOneAndDelete(q);
	}

	/**
	 * pagination 1
	 * 	query by cursor
	 */
	async queryByCursor(q = {}, skip = 0, limit = 20, sort = {_id: -1}) {
		return await this._co().find(q)
			.skip(skip)
			.limit(limit)
			.sort(sort)
			.toArray()
	}

	/**
	 * pagination 2
	 * 	query by exact target
	 */
	async queryByTarget(q = {}, skip = null, limit = 20, sort = {_id: -1}) {
		if(skip) {
			q._id =  {
				'$lt': skip
			}
		}
		return await this._co().find(q)
			.limit(limit)
			.sort(sort)
			.toArray()
	}
}

module.exports = Model;
