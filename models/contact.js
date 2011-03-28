module.exports = function(app) {
    var Schema = app.mongoose.Schema;

    Contact = new Schema({
        'email': {type: String, default: ''},
        'name': {type: String, default: ''},
        'message': {type: String, default: ''}
    });

    Contact.path("email").validate(function(t) {
        return t.length > 0;
    }, "name can't be empty");

    Contact.path("message").validate(function(c) {
        return c.length > 0;
    }, "message can't be empty");

    app.mongoose.model('contact', Contact);

    app.Contact = app.mongoose.model("contact");
}
