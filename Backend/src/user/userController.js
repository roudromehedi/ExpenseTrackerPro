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
        userId: user.id,
        userName: user.userName,
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

module.exports = {
  getDataControllerfn,
  createUserControllerFn,
  updateUserController,
  deleteUserController,
  loginUserControllerfn,
};
