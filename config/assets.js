var assetManager = require('connect-assetmanager')
  , assetHandler = require('connect-assetmanager-handlers')
  , root = __dirname + "/public";

var sys = require ('sys')
console.log(sys.puts(__dirname));

var assets = assetManager({
    'css': {
      'route': /\/static\/css\/[0-9]+\/.*\.css/
      , 'path': './public/css/'
      , 'dataType': 'css'
      , 'files': [
        'reset.css'
        , 'client.css'
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
        'route': /\/static\/js\/[0-9]+\/.*\.js/
      , 'path': './public/js/'
      , 'dataType': 'javascript'
      , 'files': [
        'jquery.js'
      , 'jquery.client.js'
      ]
    , 'postManipulate': {
        '^': [
            assetHandler.uglifyJsOptimize
        ]
      }
    }
});

exports.assetsManagerMiddleware = assetManager(assets);

