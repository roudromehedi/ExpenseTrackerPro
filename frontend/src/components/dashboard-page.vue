<template>
  <div>
    <v-card>
      <v-card-title class="headline"
        >{{ loggedInUser.loggedInUser }}'s Expense Tracker
        Dashboard</v-card-title
      >
      <v-card-text>
        <!-- Form for adding new expenses -->
        <v-form>
          <v-text-field
            v-model="newExpense.expenseName"
            label="Name"
          ></v-text-field>
          <v-text-field
            v-model="newExpense.expenseAmount"
            label="Amount"
          ></v-text-field>
          <v-date-picker
            v-model="newExpense.expenseDate"
            label="Date"
            format="YYYY-MM-DD"
          ></v-date-picker>
          <v-btn color="primary" @click="addExpense">Add Expense</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
    <!-- Table for displaying existing expenses -->
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Amount</th>
            <th class="text-left">Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in expenses" :key="index">
            <td>{{ user.name }}</td>
            <td>{{ user.amount }}</td>
            <td>{{ user.expenseDate }}</td>

            <td class="text-right">
              <v-btn color="warning" class="mr-2" @click="edit(user.id)">
                Edit
              </v-btn>
              <v-btn color="error" @click="remove(user._id)">Delete</v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import { format } from "date-fns";

import axios from "axios";
export default {
  data: () => ({
    headers: [
      { text: "Name", value: "name" },
      { text: "Amount", value: "amount" },
    ],
    expenses: [],
    newExpense: {
      userId: "",
      expenseName: "",
      expenseAmount: "",
      expenseDate: null,
    },
    loggedInUser: "", // new data property
    userId: "",
    selectedExpense: null,
  }),
  created() {
    this.loadExpenses(this.userId);
  },
  methods: {
    formatDate(date) {
      return format(new Date(date), "yyyy-MM-dd");
    },
    async addExpense() {
      try {
        if (this.selectedExpense !== null) {
          // Make API call to update expense
          const response = await fetch(
            `http://localhost:8000/user/${this.userId}/editExpense/${this.selectedExpense._id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                expenseName: this.newExpense.expenseName,
                expenseAmount: this.newExpense.expenseAmount,
                expenseDate: this.newExpense.expenseDate,
              }),
            }
          );

          const result = await response.json();

          if (result.status === true) {
            // Update existing expense in the expenses array
            const index = this.expenses.findIndex(
              (expense) => expense._id === this.selectedExpense._id
            );
            if (index >= 0) {
              this.expenses[index].expenseName = this.newExpense.expenseName;
              this.expenses[index].expenseAmount =
                this.newExpense.expenseAmount;
              this.expenses[index].expenseDate = this.newExpense.expenseDate;
            }
            // Clear form fields and selected expense
            this.newExpense.expenseName = "";
            this.newExpense.expenseAmount = "";
            this.newExpense.expenseDate = "";
            this.selectedExpense = null;
          } else {
            alert(result.message);
          }
        } else {
          // Make API call to add expense
          const response = await fetch(
            `http://localhost:8000/user/${this.userId}/addExpense`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                expenseName: this.newExpense.expenseName,
                expenseAmount: this.newExpense.expenseAmount,
                expenseDate: this.newExpense.expenseDate,
                userId: this.userId,
              }),
            }
          );

          const result = await response.json();

          if (result.status === true) {
            // Add new expense to the expenses array
            this.expenses.push({ ...this.newExpense });
            // Clear form fields
            this.newExpense.expenseName = "";
            this.newExpense.expenseAmount = "";
          } else {
            alert(result.message);
          }
        }
      } catch (error) {
        console.error(error);
        alert("Error adding or updating expense");
      }
      console.log("Date:", this.newExpense.expenseDate);
      this.loadExpenses();
    },

    loadExpenses() {
      var url = `http://localhost:8000/user/${this.userId}/expenses`;
      axios.get(url).then(({ data }) => {
        console.log("Loded Expenses", data);
        this.expenses = data.data;
        console.log("Page data", url);
      });
    },

    remove(expense) {
      var url = `http://localhost:8000/user/${this.userId}/deleteExpense/${expense}`;
      axios.delete(url);
      alert("Deleteddd");
      this.loadExpenses();
      console.log(expense);
    },
    edit(expense) {
      this.selectedExpense = { ...expense };
    },
  },
  mounted() {
    this.loggedInUser = this.$route.query;
    this.userId = this.loggedInUser.loggedInUserId;
    //this.expenses = this.loggedInUser.loggedInUserExpenses;
    console.log(this.expenses);
    this.loadExpenses(this.userId);
    // Fetch user's expenses
  },
};
</script>
