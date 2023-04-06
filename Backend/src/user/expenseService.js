const expenseModel = require("./expenseModel");

exports.getDataFromDBService = async () => {
  try {
    const result = await expenseModel.find({});
    return result;
  } catch (error) {
    throw error;
  }
};

exports.createUserDBService = async (userDetails) => {
  try {
    const expenseModelData = new expenseModel({
      userName: userDetails.userName,
      password: userDetails.password,
    });
    await expenseModelData.save();
    return true;
  } catch (error) {
    throw error;
  }
};

exports.updateUserDBService = async (id, userDetails) => {
  try {
    const result = await expenseModel.findByIdAndUpdate(id, userDetails, {
      new: true,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

exports.removeUserDBService = async (id) => {
  try {
    const result = await expenseModel.findByIdAndDelete(id);
    return result;
  } catch (error) {
    throw error;
  }
};
