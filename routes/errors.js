var sys = require ('sys');

module.exports = function(app) {

    function NotFound(msg) {
      this.name = 'NotFound';
      Error.call(this, msg);
      Error.captureStackTrace(this, arguments.callee);
    }

    sys.inherits(NotFound, Error);

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
