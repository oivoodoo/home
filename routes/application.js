module.exports = function(app) {
    var Score = app.Score;
    var Post = app.Post;

    app.get('/', function(req, res) {
        Post.find({}, function(err, posts) {
            res.render('index', {
                locals:{
                    posts: posts
                }
            });
        }).limit(10).sort('updatedAt', -1);
    });

    app.post('/create', function(req, res) {
      var score = new Score(req.body.score);
      score.save(function(err) {
        if (err) return next(err);
      });
      res.send('OK+');
    });

    app.get('/top/:format?', function(req, res) {
      var scores = Score.find({}, function(err, scores) {
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
      }).limit(13).sort('scores', -1);
    });

    app.get('/about', function(req, res, next){
        res.render('about');
    });

    app.get('/projects', function(req, res, next){
        res.render('projects');
    });

    app.get('/contacts', function(req, res, next){
        res.render('contacts');
    });
}
