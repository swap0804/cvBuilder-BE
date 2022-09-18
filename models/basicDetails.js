const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let basicSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String },
    email: { type: String },
    phone: { type: Number },
    title: { type: String },
    address: { type: String },
    state: { type: String },
    city: { type: String },
    pincode: { type: Number },
    intro: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('basicDetails', basicSchema);
