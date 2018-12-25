// const isDev = process.env.NODE_ENV === 'development'

const setting = {
    appname: 'log-error-service',
    appport: 4003,
	mongo : {
		host:"localhost",
		port: 27017,
		dbname: "t_error_log"
	},
}

module.exports = setting