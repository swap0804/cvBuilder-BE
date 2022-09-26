const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let orderDetailSchema = new Schema(
  {
    orderId: { type: Schema.Types.ObjectId, ref: 'order', required: true },
    item: { type: String },
    price: { type: Number },
    qty: { type: Number },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('order-detail', orderDetailSchema);
