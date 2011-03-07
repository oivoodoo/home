module.exports = function(mongoose, func) {
    var Schema = mongoose.Schema;

    Post = new Schema({
        'title': {type: String, default: ''},
        'content': {type: String, default: ''},
        'createdAt': {type: Date, default: Date.now},
        'updatedAt': {type: Date, default: Date.now}
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
