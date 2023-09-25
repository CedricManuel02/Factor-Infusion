const InfusionSchema = require('../schema/InfusionSchema')

module.exports = async (_id, UserID) => {
    try{
        const response = await InfusionSchema.find({$and: [
            { _id: _id },
            { UserID: UserID }
        ]})
        return response
    }
    catch(err){
        return []
    }
} 