module.exports = function(app) {
  var Contact = app.Contact;

  app.get('/admin/contacts(/)?', function(req, res, next) {
    Contact.find({}, function(err, contacts) {
      if (err) return next(err);
      res.render('admin/contacts/index', {
        contacts: contacts,
        layout: 'admin'
      });
    });
  });
}
