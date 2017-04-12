var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var serviceSchema = new Schema({
  name: String,
  type: String,
  authorized: { type: Boolean, default: false },
  settings: [{
    name: String,
    val: Schema.Types.Mixed,
    type: String
  }]
});

module.exports = mongoose.model('Service', serviceSchema);