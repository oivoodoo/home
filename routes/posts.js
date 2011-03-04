var basicAuth = require("express").basicAuth;

module.exports = function(app) {
    var Post = app.Post;

    app.all('/posts/(/*)?', basicAuth(function(user, password) {
        return user == 'admin' && password == 'admin';
    }))

    app.routes.param('post', function(req, res, next, id){
        if (id != null) {
            Post.findOne({_id: id}, function(err, post) {
                if (err) return next(err);
                if (!post) return next(new Error('failed to load post ' + id));
                req.post = post;
                next();
            });
        }
    });

    app.get('/posts/new', function(req, res, next) {
        res.render('posts/form', {
            locals: {
                post: {}
            }
        });
    });

    app.get('/posts/:post/edit', function(req, res, next){
        res.render('posts/form', {
            locals: {
                post: req.post
            }
        })
    });

    app.post('/posts/', function(req, res, next){
        var post = new Post(req.body.post);
        post.save(function(err) {
            if (err) return next(err);
            req.flash("info", "Successfully create post _%s_", post.title);
            res.redirect('/posts/' + post.id);
        });
    });

    app.put('/posts/', function(req, res, next) {
        post.update(req.body.post, function(err) {
            if (err) next(err);
            req.flash("info", "Successfully updated post");
            res.redirect('/posts/' + post.id);
        });
    });

    app.get('/posts/:post?', function(req, res, next){
        res.render('posts/show', {
            locals: {
                post: req.post
            }
        });
    });

    app.get('/posts/', function(req, res, next) {
        Post.find({}, function(err, posts) {
            if (err) return next(err);
            res.render('posts/index', {
                locals:{
                    posts: posts
                }
            });
        });
    });
}
