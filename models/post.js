module.exports = function(mongoose, func) {
    var Schema = mongoose.Schema;

    Post = new Schema({
        'title': String,
        'content': String,
        'date': Date
    });

    mongoose.model('Post', Post);

    func();
}
