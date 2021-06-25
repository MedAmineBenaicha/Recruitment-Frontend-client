<template>
  <section class="pb-5">
    <div class="container mt-5 pt-5">
      <div class="mx-auto forgot-password-container py-5">
        <h5 class="modal-title text-center mb-3">Reset Password</h5>
        <!-- loading spinner -->
        <div class="col-12 mx-auto py-4" v-if="isLoading">
          <clip-loader
            :loading="isLoading"
            :color="color"
            :size="size"
          ></clip-loader>
        </div>
        <form action="" method="" class="formConnexion pb-2 px-5 py-3">
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
          <!-- button submit -->
          <div class="d-flex align-items-center mt-4">
            <button
              @click.prevent="resetPasswordRequest"
              class="btn btn-primary btn-submit mx-auto"
            >
              <i class="fas fa-sign-in-alt mr-2"></i> Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
  <Footer />
</template>

<script>
import Footer from "../../components/layout/Footer.vue";
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
export default {
  components: {
    ClipLoader,
    Footer,
  },
  data() {
    return {
      email: null,
      success_message: null,
      error_message: null,
      isLoading: false,
      /* data for validation */
      emailErrors: [],
      validationForEmail: null,
    };
  },
  computed: {
    validationEmail() {
      return this.emailErrors.length > 0 ? true : false;
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

    resetPasswordRequest() {
      this.error_message = null;
      this.isLoading = true;

      /**
       *  Call the validation methods Before send data to backend
       */
      this.validEmail();
      /**
       * Return if the errors is here
       */
      if (this.emailErrors.length) {
        this.isLoading = false;
        return;
      }

      const resetData = new FormData();
      resetData.append("email", this.email);

      this.$store
        .dispatch("resetPasswordRequest", resetData)
        .then(() => {
          this.isLoading = false;
          this.success_message = "Verificarion code was sent to your email";
          setTimeout(
            function() {
              this.$router.push("/password-reset/" + this.email);
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
