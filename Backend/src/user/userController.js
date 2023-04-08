const userService = require("./userService");

const getDataControllerfn = async (req, res) => {
  const employees = await userService.getDataFromDBService();
  res.send({ status: true, data: employees });
};

const loginUserControllerfn = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await userService.findOne({ userName, password });

    if (user) {
      // Handle successful login
      res.send({
        status: true,
        message: "Login successful",
        userId: user._id,
        userName: user.userName,
        password: user.password,
        expenses: user.expenses,
      });
    } else {
      // Handle login error
      res.send({ status: false, message: "Invalid email or password" });
    }
  } catch (error) {
    // Handle database error
    console.error(error);
    res.send({ status: false, message: "Database error" });
  }
};

const createUserControllerFn = async (req, res) => {
  const status = await userService.createUserDBService(req.body);
  if (status) {
    res.send({ status: true, message: "User created successfully" });
  } else {
    res.send({ status: false, message: "Error creating user" });
  }
};

const updateUserController = async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);

  const result = await userService.updateUserDBService(req.params.id, req.body);

  if (result) {
    res.send({ status: true, message: "User updated successfully" });
  } else {
    res.send({ status: false, message: "Error updating user" });
  }
};

const deleteUserController = async (req, res) => {
  console.log(req.params.id);
  const result = await userService.removeUserDBService(req.params.id);
  if (result) {
    res.send({ status: true, message: "User deleted successfully" });
  } else {
    res.send({ status: false, message: "Error deleting user" });
  }
};
const addExpenseController = async (req, res) => {
  const { userId, expenseName, expenseAmount, expenseDate } = req.body;
  console.log("Date", expenseDate);

  // Check that the request body is not empty
  if (!expenseName || !expenseAmount) {
    return res.send({ status: false, message: "Missing required fields" });
  }

  try {
    // Create a new Date object and pass in the expenseDate as a parameter
    const expenseDateTime = new Date(expenseDate);

    // Use the toLocaleString() method to convert the date to a localized string
    const modifiedExpenseDate = expenseDateTime.toLocaleString();

    const result = await userService.addExpenseDBService(userId, {
      expenseName: expenseName,
      expenseAmount: expenseAmount,
      expenseDate: modifiedExpenseDate,
    });
    res.send({
      status: true,
      message: "Expense added successfully",
      data: result,
    });
    console.log(result);
  } catch (error) {
    console.error(error);
    res.send({ status: false, message: "Error adding expense" });
  }
};

const getExpensesController = async (req, res) => {
  const { id } = req.params;
  console.log("controller user ID", this.id);
  try {
    const result = await userService.getExpensesDBService(id);
    if (result) {
      res.send({
        status: true,
        data: result,
        message: "Expense get successfully",
      });
    } else {
      res.send({ status: false, message: "Error get expense" });
    }
  } catch (error) {
    console.error(error);
    res.send({ status: false, message: "Database error" });
  }
};

const deleteExpenseController = async (req, res) => {
  const { id, expenseId } = req.params;
  console.log("delete id", this.id);

  try {
    const result = await userService.deleteExpenseDBService(id, expenseId);

    if (result) {
      res.send({ status: true, message: "Expense deleted successfully" });
    } else {
      res.send({ status: false, message: "Error deleting expense" });
    }
  } catch (error) {
    console.error(error);
    res.send({ status: false, message: "Database error" });
  }
};
const editExpenseController = async (req, res) => {
  const { userId, expenseId } = req.params;
  const { expenseName, expenseAmount } = req.body;

  // Check that the request body is not empty
  if (!expenseName || !expenseAmount) {
    return res.send({ status: false, message: "Missing required fields" });
  }

  try {
    const result = await userService.editExpenseDBService(userId, expenseId, {
      expenseName: expenseName,
      expenseAmount: expenseAmount,
    });
    res.send({
      status: true,
      message: "Expense updated successfully",
      data: result,
    });
    console.log(result);
  } catch (error) {
    console.error(error);
    res.send({ status: false, message: "Error updating expense" });
  }
};

module.exports = {
  getDataControllerfn,
  createUserControllerFn,
  updateUserController,
  deleteUserController,
  loginUserControllerfn,
  addExpenseController,
  getExpensesController,
  deleteExpenseController,
  editExpenseController,
};
