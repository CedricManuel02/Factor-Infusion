const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AccountSchema = new Schema({
      FullName: {
        type: String,
        required: true
      },
      Email: {
        type: String,
        required: true
      },
      Password: {
        type: String,
        required: true
      },
      Diagnosis:{
        Hemophilia: {
          type: String,
          require: true
        },
        Severity: {
          type: String,
          require: true
        },
        HasInhibitor: {
          type: String,
          require: true
        }
      },
      isVerified:{
        type: Boolean,
        required: true
      },
      DateCreated: {
        type: Date,
        required: true
      }

})
module.exports = mongoose.model('account', AccountSchema)
