module.exports = function(app) {
    var Score = app.Score;
    
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

}
