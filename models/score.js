module.exports = function(mongoose, func) {
    var Schema = mongoose.Schema;

    Score = new Schema({
        'username': {type: String, default: "empty"},
        'scores': {type: Number, default: 0}
    })

    mongoose.model('Score', Score);

    func();
}
