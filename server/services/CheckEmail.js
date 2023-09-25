const AccountSchema = require('../schema/AccountSchema');

module.exports = async (Email) => {
  try {
    const results = await AccountSchema.find({"Email": Email})
    return results
  } catch (err) {
    return []
  }
}