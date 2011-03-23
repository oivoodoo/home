module.exports = function(app) {
  app.get('/admin/resource(/)?', function(req, res, next) {
    Resource.find({}, function(resources) {
      res.render('admin/resources/index', {
        layout: 'admin', 
        resources: resources
        });
      });
    });
    
  app.post('/admin/resource/create(/)?', function(req, res, next) {
    var resource = new Resource(req.body.resource);
    resource.save(function(err) {
      if (err) return next(err);
      res.render('admin/resources/index', {layout: 'admin'});
      });
    });
}