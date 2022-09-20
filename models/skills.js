const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let skillSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    skills: [
      { name: { type: String, required: true }, percentage: { type: Number } },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('skills', skillSchema);
