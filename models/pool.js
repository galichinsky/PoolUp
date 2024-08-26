const mongoose = require("mongoose");


const poolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  event: {
    type: String,
    required: true,
  },
  date: {
    type: Date, default: () => Date.now(),
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  review: {
    type: String,
    required: false,
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
})

const Pool = mongoose.model("Pool", poolSchema);
module.exports = Pool;