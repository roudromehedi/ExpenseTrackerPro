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
          <v-btn color="primary" @click="addExpense">Add Expense</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
    <!-- Table for displaying existing expenses -->
    <v-data-table :headers="headers" :items="expenses"></v-data-table>
  </div>
</template>

<script>
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
    },
    loggedInUser: "", // new data property
    userId: "",
  }),
  methods: {
    async addExpense() {
      try {
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
      } catch (error) {
        console.error(error);
        alert("Error adding expense");
      }
      console.log(this.loggedInUser.userId);
    },
  },
  mounted() {
    this.loggedInUser = this.$route.query;
    this.userId = this.loggedInUser.loggedInUserId;
    this.expenses = this.loggedInUser.loggedInUserExpenses;
    console.log(this.expenses);
    // Fetch user's expenses
  },
};
</script>
