const InfusionSchema = require('../schema/InfusionSchema')

module.exports = async (DateOfInfusion,UserID,Factor,ReasonForTreatment,QuantityInfuse,InfusionSite) => {
    try{
        const DateCreated = new Date()
        await InfusionSchema.insertMany({
            DateOfInfusion,
            UserID,
            Factor,
            ReasonForTreatment,
            QuantityInfuse,
            InfusionSite,
            DateCreated
        })
        return true
    }
    catch(err){
        return false
    }
} 