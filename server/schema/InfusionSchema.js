const mongoose = require('mongoose')
const Schema =  mongoose.Schema

const InfusionSchema = new Schema({
      DateOfInfusion: {
        type: Date,
        required: true
      },
      UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'account',
        required: true
      },
      Factor:{
        FactorManufacturer: {
          type: String,
          require: true
        },
        LotNumber: {
          type: String,
          require: true
        },
        ExpirationDate: {
          type: Date,
          require: true
        }
      },
      ReasonForTreatment: {
        type: String,
        required: true
      },
      QuantityInfuse: {
        type: String,
        required: true
      },
      InfusionSite: {
        type: String,
        required: true
      },
      DateCreated: {
        type: Date,
        required: true
      }
})

module.exports = mongoose.model('infusion', InfusionSchema)