module.exports = function(app) {
  app.dynamicHelpers({
    messages: require('express-messages')
    , admin_menu: function() {
      return property.create("Dashboard");
      }
    , home_menu: function() {
      return property.create("Home");
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