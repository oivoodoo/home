var basicAuth = require('express').basicAuth;

module.exports = function(app) {
  var Post = app.Post
      , Resource = app.Resource;

  app.all('/admin(/*)?', basicAuth(function(user, password){
    return user == 'admin' && password == 'admin';
  }));
  
  app.all('/admin(/*)?', function(req, res, next) {
    Resource.find({}, function(err, resources) {
      if (err) return next(err);
      res.local('resources', resources);
      next();
      });
    });

  app.get('/admin(/)?', function(req, res, next){
    Post.count({}, function(err, count){
      if (err) next(err);
      res.render('admin/index', {layout: 'admin', posts_length: count});
    });
  });

};
