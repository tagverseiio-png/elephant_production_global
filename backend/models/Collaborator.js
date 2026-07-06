const mongoose = require('mongoose');

const collaboratorSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  type:  { type: String, required: true }, // e.g. 'DISTRIBUTOR / GLOBAL'
  logo:  { type: String },                 // optional logo URL
  url:   { type: String },                 // optional website link
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Collaborator', collaboratorSchema);
