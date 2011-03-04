require.paths.push('./projects')

var sys = require('sys'),
    express = require('express'),
    jade = require('jade'),
    app = module.exports = express.createServer(),
    mongoose = require('mongoose'),
    mongoStore = require('connect-mongodb'),
    db,
    Settings = { development: {}, test: {}, production: {} };

app.configure('development', function() {
  app.set('db-uri', 'mongodb://localhost/own-production');
  app.use(express.errorHandler({ dumpExceptions: true }));
});

app.configure('test', function() {
  app.set('db-uri', 'mongodb://localhost/own-test');
});

app.configure('production', function() {
  app.set('db-uri', 'mongodb://localhost/own-development');
});

app.dynamicHelpers({
    messages: require('express-messages')
});

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.use(express.favicon());
  app.use(express.bodyDecoder());
  app.use(express.cookieDecoder());
  app.use(express.session({ store: mongoStore(app.set('db-uri')), secret: '9FF96302-4633-11E0-AAE4-38FEDED72085' }));
  app.use(express.logger({ format: '\x1b[1m:method\x1b[0m \x1b[33m:url\x1b[0m :response-time ms' }))
  app.use(express.methodOverride());
  app.use(express.compiler({ src: __dirname + '/public', enable: ['less'] }));
  app.use(express.staticProvider(__dirname + '/public'));
});

function NotFound(msg) {
  this.name = 'NotFound';
  Error.call(this, msg);
  Error.captureStackTrace(this, arguments.callee);
}

sys.inherits(NotFound, Error);

db = mongoose.connect(app.set('db-uri'));

require('./models/post')(mongoose, function() {
    app.Post = mongoose.model("Post");
});
require("./models/score")(mongoose,  function() {
    app.Score = mongoose.model("Score");
});

require('./routes/application')(app);
require('./routes/posts')(app);

if (!module.parent) {
  app.listen(process.env.PORT || 3000);
  console.log('Express server listening on port %d, environment: %s', app.address().port, app.settings.env)
  console.log('Using Express %s, Jade %s', express.version, jade.version);
}
