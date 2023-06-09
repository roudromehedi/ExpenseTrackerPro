var express = require("express");

const router = express.Router();

var userController = require("../src/user/userController");

router.route("/user/login").post(userController.loginUserControllerfn);

router.route("/user/getAll").get(userController.getDataControllerfn);

router.route("/user/create").post(userController.createUserControllerFn);

router.route("/user/update/:id").patch(userController.updateUserController);

router.route("/user/delete/:id").delete(userController.deleteUserController);
router.route("/user/:id/addExpense").post(userController.addExpenseController);
router
  .route("/user/:id/deleteExpense/:expenseId")
  .delete(userController.deleteExpenseController);
router
  .route("/user/:id/editExpense/:expenseId")
  .patch(userController.editExpenseController);
router.route("/user/:id/expenses").get(userController.getExpensesController);

module.exports = router;
