var property = require('./property')

module.exports = function(app) {
  app.dynamicHelpers({
    messages: require('express-messages')
    , admin_menu: function() {
      return property.create();
      }
    , home_menu: function() {
      return property.create();
      }
    , assets: function(res, req) {
      return config.assets.cacheTimestamps;
      }
  });
  
  app.helpers({
    helper: require('./application')
    , admin: require('./admin')
  });
}