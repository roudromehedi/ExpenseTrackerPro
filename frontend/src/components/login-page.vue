<template>
  <div class="login-container">
    <v-card class="py-0 px-0 ml-5 mr-5 elevation-12">
      <v-row>
        <v-col cols="12" sm="4" md="8" class="white"
          ><div class="px-5 py-5">
            <v-card-title>Login</v-card-title>
            <v-form @submit.prevent="login">
              <v-text-field
                prepend-icon="mdi mdi-account-circle"
                v-model="userName"
                label="User Name"
                type="text"
                required
              ></v-text-field>
              <v-text-field
                prepend-icon="mdi mdi-form-textbox-password"
                v-model="password"
                label="Password"
                type="password"
                required
              ></v-text-field>
              <div class="ml-auto d-flex justify-content-center">
                <v-btn
                  class="ml-auto mr-auto"
                  text-center
                  rounded
                  outlined
                  dark
                  color="teal accent-4"
                  type="submit"
                  >Login</v-btn
                >
              </div>
            </v-form>
          </div>
        </v-col>
        <v-col sm="5" md="" class="teal accent-4 d-flex">
          <div class="mt-auto mb-auto ml-auto mr-auto">
            <div class="px-0 py-5">
              <h2 class="white--text text-center">
                Don't have a account?<br />Register Now!
              </h2>
            </div>

            <div class="text-center">
              <v-btn rounded outlined dark @click="toRegister">SIGN UP</v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
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
    toRegister() {
      this.$router.push("/");
    },
    async login() {
      try {
        const response = await axios.post(
          "https://expensetrackerpro3.onrender.com/user/login",
          {
            userName: this.userName,
            password: this.password,
          }
        );

        // Handle successful login response
        console.log("Logged in user:", response.data);

        // Redirect to the dashboard page
        this.$router.push({
          path: "/dashboard",
          query: {
            loggedInUser: response.data.userName,
            loggedInUserFirstName: response.data.firstName,
            loggedInUserLastName: response.data.lastName,
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
</style>
