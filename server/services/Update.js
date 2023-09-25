const InfusionSchema = require('../schema/InfusionSchema')

module.exports = async (_id, set) => {
    try{
        
        await InfusionSchema.updateOne({ _id }, { $set: set })
        return true
    }
    catch(err){
        return false
    }
} 