<template>
  <div>
    <v-container class="fill-height mt-3" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="8">
          <v-card class="elevation-12 px-10 py-10"
            ><div class="py-5 d-flex teal accent-4">
              <img
                src="./logo.png"
                alt="Logo"
                style="
                  display: block;
                  margin: 0 auto;
                  width: 50px;
                  height: 50px;
                "
              />
              <h2 class="text-center py-3 px-0 ml-auto mr-auto white--text">
                Dashboard
              </h2>
            </div>

            <v-card flat class="">
              <v-card-title class="headline px-0"
                >Hello {{ loggedInUser.loggedInUser }}!
              </v-card-title>
              <h5>Your total expense: {{ totalExpense.toFixed(2) }} €</h5>
              <v-form>
                <v-text-field
                  prepend-icon="mdi mdi-subtitles-outline"
                  v-model="newExpense.expenseName"
                  label="Expense Title"
                ></v-text-field>
                <v-text-field
                  prepend-icon="mdi mdi-cash-multiple"
                  v-model="newExpense.expenseAmount"
                  label="Amount"
                ></v-text-field>
                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="newExpense.expenseDate"
                      label="Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="newExpense.expenseDate"
                    color="teal accent-4"
                    scrollable
                    locale="en"
                    format="DD-MM-YYYY"
                  ></v-date-picker>
                </v-menu>
                <v-btn
                  class="ml-auto mr-auto"
                  text-center
                  mt-n5
                  rounded
                  color="teal accent-4"
                  dark
                  @click="addExpense"
                  >Add Expense</v-btn
                >
              </v-form>
            </v-card>
            <!-- Table for displaying existing expenses -->
            <div style="height: 300px; overflow-y: scroll">
              <div style="position: relative">
                <v-simple-table class="mt-5">
                  <thead style="position: sticky; top: 0">
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
                      <td>{{ user.amount.toFixed(2) }} €</td>
                      <td>{{ user.expenseDate }}</td>
                      <td class="text-right">
                        <v-icon
                          rounded
                          color="warning"
                          class="mr-2"
                          @click="edit(user.id)"
                        >
                          mdi mdi-square-edit-outline
                        </v-icon>
                        <v-icon rounded color="error" @click="remove(user._id)"
                          >mdi mdi-delete-circle</v-icon
                        >
                      </td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </div>
            </div>
          </v-card></v-col
        >
      </v-row>
    </v-container>
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
  computed: {
    totalExpense() {
      return this.expenses.reduce((acc, expense) => acc + expense.amount, 0);
    },
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
            `https://expensetrackerpro3.onrender.com/user/${this.userId}/editExpense/${this.selectedExpense._id}`,
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
            `https://expensetrackerpro3.onrender.com/user/${this.userId}/addExpense`,
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
      var url = `https://expensetrackerpro3.onrender.com/user/${this.userId}/expenses`;
      axios.get(url).then(({ data }) => {
        console.log("Loded Expenses", data);
        this.expenses = data.data;
        console.log("Page data", url);
      });
    },

    remove(expense) {
      var url = `https://expensetrackerpro3.onrender.com/user/${this.userId}/deleteExpense/${expense}`;
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
