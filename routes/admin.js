var basicAuth = require('express').basicAuth;

module.exports = function(app) {
  var Post = app.Post;

  app.all('/admin(/*)?', basicAuth(function(user, password){
    return user == 'admin' && password == 'admin';
  }));
  
  app.all('/admin(/*)?', function(req, res, next) {
    Resource.find({}, function(err) {
      if (err) return next(err);
      });
    });

  app.get('/admin(/)?', function(req, res, next){
    Post.count({}, function(err, count){
      if (err) next();
      res.render('admin/index', {layout: 'admin', posts_length: count});
    });
  });

};
