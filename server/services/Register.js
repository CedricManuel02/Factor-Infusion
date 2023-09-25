const AccountSchema = require('../schema/AccountSchema')

module.exports = async (FullName, Email, Password, Diagnosis, isVerified, DateCreated) => {
    try{
        await AccountSchema.insertMany({FullName,Email,Password,Diagnosis,isVerified,DateCreated})
        return true
    } 
    catch(err){
        return false
    }
} 