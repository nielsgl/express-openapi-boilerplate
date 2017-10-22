'use strict';

const debug = require('debug')('app:root');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
const SwaggerExpress = require('swagger-express-mw');

var express = require('express');
var app = express();
module.exports = app; // for testing

var config = {
	appRoot: __dirname // required config
};

// From Express
// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.json({status: err.status, error: 'err', message: 'message'});
// });


SwaggerExpress.create(config, function(err, swaggerExpress) {
	if (err) { throw err; }

	// install middleware
	swaggerExpress.register(app);

	var port = process.env.PORT || 10010;
	app.listen(port);

	if (swaggerExpress.runner.swagger.paths['/hello']) {
		debug('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Niels');
	}
});


module.exports = app;
