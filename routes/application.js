var nodemailer = require('nodemailer');

module.exports = function(app) {
  var Post = app.Post
      , Contact = app.Contact;

  app.get('/', function(req, res) {
    res.render('index', {layout: !req.xhr});
  });

  app.get('/projects(/)?', function(req, res, next){
    res.render('projects', {layout: !req.xhr});
  });

  app.get('/contacts(/)?', function(req, res, next) {
    res.render('contacts', {layout: !req.xhr});
  });

  app.post('/contacts', function(req, res, next) {
    var contact = new Contact(req.body.contact);
    contact.save(function(err) {
      nodemailer.send_mail({
        sender: "alex.korsak@gmail.com",
        to: "alex.korsak@gmail.com",
        subject: "(Home Site) Someone contact you",
        html: 'Email: ' + contact.email + '<br />Name: ' + contact.name + '<br/>Message:<br/>' + contact.message
      }, function(error, success) {
        console.log("Message "+(success ? "sent" : "failed"));
      });
    });

    res.send('Message is sent!');
  });
};
