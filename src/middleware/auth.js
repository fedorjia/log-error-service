const dbs = require('../db.json')

/**
 * find app
 */
const findApp = (appid) => {
	return dbs.find((item) => item.id === appid)
}

/**
 * authorization
 */
module.exports = async(req, res, next) => {
	const { appid, appsecret } = req.headers
	if(!appid) {
		return res.failure('appid_required')
	}
	if(!appsecret) {
		return res.failure('appsecret_required')
	}

	try {
		const app = findApp(appid)
		if (!app) {
			return res.failure('invalid_appid')
		}
		if (app.secret !== appsecret) {
			return res.failure('invalid_appsecret')
		}

		res.locals.app = app

		next()
	} catch (err) {
		next(err)
	}
}