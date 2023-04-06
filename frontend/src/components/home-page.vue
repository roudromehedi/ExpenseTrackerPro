<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <h2 class="text-center">User Registration Portal MONGO</h2>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="register">
              <v-text-field
                v-model="user.userName"
                label="User Name"
                :rules="[(v) => !!v || 'Name is required']"
                required
              ></v-text-field>

              <v-text-field
                v-model="user.password"
                label="Password"
                :rules="[(v) => !!v || 'Address is required']"
                required
              ></v-text-field>

              <v-btn type="submit" color="primary">Register</v-btn>
            </v-form>
            <v-btn type="submit" color="primary" @click="toLogin"
              >Login Now</v-btn
            >
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Password</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in result" :key="index">
                <td>{{ user.userName }}</td>
                <td>{{ user.password }}</td>
                <td class="text-right">
                  <v-btn color="warning" class="mr-2" @click="edit(user)">
                    Edit
                  </v-btn>
                  <v-btn color="error" @click="remove(user)">Delete</v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";
import axios from "axios";

Vue.use(axios);

export default {
  name: "UserCrud",
  data() {
    return {
      result: {},
      user: {
        _id: "",
        userName: "",
        password: "",
      },
    };
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
};
</script>
