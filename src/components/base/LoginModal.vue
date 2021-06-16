<template>
  <div
    class="modal"
    @click.self="closeModal"
    id="connexionModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    :class="showLogin ? 'show' : ''"
    :style="
      showLogin
        ? 'display:block; padding:17px; background-color:rgba(0,0,0,.65)'
        : 'display:none'
    "
    :aria-hidden="showLogin ? '' : 'true'"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header pb-0">
          <button
            type="button"
            class="close btn-close"
            data-dismiss="modal"
            aria-label="Close"
            @click="closeModal"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body mx-1 pt-0 px-3">
          <h5 class="modal-title text-center mb-3">Connexion</h5>
          <div
            class="alert-success text-center mb-3 px-4 py-2"
            v-if="success_message"
          >
            {{ success_message }}
          </div>
          <div class="alert-dange text-center mb-3 px-4 py-2" v-if="error">
            {{ error }}
          </div>
          <form action="" method="" class="formConnexion pb-2">
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
              <span class="d-block float-right">
                <a href="#" class="formConnexion-link mt-1"
                  >Mot de Passe oublié ?</a
                >
              </span>
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
            <div class="d-flex align-items-center mt-4">
              <button
                @click.prevent="loginPerform"
                class="btn btn-primary btn-submit mx-auto"
              >
                <i class="fas fa-sign-in-alt mr-2"></i> Se Connecter
              </button>
            </div>
          </form>
          <!-- loading spinner -->
          <div class="my-3 text-center" v-if="isLoading">
            <pulse-loader :loading="isLoading"></pulse-loader>
          </div>
          <hr class="mx-auto" />
          <div class="register-link text-center">
            <a href="#" @click="showRegisterModal"
              >Not registred ? <span>click here</span></a
            >
          </div>
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
  props:['show'],
  data() {
    return {
      showLogin: this.show,
      email: null,
      password: null,
      isLoading: false,
      error: null,
      success_message: null,
      emailErrors: [],
      passwordErrors: [],
      validationForEmail: null,
      validationForPassword: null,
    };
  },
  computed: {
    validationEmail() {
      return this.emailErrors.length ? true : false;
    },
    validationPassword() {
      return this.passwordErrors.length ? true : false;
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
    /**
     *  Login Method
     */
    loginPerform() {
      this.error = null;
      this.isLoading = true;

      /**
       *  Call the validation methods Before send data to backend
       */
      this.validEmail();
      this.validPassword();
      /**
       * Return if the errors is here
       */
      if (this.emailErrors.length || this.passwordErrors.length) {
        this.isLoading = false;
        return;
      }
      this.$store
        .dispatch("loginPerform", {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.isLoading = false;
          this.success_message = "Login done";
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
          this.error = "Error While Sign In, Try again";
        });
    },
    closeModal() {
      //this.freeForms();
      this.showLogin = false;
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
