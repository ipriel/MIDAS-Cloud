var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  auth_id: { kind: String, value: String },
  mirrors: [{ type: Schema.Types.ObjectId, ref: 'Mirror' }],
  devices: [{
    _id: String,
    mac: String,
    name: String,
    paired: Boolean
  }],
  services: [{ type: Schema.Types.ObjectId, ref: 'Service' }]
});

module.exports = mongoose.model('User', userSchema);