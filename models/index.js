module.exports = function(app) {
  require('./post')(app.mongoose, function() {
    app.Post = app.mongoose.model("post");
    });
  require("./score")(app.mongoose,  function() {
    app.Score = app.mongoose.model("score");
    });
  require("./resource")(app.mongoose, function() {
    app.Resource = app.mongoose.model("resource");
    });
  };