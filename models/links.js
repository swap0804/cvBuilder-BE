const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let linkSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    git: { type: 'String' },
    linkedIn: { type: 'String' },
    twitter: { type: 'String' },
    skype: { type: 'String' },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('links', linkSchema);
