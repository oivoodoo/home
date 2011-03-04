module.exports = function(mongoose, func) {
    var Schema = mongoose.Schema;

    Score = new Schema({
        'username': String,
        'scores': Number
    })

    mongoose.model('Score', Score);

    func();
}
