var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var serviceTemplateSchema = new Schema({
  type: String,
  description: String,
  auth_url: String,
  settings: [{
    name: String,
    val: Schema.Types.Mixed,
    type: String
  }]
});

module.exports = mongoose.model('ServiceTemplate', serviceTemplateSchema);