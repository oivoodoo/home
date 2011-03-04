module.exports = function(mongoose, func) {
    var Schema = mongoose.Schema;

    Post = new Schema({
        'title': String,
        'content': String,
        'createdAt': Date,
        'updatedAt': Date
    });

    mongoose.model('Post', Post);

    func();
}
