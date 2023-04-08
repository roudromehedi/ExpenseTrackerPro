<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card flat class="elevation-12">
              <v-row class="fill-height">
                <v-col cols="12" md="4" class="teal accent-4">
                  <v-card-text class="white--text mt-12">
                    <img
                      src="./logo.png"
                      alt="Logo"
                      style="
                        display: block;
                        margin: 0 auto;
                        width: 200px;
                        height: 200px;
                      "
                    />
                    <h1 class="text-center display-1 mt-5">Welcome Back!</h1>
                    <h5 class="text-center">
                      To Keep connected with us please login with your personnel
                      info
                    </h5>
                  </v-card-text>

                  <div class="text-center mt-5">
                    <v-btn rounded outlined dark @click="toLogin"
                      >Sign in</v-btn
                    >
                  </div>
                </v-col>

                <v-col cols="12" md="8">
                  <v-card-text class="mt-12">
                    <h1 class="text-center display-2 teal--text text--accent-4">
                      Create Account
                    </h1>
                    <div class="text-center mt-4">
                      <v-btn class="mx-2" fab color="black" outlined>
                        <v-icon>mdi mdi-google</v-icon>
                      </v-btn>

                      <v-btn class="mx-2" fab color="black" outlined>
                        <v-icon>mdi mdi-facebook</v-icon>
                      </v-btn>
                      <v-btn class="mx-2" fab color="black" outlined>
                        <v-icon>mdi mdi-linkedin</v-icon>
                      </v-btn>
                    </div>
                    <h4 class="text-center mt-4">
                      Ensure your email for registration
                    </h4>
                    <v-form>
                      <v-text-field
                        v-model="user.userName"
                        label="User Name"
                        prepend-icon="mdi mdi-account-circle"
                        type="text"
                        color="teal accent-4"
                        :rules="[(v) => !!v || 'Name is required']"
                        required
                      />
                      <v-text-field
                        label="Password"
                        prepend-icon="mdi mdi-form-textbox-password"
                        color="teal accent-4"
                        v-model="user.password"
                        type="password"
                        :rules="[(v) => !!v || 'Password is required']"
                        required
                      />

                      <v-text-field
                        label="First Name"
                        prepend-icon="mdi mdi-account-box-multiple"
                        color="teal accent-4"
                        v-model="user.firstName"
                        :rules="[(v) => !!v || 'First name is required']"
                        required
                      />
                      <v-text-field
                        id="password"
                        label="Last Name"
                        prepend-icon="mdi mdi-account-box-multiple"
                        color="teal accent-4"
                        v-model="user.lastName"
                        :rules="[(v) => !!v || 'Last name is required']"
                        required
                      />
                      <v-text-field
                        label="Age"
                        prepend-icon="mdi mdi-stairs"
                        name="password"
                        color="teal accent-4"
                        v-model="user.age"
                        :rules="[(v) => !!v || 'Age is required']"
                        required
                      />
                      <div class="ml-auto d-flex justify-content-center">
                        <v-btn
                          class="ml-auto mr-auto"
                          text-center
                          mt-n5
                          rounded
                          color="teal accent-4"
                          dark
                          type="submit"
                          @click="register"
                        >
                          Register
                        </v-btn>
                      </div>
                    </v-form>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Vue from "vue";
import axios from "axios";

Vue.use(axios);

export default {
  name: "UserCrud",
  data() {
    return {
      loginData: {
        userName: "",
        password: "",
      },

      result: {},
      user: {
        _id: "",
        userName: "",
        password: "",
        firstName: "",
        lastName: "",
        age: "",
      },
    };
  },
  props: {
    source: String,
  },
  created() {
    this.UserLoad();
  },
  mounted() {
    console.log("mounted() called.......");
  },

  methods: {
    UserLoad() {
      var page = "http://localhost:8000/user/getAll";
      axios.get(page).then(({ data }) => {
        console.log(data);
        this.result = data.data;
      });
    },

    register() {
      if (this.user._id == "") {
        this.saveData();
      } else {
        this.updateData();
      }
    },
    saveData() {
      // Check that all required fields are set
      if (!this.user.userName || !this.user.password) {
        alert("Please fill in all required fields.");
        return;
      }

      axios.post("http://localhost:8000/user/create", this.user).then(() => {
        alert("Registration successful!");
        this.UserLoad();
      });
    },

    edit(user) {
      this.user = user;
    },
    updateData() {
      var editrecords = "http://localhost:8000/user/update/" + this.user._id;
      axios.patch(editrecords, this.user).then(() => {
        this.user.name = "";
        (this.user.address = ""), (this.user.phone = "");
        this.id = "";
        alert("Updated!!!");
        this.UserLoad();
      });
    },

    remove(user) {
      var url = `http://localhost:8000/user/delete/${user._id}`;
      axios.delete(url);
      alert("Deleteddd");
      this.UserLoad();
    },
    toLogin() {
      this.$router.push("/login");
    },
  },
  async login() {
    try {
      const response = await axios.post("http://localhost:8000/user/login", {
        userName: this.loginData.userName,
        password: this.loginData.password,
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
};
</script>
