var assetManager = require('connect-assetmanager')
    , assetHandler = require('connect-assetmanager-handlers')

var assetsConfig = {
    'css': {
      'route': /\/stylesheets\/[0-9]+\.*\.css/
      , 'path': './public/stylesheets/'
      , 'dataType': 'css'
      , 'files': [
        '960.css'
        , 'screen.css'
        , 'print.css'
        , 'project.css'
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
        'http://code.jquery.com/jquery-1.4.2.min.js'
        , 'scripts.js'
        , 'coda-slider.1.1.1.js'
        , 'jquery-easing-compatibility.1.2.pack.js'
        , 'jquery-easing.1.2.pack.js'
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

exports.config = { assets: assets.handler() };
