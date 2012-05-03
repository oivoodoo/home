var util = require ('util');

module.exports = function(app) {

  process.addListener('uncaughtException', function (err, stack) {
    console.log(util.inspect(err));
    console.log(util.inspect(stack));
    err.message && log(err.message);
    err.stack && log(err.stack);
  });

  function NotFound(msg) {
    this.name = 'NotFound';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
  }

  util.inherits(NotFound, Error);

  app.get("*", function(req, res, next){
    res.render('500.jade', { status: 500, error: err });
  });

  app.error(function(err, req, res, next){
    if (err instanceof NotFound) {
      res.render('404.jade', { status: 404, error: err });
    } else {
      next(err);
    }
  });

  app.error(function(err, req, res) {
    res.render('500.jade', { status: 500, error: err });
  });

}
