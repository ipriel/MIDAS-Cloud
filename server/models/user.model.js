var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  auth_id: {
    kind: String,
    value: String
  },
  authorized: [{
    kind: String,
    status: { type: Boolean, default: false }
  }],
  mirrors: [{
    sn: String,
    name: String,
    services: [{ type: Schema.Types.ObjectId, ref: 'Service' }]
  }],
  devices: [{
    mac: String,
    name: String,
    paired: { type: Boolean, default: false }
  }],
  services: [{ type: Schema.Types.ObjectId, ref: 'Service' }]
});

module.exports = mongoose.model('User', userSchema);