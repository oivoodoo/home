module.exports = function(mongoose, func) {
    var Schema = mongoose.Schema;

    Resource = new Schema({
        'name': {type: String, default: ''}
    });

    Resource.path("name").validate(function(t) {
        return t.length > 0;
    }, "name can't be empty");

    mongoose.model('resource', Resource);

    func();
}
