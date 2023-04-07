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
  const { userId, expenseName, expenseAmount } = req.body;

  // Check that the request body is not empty
  if (!expenseName || !expenseAmount) {
    return res.send({ status: false, message: "Missing required fields" });
  }

  try {
    const result = await userService.addExpenseDBService(userId, {
      expenseName: expenseName,
      expenseAmount: expenseAmount,
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
  const expenses = await userService.getExpensesDBService(req.params.userId);
  res.send({ status: true, data: expenses });
};

module.exports = {
  getDataControllerfn,
  createUserControllerFn,
  updateUserController,
  deleteUserController,
  loginUserControllerfn,
  addExpenseController,
  getExpensesController,
};
