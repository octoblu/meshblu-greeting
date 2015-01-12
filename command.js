var Plugin = require('./index').Plugin;
var meshblu = require('meshblu');
var config = require('./meshblu.json');

var conx = meshblu.createConnection({
  server: 'meshblu.octoblu.com',
  port: '80',
  uuid: config.uuid,
  token: config.token
});

conx.on('notReady', console.error);
conx.on('error', console.error);

var plugin = new Plugin(conx, {});
conx.on('message', function(){
  try {
    plugin.onMessage.apply(plugin, arguments);
  } catch (error){
    console.error(error.message);
    console.error(error.stack);
  }
});
