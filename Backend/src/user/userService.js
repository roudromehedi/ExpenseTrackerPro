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
      userName: userDetails.userName,
      password: userDetails.password,
    });
    await userModelData.save();
    return true;
  } catch (error) {
    throw error;
  }
};

exports.findOne = async ({ userName, password }) => {
  try {
    const user = await userModel.findOne({ userName, password }).exec();
    return user;
  } catch (error) {
    console.error(error);
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
exports.addExpenseDBService = async (userId, expenseDetails) => {
  try {
    console.log("userId:", userId);
    console.log("expenseDetails:", expenseDetails);
    const result = await userModel.findByIdAndUpdate(
      userId,
      {
        $push: {
          expenses: {
            name: expenseDetails.expenseName,
            amount: expenseDetails.expenseAmount,
          },
        },
      },
      { new: true }
    );
    console.log("result:", result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
exports.getExpensesDBService = async (userId) => {
  try {
    console.log("userId:", userId);
    const user = await userModel.findById(userId);
    console.log("Expenses", user.expenses);
    return user.expenses;
  } catch (error) {
    throw error;
  }
};
exports.deleteExpenseDBService = async (userId, expenseId) => {
  try {
    const result = await userModel.findByIdAndUpdate(
      userId,
      {
        $pull: {
          expenses: { _id: expenseId },
        },
      },
      { new: true }
    );
    return result;
  } catch (error) {
    throw error;
  }
};
exports.editExpenseDBService = async (userId, expenseId, expenseDetails) => {
  try {
    const result = await userModel.findOneAndUpdate(
      { _id: userId, "expenses._id": expenseId },
      {
        $set: {
          "expenses.$.name": expenseDetails.expenseName,
          "expenses.$.amount": expenseDetails.expenseAmount,
        },
      },
      { new: true }
    );
    return result;
  } catch (error) {
    throw error;
  }
};
