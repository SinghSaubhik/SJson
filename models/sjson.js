const mongoose = require('mongoose')

const jsonSchema = mongoose.Schema(
  {
    pid: String,
    jsonHost: Object
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('jsonSchema', jsonSchema)
