var assetManager = require('connect-assetmanager')
    , assetHandler = require('connect-assetmanager-handlers')
    , stylus = require('stylus');

var assetsConfig = {
    'css': {
      'route': /\/stylesheets\/[0-9]+\.*\.css/
      , 'path': './public/stylesheets/'
      , 'dataType': 'css'
      , 'files': [
        'styles.css'
      ]
      , 'preManipulate': {
        '^': [
            assetHandler.fixVendorPrefixes
          , assetHandler.fixGradients
          , assetHandler.replaceImageRefToBase64(root)
        ]
      }
    }
  , 'js': {
        'route': /\/scripts\/[0-9]+\.*\.js/
      , 'path': './public/scripts/'
      , 'dataType': 'javascript'
      , 'files': [
        'application.js'
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

function compile(str, path, fn) {
  stylus(str)
    .set('filename', path)
    .set('compress', true)
    .render(fn);
};

exports.config = { 
  assets: assets.handler()
  , compile: compile
};

