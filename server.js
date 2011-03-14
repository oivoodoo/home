var sys = require('sys')
    , express = require('express@2.0.0beta2')
    , jade = require('jade')
    , connect = require('connect@1.0.4')
    , mongoose = require('mongoose')
    , mongoStore = require('connect-mongodb')
    , db
    , property = require('./helpers/property')
    , stylus = require('stylus');

var root = __dirname + '/public';

var config = require('./config/config').config;

function compile(str, path, fn) {
  stylus(str)
    .set('filename', path)
    .set('compress', true)
    .render(fn);
}

var app = module.exports = express.createServer(
     connect.cookieParser()
    , stylus.middleware({
        src: __dirname + '/public/stylus'
        , dest: __dirname + '/public'
        , compile: compile
      })
    , config.assets
    , connect.static(root)
    , connect.bodyParser()
    , connect.methodOverride()
    , connect.favicon()
    , connect.session({ secret: '9FF96302-4633-11E0-AAE4-38FEDED72085' })
);

process.addListener('uncaughtException', function (err, stack) {
    console.log(err);
    console.log(stack);
    log('*************************************');
    log('************EXCEPTION****************');
    log('*************************************');
    err.message && log(err.message);
    err.stack && log(err.stack);
    log('*************************************');
});

app.mongoose = mongoose;

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
    messages: require('express-messages'),
    admin_menu: function() {
      return property.create("Dashboard");
    },
    home_menu: function() {
      return property.create("Home");
    },
    assets: function(res, req) { 
      return config.assets.cacheTimestamps;
    }
});

app.helpers({
    helper: require('./helpers/application'),
    admin: require('./helpers/admin')
});

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.session({store: mongoStore(app.set('db-uri')), secret: '9FF96302-4633-11E0-AAE4-38FEDED72085'}))
  app.use(express.logger({ format: '\x1b[1m:method\x1b[0m \x1b[33m:url\x1b[0m :response-time ms' }))
});

db = mongoose.connect(app.set('db-uri'));

require('./models/post')(mongoose, function() {
    app.Post = mongoose.model("post");
});
require("./models/score")(mongoose,  function() {
    app.Score = mongoose.model("score");
});

require('./routes/application')(app);
require('./routes/admin')(app);
require('./routes/admin/posts')(app);
require('./routes/errors')(app);

if (!module.parent) {
  app.listen(process.env.PORT || 3000);
  console.log('Express server listening on port %d, environment: %s', app.address().port, app.settings.env)
  console.log('Using Express %s, Jade %s', express.version, jade.version);
}
