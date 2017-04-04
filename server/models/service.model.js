var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var serviceSchema = new Schema({
  name: String,
  type: String,
  settings: [{
    name: String,
    val: Schema.Types.Mixed,
    type: String
  }]
});

module.exports = mongoose.model('Service', serviceSchema);