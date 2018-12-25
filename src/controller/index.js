const express = require('express')
const router = express.Router({mergeParams: true})
const { body, validationResult } = require('express-validator/check')

const service = require('../service/logger')

/**
 * create
 */
router.post('', [
	body('app', 'app required').trim().isLength({ min: 1 }),
	body('url', 'url required').trim().isLength({ min: 1 }),
	body('method', 'method required').trim().isLength({ min: 1 }),
	// 请求的内容，例如: {"query": {"name":"fedor"}, "body": {}}
	body('content', 'content required').trim().isLength({ min: 1 }),
	body('message', 'message required').trim().isLength({ min: 1 })
], async (req, res, next) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.failure(errors.array()[0].msg)
		}

		const { body } = req

		await service.create({
			app: body.app,
			url: body.url,
			method: body.method,
			content: body.content,
			message: body.message
		})

		return res.success(true)
	} catch (err) {
		next(err)
	}
})

/**
 * query
 */
router.get('', async (req, res, next) => {
	try {
		const { pageIndex = 1, pageSize = 200 } = req.query

		const data = await service.query({}, Number(pageIndex), Number(pageSize))
		return res.success(data)
	} catch (err) {
		next(err)
	}
})

module.exports = router