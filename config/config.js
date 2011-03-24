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

function compile(str, path, fn) {
  stylus(str)
    .set('filename', path)
    .set('compress', true)
    .render(fn);
};

exports.config = { 
  assets: { 
    handler: assetManager(assetsConfig)
    , compile: compile
  }
};

