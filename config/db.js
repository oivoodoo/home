var express = require('express');

module.exports = function(app) {
  app.configure('development', function() {
    app.set('db-uri', 'mongodb://localhost/scores-development');
    app.use(express.errorHandler({ dumpExceptions: true }));
  });

  app.configure('test', function() {
    app.set('db-uri', 'mongodb://localhost/scores-test');
  });

  app.configure('production', function() {
    app.set('db-uri', process.env.MONGODB_URL);
  });

  app.db = app.mongoose.connect(app.set('db-uri'));
};

