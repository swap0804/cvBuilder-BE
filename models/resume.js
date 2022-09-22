const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let resumeSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    layout: { type: String, require: true },
    payment: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('resume', resumeSchema);
