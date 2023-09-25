const InfusionSchema = require('../schema/InfusionSchema')

module.exports = async (UserID) => {
  try {
    const results = await InfusionSchema.find({"UserID": UserID})
    return results
  } catch (err) {
    return []
  }
}