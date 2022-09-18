const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let workExpSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    position: { type: String },
    companyName: { type: String },
    joiningDate: { type: Date },
    leavingDate: { type: Date },
    ctc: { type: String },
    technologies: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('workExperience', workExpSchema);
