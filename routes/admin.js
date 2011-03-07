var basicAuth = require('express').basicAuth;

module.exports = function(app) {
  
    app.all('/admin(/*)?', basicAuth(function(user, password){
      return user == 'admin' && password == 'admin';
    }));

    app.get('/admin(/)?', function(req, res, next){
      res.render('admin/index', {layout: 'admin'});
    });

};
