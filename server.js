var sys = require('sys'),
    express = require('express'),
    jade = require('jade'),
    app = module.exports = express.createServer(),
    mongoose = require('mongoose'),
    mongoStore = require('connect-mongodb'),
    models = require('./models'),
    db,
    Score,
    Settings = { development: {}, test: {}, production: {} };


app.configure('development', function() {
  app.set('db-uri', 'mongodb://localhost/scores-production');
  app.use(express.errorHandler({ dumpExceptions: true }));
});

app.configure('test', function() {
  app.set('db-uri', 'mongodb://localhost/scores-test');
});

app.configure('production', function() {
  app.set('db-uri', 'mongodb://localhost/scores-development');
});

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.use(express.favicon());
  app.use(express.bodyDecoder());
  app.use(express.cookieDecoder());
  app.use(express.session({ store: mongoStore(app.set('db-uri')), secret: 'topsecret' }));
  app.use(express.logger({ format: '\x1b[1m:method\x1b[0m \x1b[33m:url\x1b[0m :response-time ms' }))
  app.use(express.methodOverride());
  app.use(express.compiler({ src: __dirname + '/public', enable: ['less'] }));
  app.use(express.staticProvider(__dirname + '/public'));
});

models.defineModels(mongoose, function() {
  app.Score = Score = mongoose.model('Score');
  db = mongoose.connect(app.set('db-uri'));
});


function NotFound(msg) {
  this.name = 'NotFound';
  Error.call(this, msg);
  Error.captureStackTrace(this, arguments.callee);
}

sys.inherits(NotFound, Error);

app.get('/:format?', function(req, res) {
  Score.find().limit(30).sort('scores', -1).exec(function(err, scores) {
    console.log(sys.inspect(err));
    switch(req.params.format) {
      case 'json':
        res.header("Access-Control-Allow-Origin", "*");
        if (!!scores) {
          res.send(scores.map(function(s){
              return s.toObject();
          }));
        } else {
          res.send("-ERR");
        }
      break;
      default:
        res.render('index.jade', {
            locals: { scores: scores }
        });
    }
  });
});

app.post('/create', function(req, res) {
  var score = new Score(req.body.score);
  score.save(function(err) {
    if (!err) {
      console.log("Score is created.");
    }
  });
  res.send('OK+');
});

app.get('/top/:format?', function(req, res) {
  var scores = Score.find().limit(13).sort('scores', -1).exec(function(err, scores) {
    switch(req.params.format) {
    case 'json':
      res.header("Access-Control-Allow-Origin", "*");
      if (!!scores) {
        res.send(scores.map(function(s){
            return s.toObject();
        }));
      } else {
        res.send("-ERR");
      }
    break;
    default:
      res.render('index.jade', {
          locals: { scores: scores }
      });
    }
  });
});

if (!module.parent) {
  app.listen(3000);
  console.log('Express server listening on port %d, environment: %s', app.address().port, app.settings.env)
  console.log('Using Express %s, Jade %s', express.version, jade.version);
}
