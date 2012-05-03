module.exports = function(app) {
  var Score = app.Score;

  app.post('/create', function(req, res) {
    var score = new Score(req.body.score);
    if (score.scores < 35000) { // magic number for saving scores
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
    Score.find().limit(300).sort('scores', -1).run(function(err, scores) {
      res.render('top', { scores: scores });
    });
  });
};
