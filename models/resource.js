module.exports = function(app) {
    var Schema = app.mongoose.Schema;

    Resource = new Schema({
        'name': {type: String, default: ''},
        'link': {type: String, default: '/'}
    });

    Resource.path("name").validate(function(t) {
        return t.length > 0;
    }, "name can't be empty");

    app.mongoose.model('resource', Resource);

    app.Resource = app.mongoose.model("resource");
}
