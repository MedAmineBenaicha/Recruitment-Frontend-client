<template>
  <section>
    <div class="container mt-5 pt-5">
      <div class="mx-auto forgot-password-container py-5">
        <h5 class="modal-title text-center mb-3">Enter new Password</h5>
        <!-- loading spinner -->
        <div class="col-12 mx-auto py-4" v-if="true">
          <clip-loader
            :loading="true"
            :color="color"
            :size="size"
          ></clip-loader>
        </div>
        <form action="" method="" class="formConnexion pb-2 py-5 px-5">
          <!-- Success Message -->
          <div
            class="alert alert-success py-3 text-center"
            v-if="success_message"
          >
            {{ success_message }}
          </div>
          <!-- Error Message -->
          <div class="alert alert-danger py-3 text-center" v-if="error_message">
            {{ error_message }}
          </div>
          <!-- email -->
          <div class="form-group mb-4">
            <label for="exampleInputEmail1">
              <i class="fas fa-envelope mr-2"></i> Your Email :
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
          <!-- code verification -->
          <div class="form-group mb-4">
            <label for="exampleInputEmail1">
              <i class="fas fa-mask mr-2"></i> Verification Code :
            </label>
            <input
              type="number"
              class="form-control input-lg"
              :class="validationForVerificationCode"
              placeholder="Enter verification code"
              v-model="codeVerification"
            />
            <!-- If the errors is empty -->
            <div v-if="!validationVerificationCode" class="valid-feedback">
              Looks good!
            </div>
            <!-- If the errors is full -->
            <div v-if="validationVerificationCode" class="invalid-feedback">
              <span
                class="d-block"
                v-for="(error, index) in verificationCodeErrors"
                :key="index"
              >
                {{ error }}
              </span>
            </div>
          </div>

          <!-- New Password -->
          <div class="form-group mb-4">
            <label for="exampleInputEmail1">
              <i class="fas fa-lock mr-2"></i> New Password :
            </label>
            <input
              type="password"
              class="form-control input-lg"
              :class="validationForPassword"
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

          <!-- Confirm Password -->
          <div class="form-group mb-4">
            <label for="exampleInputEmail1">
              <i class="fas fa-lock mr-2"></i> Confirm Password :
            </label>
            <input
              type="password"
              class="form-control input-lg"
              :class="validationForConfirmPassword"
              v-model="confirmPassword"
            />
            <!-- If the errors is empty -->
            <div v-if="!validationConfirmPassword" class="valid-feedback">
              Looks good!
            </div>
            <!-- If the errors is full -->
            <div v-if="validationConfirmPassword" class="invalid-feedback">
              <span
                class="d-block"
                v-for="(error, index) in confirmPasswordErrors"
                :key="index"
              >
                {{ error }}
              </span>
            </div>
          </div>
          <!-- button submit -->
          <div class="d-flex align-items-center mt-4">
            <button
              @click.prevent="resetPassword"
              class="btn btn-primary btn-submit mx-auto"
            >
              <i class="fas fa-sign-in-alt mr-2"></i> Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null,
      codeVerification: null,
      confirmPassword: null,
      success_message: null,
      error_message: null,
      isLoading: false,
      /* data for validation */
      emailErrors: [],
      verificationCodeErrors: [],
      passwordErrors: [],
      confirmPasswordErrors: [],

      validationForEmail: null,
      validationForVerificationCode: null,
      validationForPassword: null,
      validationForConfirmPAssword: null,
    };
  },
  computed: {
    /* computed methods for validation */
    validationEmail() {
      return this.emailErrors.length > 0 ? true : false;
    },
    validationVerificationCode() {
      return this.verificationCodeErrors.length > 0 ? true : false;
    },
    validationPassword() {
      return this.passwordErrors.length ? true : false;
    },
    validationConfirmPassword() {
      return this.confirmPasswordErrors.length ? true : false;
    },
  },
  methods: {
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

    validVerificationCode: function() {
      this.verificationCodeErrors = [];

      if (!this.codeVerification) {
        this.verificationCodeErrors.push("You must put verification Code");
      }
      if (isNaN(this.codeVerification)) {
        this.verificationCodeErrors.push("Verification Code is Only numbers");
      }
      this.validationForVerificationCode = this.verificationCodeErrors.length
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
      // var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      // if (!re.test(this.password)) {
      //   this.passwordErrors.push("password must have a valid format");
      // }

      this.validationForPassword = this.passwordErrors.length
        ? "is-invalid"
        : "is-valid";
    },
    validConfirmPassword: function() {
      this.confirmPasswordErrors = [];

      if (!this.confirmPassword) {
        this.confirmPasswordErrors.push("Confirm Password should not be empty");
      }
      if (this.confirmPassword != this.password) {
        this.confirmPasswordErrors.push("Passwords are not matched");
      }
      /**
       *  this code will be available after update all users passsword
       */
      // var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      // if (!re.test(this.password)) {
      //   this.passwordErrors.push("password must have a valid format");
      // }

      this.validationForConfirmPassword = this.confirmPasswordErrors.length
        ? "is-invalid"
        : "is-valid";
    },
    resetPassword() {
      this.error_message = null;
      this.isLoading = true;

      /**
       *  Call the validation methods Before send data to backend
       */
      this.validEmail();
      this.validVerificationCode();
      this.validPassword();
      this.validConfirmPassword();

      /**
       * Return if the errors is here
       */
      if (
        this.emailErrors.length ||
        this.verificationCodeErrors.length ||
        this.passwordErrors.length ||
        this.confirmPasswordErrors.length
      ) {
        this.isLoading = false;
        return;
      }

      const resetData = new FormData();
      resetData.append("email", this.email);
      resetData.append("verification_code", parseInt(this.codeVerification));
      resetData.append("password", this.password);

      this.$store
        .dispatch("resetPassword", resetData)
        .then(() => {
          this.isLoading = false;
          this.success_message = "Password is changed successfully";
          setTimeout(
            function() {
              this.$router.push("/home");
            }.bind(this),
            4000
          );
        })
        .catch((error) => {
          this.isLoading = false;
          this.error_message = "something wet wrong! Try again";
          console.log(error);
        });
    },
  },
  mounted() {
    this.email = this.$route.params.email;
  },
};
</script>

<style scoped>
section {
  background-color: #f0f4f8;
}
.forgot-password-container {
  max-width: 540px;
  background-color: #fff;
  border-radius: 10px;
}
.modal-title {
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
</style>
