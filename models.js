var Score;

function defineModels(mongoose, func) {
    var Schema = mongoose.Schema;

    Score = new Schema({
        'username': String,
        'scores': Number
    })

    mongoose.model('Score', Score);

    func();
}

exports.defineModels = defineModels;
