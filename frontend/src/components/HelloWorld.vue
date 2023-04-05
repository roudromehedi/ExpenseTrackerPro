<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <h2 class="text-center">Employee Registration Portal MONGO</h2>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="save">
              <v-text-field
                v-model="employee.name"
                label="Employee Name"
                :rules="[(v) => !!v || 'Name is required']"
                required
              ></v-text-field>

              <v-text-field
                v-model="employee.address"
                label="Employee Address"
                :rules="[(v) => !!v || 'Address is required']"
                required
              ></v-text-field>

              <v-text-field
                v-model="employee.phone"
                label="Mobile"
                :rules="[
                  (v) => !!v || 'Phone is required',
                  (v) => /^[0-9]*$/.test(v) || 'Phone must be a valid number',
                ]"
                required
              ></v-text-field>

              <v-btn type="submit" color="primary">Save</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Address</th>
                <th class="text-left">Phone</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(employee, index) in result" :key="index">
                <td>{{ employee.name }}</td>
                <td>{{ employee.address }}</td>
                <td>{{ employee.phone }}</td>
                <td class="text-right">
                  <v-btn color="warning" class="mr-2" @click="edit(employee)">
                    Edit
                  </v-btn>
                  <v-btn color="error" @click="remove(employee)">Delete</v-btn>
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
  name: "EmployeeCrud",
  data() {
    return {
      result: {},
      employee: {
        _id: "",
        name: "",
        address: "",
        phone: "",
      },
    };
  },
  created() {
    this.EmployeeLoad();
  },
  mounted() {
    console.log("mounted() called.......");
  },

  methods: {
    EmployeeLoad() {
      var page = "http://localhost:8000/user/getAll";
      axios.get(page).then(({ data }) => {
        console.log(data);
        this.result = data.data;
      });
    },

    save() {
      if (this.employee._id == "") {
        this.saveData();
      } else {
        this.updateData();
      }
    },
    saveData() {
      // Check that all required fields are set
      if (
        !this.employee.name ||
        !this.employee.address ||
        !this.employee.phone
      ) {
        alert("Please fill in all required fields.");
        return;
      }

      axios
        .post("http://localhost:8000/user/create", this.employee)
        .then(() => {
          alert("saveddddd");
          this.EmployeeLoad();
        });
    },

    edit(employee) {
      this.employee = employee;
    },
    updateData() {
      var editrecords =
        "http://localhost:8000/user/update/" + this.employee._id;
      axios.patch(editrecords, this.employee).then(() => {
        this.employee.name = "";
        (this.employee.address = ""), (this.employee.phone = "");
        this.id = "";
        alert("Updated!!!");
        this.EmployeeLoad();
      });
    },

    remove(employee) {
      var url = `http://localhost:8000/user/delete/${employee._id}`;
      axios.delete(url);
      alert("Deleteddd");
      this.EmployeeLoad();
    },
  },
};
</script>
