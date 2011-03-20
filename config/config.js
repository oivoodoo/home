var assetManager = require('connect-assetmanager')
    , assetHandler = require('connect-assetmanager-handlers');

var assetsConfig = {
    'js': {
        'route': /\/scripts\/[0-9]+\.*\.js/
      , 'path': './public/scripts/'
      , 'dataType': 'javascript'
      , 'files': [
        'jquery.min.js'
        , 'class.horinaja.jquery.js'
        , 'application.js'
      ]
      , 'postManipulate': {
        '^': [
            assetHandler.uglifyJsOptimize
        ]
      }
    }
};

var assets = {
  handler: function() {
    return assetManager(assetsConfig);
  }
};

exports.config = { 
  assets: assets.handler()
};

