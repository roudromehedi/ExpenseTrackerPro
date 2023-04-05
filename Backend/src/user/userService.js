const userModel = require("./userModel");

exports.getDataFromDBService = async () => {
  try {
    const result = await userModel.find({});
    return result;
  } catch (error) {
    throw error;
  }
};

exports.createUserDBService = async (userDetails) => {
  try {
    const userModelData = new userModel({
      name: userDetails.name,
      address: userDetails.address,
      phone: userDetails.phone,
    });
    await userModelData.save();
    return true;
  } catch (error) {
    throw error;
  }
};

exports.updateUserDBService = async (id, userDetails) => {
  try {
    const result = await userModel.findByIdAndUpdate(id, userDetails, {
      new: true,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

exports.removeUserDBService = async (id) => {
  try {
    const result = await userModel.findByIdAndDelete(id);
    return result;
  } catch (error) {
    throw error;
  }
};
