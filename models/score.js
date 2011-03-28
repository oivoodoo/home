module.exports = function(app) {
    var Schema = app.mongoose.Schema;

    Score = new Schema({
        'username': {type: String, default: "empty"},
        'scores': {type: Number, default: 0}
    })

    app.mongoose.model('score', Score);

    app.Score = app.mongoose.model("score");
}
