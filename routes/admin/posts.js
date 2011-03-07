module.exports = function(app) {
    var Post = app.Post;

    app.param('post', function(req, res, next, id){
        if (id != null) {
            Post.findOne({_id: id}, function(err, post) {
                if (err) return next(err);
                if (!post) return next(new Error('failed to load post ' + id));
                req.post = post;
                next();
            });
        }
    });

    app.get('/admin/posts(/)?', function(req, res, next) {
        Post.find({}, function(err, posts) {
            if (err) return next(err);
            res.render('admin/posts/index', {
                posts: posts,
                layout: 'admin'
            });
        });
    });


    app.get('/admin/posts/new', function(req, res, next) {
        res.render('admin/posts/form', {
            post: {},
            layout: 'admin'
        });
    });

    app.get('/admin/posts/:post/edit', function(req, res, next){
        res.render('admin/posts/form', {
            post: req.post,
            layout: 'admin'
        })
    });


    app.post('/admin/posts/', function(req, res, next){
        var post = new Post(req.body.post);
        post.save(function(err) {
            if (err) return next(err);
            req.flash("info", "Successfully create post _%s_", post.title);
            res.redirect('/admin/posts/' + post.id);
        });
    });

    app.put('/admin/posts/:post', function(req, res, next) {
        req.post.title = req.body.post.title;
        req.post.content = req.body.post.content;
        req.post.updatedAt = new Date();
        req.post.save(function(err) {
            if (err) next(err);
            req.flash("info", "Successfully updated post");
            res.redirect('/admin/posts/' + req.post.id);
        });
    });

    app.get('/admin/posts/:post?', function(req, res, next){
        res.render('admin/posts/show', {
            post: req.post,
            layout: 'admin'
        });
    });
}
