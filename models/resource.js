module.exports = function(mongoose, func) {
    var Schema = mongoose.Schema;

    Resource = new Schema({
        'name': {type: String, default: ''}
    });

    Post.path("title").validate(function(t) {
        return t.length > 0;
    }, "title can't be empty");

    Post.path("content").validate(function(c) {
        return c.length > 0;
    }, "content can't be empty");

    mongoose.model('post', Post);

    func();
}
