var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mirrorSchema = new Schema({
  sn: String,
  name: String,
  services: [{ type: Schema.Types.ObjectId, ref: 'Service' }]
});

module.exports = mongoose.model('Mirror', mirrorSchema);