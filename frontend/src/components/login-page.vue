<template>
  <div class="login-container">
    <v-card class="login-card py-0 px-0 elevation-12">
      <v-row>
        <v-col sm="7" class="white"
          ><div class="px-5 py-5">
            <v-card-title>Login</v-card-title>
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
              <v-btn rounded outlined dark color="teal accent-4" type="submit"
                >Login</v-btn
              >
            </v-form>
          </div>
        </v-col>
        <v-col sm="5" class="teal accent-4 d-flex">
          <div class="mt-auto mb-auto">
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
