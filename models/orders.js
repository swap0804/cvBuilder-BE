const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let orderSchema = new Schema(
  {
    name: { type: String },
    discount: { type: Number },
    type: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('order', orderSchema);
