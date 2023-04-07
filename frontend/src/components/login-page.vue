<template>
  <div class="login-container">
    <v-card class="login-card">
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field
            v-model="userName"
            label="User Name"
            type="text"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            required
          ></v-text-field>
          <v-btn type="submit" color="primary">Login</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      userName: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("http://localhost:8000/user/login", {
          userName: this.userName,
          password: this.password,
        });

        // Handle successful login response
        console.log("Logged in user:", response.data);

        // Redirect to the dashboard page
        this.$router.push({
          path: "/dashboard",
          query: {
            loggedInUser: response.data.userName,
            loggedInUserId: response.data.userId,
            loggedInUserExpenses: response.data.expenses,
          },
        });
      } catch (error) {
        // Handle login error
        console.error(error);
      }
    },
  },
};
</script>
<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-card {
  max-width: 900px;
  min-width: 600px;
  max-height: 700px;
}
</style>
