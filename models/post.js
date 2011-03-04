module.exports = function(mongoose, func) {
    var Schema = mongoose.Schema;

    Post = new Schema({
        'title': String,
        'content': String,
        'createdAt': {type: Date, default: Date.now},
        'updatedAt': {type: Date, default: Date.now}
    });

    Post.path("title").validate(function(p) {
        return p.length > 0;
    }, "title can't be empty");

    Post.path("content").validate(function(p) {
        return p.length > 0;
    }, "content can't be empty");

    mongoose.model('Post', Post);

    func();
}
