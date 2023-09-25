const InfusionSchema = require('../schema/InfusionSchema')

module.exports = async (_id) => {
    try{
        await InfusionSchema.deleteOne({_id})
        return true
    }
    catch(err){
        return false
    }
} 