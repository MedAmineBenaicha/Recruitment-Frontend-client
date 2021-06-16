<template>
  <div
    class="modal"
    @click.self="closeRegisterModal"
    id="connexionModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    :class="showRegister ? 'show' : ''"
    :style="
      showRegister
        ? 'display:block; padding:17px; background-color:rgba(0,0,0,.65)'
        : 'display:none'
    "
    :aria-hidden="showRegister ? '' : 'true'"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header pb-0 pt-0">
          <button
            type="button"
            class="close btn-close"
            data-dismiss="modal"
            aria-label="Close"
            @click="closeRegisterModal"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body mx-1 pt-0 px-3">
          <h5 class="modal-title text-center mb-3">Join us Now</h5>
          <div
            class="alert-success text-center mb-3 px-4 py-2"
            v-if="success_message"
          >
            {{ success_message }}
          </div>
          <div class="alert-dange text-center mb-3 px-4 py-2" v-if="error">
            {{ error }}
          </div>
          <form action="" method="" class="formConnexion pb-3">
            <div class="form-group mb-2">
              <label for="first-name">
                <i class="fas fa-user mr-2"></i> First Name :
              </label>
              <input
                type="text"
                class="form-control input-lg"
                :class="validationForFirstName"
                id="first-name"
                placeholder="Enter first name"
                v-model="firstName"
              />
              <!-- If the errors is empty -->
              <div v-if="!validationFirstName" class="valid-feedback">
                Looks good!
              </div>
              <!-- If the errors is full -->
              <div v-if="validationFirstName" class="invalid-feedback">
                <span
                  class="d-block"
                  v-for="(error, index) in firstNameErrors"
                  :key="index"
                >
                  {{ error }}
                </span>
              </div>
            </div>

            <div class="form-group mb-2">
              <label for="last-name">
                <i class="fas fa-user mr-2"></i> Last Name :
              </label>
              <input
                type="text"
                class="form-control input-lg"
                :class="validationForLastName"
                id="last-name"
                placeholder="Enter last name"
                v-model="lastName"
              />
              <!-- If the errors is empty -->
              <div v-if="!validationLastName" class="valid-feedback">
                Looks good!
              </div>
              <!-- If the errors is full -->
              <div v-if="validationLastName" class="invalid-feedback">
                <span
                  class="d-block"
                  v-for="(error, index) in lastNameErrors"
                  :key="index"
                >
                  {{ error }}
                </span>
              </div>
            </div>

            <!-- email -->
            <div class="form-group mb-4">
              <label for="exampleInputEmail1">
                <i class="fas fa-envelope mr-2"></i> Votre Email :
              </label>
              <input
                type="email"
                class="form-control input-lg"
                :class="validationForEmail"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                v-model="email"
              />
              <!-- If the errors is empty -->
              <div v-if="!validationEmail" class="valid-feedback">
                Looks good!
              </div>
              <!-- If the errors is full -->
              <div v-if="validationEmail" class="invalid-feedback">
                <span
                  class="d-block"
                  v-for="(error, index) in emailErrors"
                  :key="index"
                >
                  {{ error }}
                </span>
              </div>
            </div>

            <!-- Password -->
            <div class="form-group">
              <label for="exampleInputPassword1">
                <i class="fas fa-lock mr-2"></i> Votre Mot de Passe :
              </label>
              <input
                type="password"
                class="form-control"
                :class="validationForPassword"
                id="exampleInputPassword1"
                placeholder="Password"
                v-model="password"
              />
              <!-- If the errors is empty -->
              <div v-if="!validationPassword" class="valid-feedback">
                Looks good!
              </div>
              <!-- If the errors is full -->
              <div v-if="validationPassword" class="invalid-feedback">
                <span
                  class="d-block"
                  v-for="(error, index) in passwordErrors"
                  :key="index"
                >
                  {{ error }}
                </span>
              </div>
            </div>
            <!-- Phone Number -->
            <div class="form-group mb-2">
              <label for="phone-number">
                <i class="fas fa-user mr-2"></i> Phone Number :
              </label>
              <input
                type="text"
                class="form-control input-lg"
                :class="validationForPhoneNumber"
                id="phone-number"
                placeholder="Enter phone number"
                v-model="phoneNumber"
              />
              <!-- If the errors is empty -->
              <div v-if="!validationPhoneNumber" class="valid-feedback">
                Looks good!
              </div>
              <!-- If the errors is full -->
              <div v-if="validationPhoneNumber" class="invalid-feedback">
                <span
                  class="d-block"
                  v-for="(error, index) in phoneNumberErrors"
                  :key="index"
                >
                  {{ error }}
                </span>
              </div>
            </div>

            <div class="d-flex align-items-center mt-4">
              <button
                @click.prevent="registrationPerform"
                class="btn btn-primary btn-submit mx-auto"
              >
                <i class="fas fa-sign-in-alt mr-2"></i> Register
              </button>
            </div>
            <!-- loading spinner -->
            <div class="my-3 text-center" v-if="isLoading">
              <pulse-loader :loading="isLoading"></pulse-loader>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
export default {
  components: {
    PulseLoader,
  },
  props: ['show'],
  data() {
    return {
      /* Login modal && registration modal */
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      phoneNumber: null,
      isLoading: false,
      error: null,
      success_message: null,
      /* data for validation */
      firstNameErrors: [],
      lastNameErrors: [],
      emailErrors: [],
      passwordErrors: [],
      phoneNumberErrors: [],
      validationForFirstName: null,
      validationForLastName: null,
      validationForEmail: null,
      validationForPassword: null,
      validationForPhoneNumber: null,
    };
  },
  computed: {
     showRegister(){
         return this.show;
     }, 
    /* computed methods for validation */
    validationFirstName() {
      return this.firstNameErrors.length ? true : false;
    },
    validationLastName() {
      return this.lastNameErrors.length ? true : false;
    },
    validationEmail() {
      return this.emailErrors.length ? true : false;
    },
    validationPhoneNumber() {
      return this.phoneNumberErrors.length ? true : false;
    },
    emailStatus() {
      return this.email ? true : false;
    },
    passwordStatus() {
      return this.password ? true : false;
    },
    validationPassword() {
      return this.passwordErrors.length ? true : false;
    },
  },
  methods: {
    /**
     *  Method to validate First Name
     */
    validFirstName: function() {
      console.log("valid first Name ? ");
      this.firstNameErrors = [];

      if (!this.firstName) {
        this.firstNameErrors.push("First Name should not be empty");
      }
      if (this.firstName.length < 4) {
        this.firstNameErrors.push("First Name must be more than 4 characters");
      }

      this.validationForFirstName = this.firstNameErrors.length
        ? "is-invalid"
        : "is-valid";
    },
    /**
     *  Method to validate Last Name
     */
    validLastName: function() {
      this.lastNameErrors = [];

      if (!this.lastName) {
        this.lastNameErrors.push("Last Name should not be empty");
      }
      if (this.lastName.length < 4) {
        this.lastNameErrors.push("Last Name must be more than 4 characters");
      }

      this.validationForLastName = this.lastNameErrors.length
        ? "is-invalid"
        : "is-valid";
    },

    /**
     *  Method to validate Email
     */
    validEmail: function() {
      this.emailErrors = [];

      if (!this.email) {
        this.emailErrors.push("Email should not be empty");
      }
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(this.email)) {
        this.emailErrors.push("Email must have a valid format");
      }
      this.validationForEmail = this.emailErrors.length
        ? "is-invalid"
        : "is-valid";
    },

    /**
     *  Method to validate Email
     */
    validPassword: function() {
      this.passwordErrors = [];

      if (!this.password) {
        this.passwordErrors.push("Password should not be empty");
      }
      /**
       *  this code will be available after update all users passsword
       */
      var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      if (!re.test(this.password)) {
        this.passwordErrors.push("password must have a valid format");
      }

      this.validationForPassword = this.passwordErrors.length
        ? "is-invalid"
        : "is-valid";
    },

    /**
     *  Method to validate Phone Number
     */
    validPhoneNumber: function() {
      this.phoneNumberErrors = [];

      if (!this.phoneNumber) {
        this.phoneNumberErrors.push("Phone Number should not be empty");
      }
      if (this.phoneNumber.length != 10) {
        this.phoneNumberErrors.push("Phone Number must be 10 numbers");
      }

      this.validationForPhoneNumber = this.phoneNumberErrors.length
        ? "is-invalid"
        : "is-valid";
    },
    /**
     *  Register new User ==> Add user
     */
    registrationPerform() {
      console.log("appel Registration");
      this.error = null;
      this.isLoading = true;

      /**
       *  Call the validation methods Before send data to backend
       */
      this.validFirstName();
      this.validLastName();
      this.validEmail();
      this.validPassword();
      this.validPhoneNumber();

      /**
       *    Return if the errors is here
       */
      if (
        this.firstNameErrors.length ||
        this.lastNameErrors.length ||
        this.emailErrors.length ||
        this.passwordErrors.length ||
        this.phoneNumberErrors.length
      ) {
        this.isLoading = false;
        return;
      }

      const formData = new FormData();

      formData.append("first_name", this.firstName);
      formData.append("last_name", this.lastName);
      formData.append("email", this.email);
      formData.append("password", this.password);
      formData.append("phone_number", this.phoneNumber);

      this.$store
        .dispatch("registrationPerform", formData)
        .then((res) => {
          this.isLoading = false;
          console.log("Registration Done");
          console.log(res.data);
          this.success_message = "Client has been added succesfully";
        })
        .catch((error) => {
          this.isLoading = false;
          console.log(error);
          this.error = "Registration Failed";
        });
    },
    /**
     *     close the model
     */
    closeRegisterModal() {
      this.freeForms();
      this.showRegister = false;
    },
  },
};
</script>

<style scoped>
/**
  * Modal
 */
#connexionModal .modal-content {
  border-radius: 4px;
}
#connexionModal .modal-dialog {
  max-width: 400px;
}
#connexionModal .modal-header {
  border-bottom: none;
}
#connexionModal .modal-title {
  color: #253246;
  font-weight: bold;
  font-family: "GiltroyRegular" sans-serif;
}
.formConnexion label {
  color: #788291;
  font-size: 16px;
  margin-left: 10px;
  font-family: "GiltroyRegular" sans-serif;
}
.formConnexion-link {
  color: #06adef;
  font-size: 16px;
  font-family: "GiltroyRegular" sans-serif;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.01;
}
.formConnexion-link:hover {
  color: #06adef;
}

.btn-submit {
  border-color: #3dad45;
  padding: 10px 35px;
  background-color: #50c058 !important;
  color: #fff;
  font-weight: 550;
}
.btn-submit:hover {
  border-color: #3dad45;
}
.btn-close {
  font-size: 42px;
  font-weight: 400;
  color: #ff3259;
}
.btn-close:hover {
  color: #fe0030;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
hr {
  color: gray;
  width: 70%;
  border-top: 1px solid rgba(37, 35, 35, 0.21);
}
.register-link a {
  color: #545353 !important;
  font-size: 17px;
  text-decoration: none;
}
.register-link span {
  color: #3dad45;
}
</style>
