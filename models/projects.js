const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let projectSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    position: { type: String },
    title: { type: String },
    size: { type: Number },
    duration: { type: String },
    description: { type: String },
    technologies: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('projects', projectSchema);
