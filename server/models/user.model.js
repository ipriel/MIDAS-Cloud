var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  _id: String,
  firstName: String,
  lastName: String,
  devices: [{ mac_address: String }],
  services: [{ service: Number,
               service_id: String }]
});

module.exports = mongoose.model('User', userSchema);