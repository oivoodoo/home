var sanitize = require('validator').sanitize;

module.exports = function(app) {
  var Score = app.Score;

  app.post('/create', function(req, res) {
    var scores = sanitize(req.body.score.scores).xss().replace(/\[removed\]/g, '');
    var username = sanitize(req.body.score.username).xss().replace(/\[removed\]/g, '');

    var hash = { scores: scores, username: username };

    var score = new Score(hash);
    if (score.scores > 0 || score.scores < 35000) { // magic number for saving scores
      score.save(function(err) {
        if (err) return next(err);
      });
    }
    res.send('OK+');
  });

  app.get('/top/json', function(req, res) {
    var scores = Score.find().limit(30).sort('scores', -1).run(function(err, scores) {
      res.header("Access-Control-Allow-Origin", "*");
      if (!!scores) {
        res.send(scores.map(function(s){
          return s.toObject();
        }));
      } else {
        res.send("-ERR");
      }
    });
  });

  app.get('/top', function(req, res) {
    Score.find().limit(800).sort('scores', -1).run(function(err, scores) {
      Score.count().run(function(err, total) {
        res.render('top', { scores: scores, total: total });
      });
    });
  });
};
