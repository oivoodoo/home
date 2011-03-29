var nodemailer = require('nodemailer');

module.exports = function(app) {
  var Score = app.Score
      , Post = app.Post
      , Contact = app.Contact;

  app.get('/', function(req, res) {
      res.render('index', {layout: !req.xhr});
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
      }
    }).limit(13).sort('scores', -1);
  });

  app.get('/projects(/)?', function(req, res, next){
    res.render('projects', {layout: !req.xhr});
    });

  app.get('/contacts(/)?', function(req, res, next) {
    res.render('contacts', {layout: !req.xhr});
    });

  app.post('/contacts', function(req, res, next) {
    console.log(req.body);
    console.log(require('sys').inspect(req.body));
    var contact = new Contact(req.body.contact);
    contact.save(function(err) {
      console.log(err);
      nodemailer.send_mail({
        sender: "alex.korsak@gmail.com",
        to: "alex.korsak@gmail.com",
        subject: "(Home Site) Someone contact you",
        html: 'Email: ' + contact.email + '<br />Name: ' + contact.name + '<br/>Message:<br/>' + contact.message
        },
        function(error, success) {
          console.log("Message "+(success ? "sent" : "failed"));
          }
        );
      });
      res.send('Message is sent!');
    });
}
