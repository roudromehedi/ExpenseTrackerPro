<template>
  <div>
    <v-card>
      <v-card-title class="headline"
        >{{ loggedInUser }}'s Expense Tracker Dashboard</v-card-title
      >
      <v-card-text>
        <!-- Form for adding new expenses -->
        <v-form>
          <v-text-field v-model="newExpense.name" label="Name"></v-text-field>
          <v-text-field
            v-model="newExpense.amount"
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
    expenses: [
      { name: "Rent", amount: 1000 },
      { name: "Groceries", amount: 200 },
      { name: "Gas", amount: 50 },
    ],
    newExpense: {
      name: "",
      amount: "",
    },
    loggedInUser: "", // new data property
  }),
  methods: {
    addExpense() {
      // Add new expense to the expenses array
      this.expenses.push({ ...this.newExpense });
      // Clear form fields
      this.newExpense.name = "";
      this.newExpense.amount = "";
    },
  },
  mounted() {
    this.loggedInUser = this.$route.query.userName;
  },
};
</script>
