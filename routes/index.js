module.exports = function(app) {
  require('./application')(app);
  require('./admin')(app);
  require('./admin/resources')(app);
  require('./admin/posts')(app);
  require('./errors')(app);
}