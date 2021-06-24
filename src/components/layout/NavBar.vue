<template>
  <header class="d-none d-md-block">
    <div class="container pt-4">
      <div class="first-header mt-0">
        <ul class="list-inline">
          <li class="list-inline-item header-logo">
            <a href="#" @click.prevent="returnHome">
              <h1 class="logo-text">Recruit <span>.</span></h1>
            </a>
          </li>
          <ul
            class="list-inline float-right header-menu d-flex align-items-center"
          >
            <!-- Si le client n'est pas connecte || register class <i class="fas fa-arrow-right"></i> -->

            <li class="list-inline-item mt-3" v-if="!loggedClient">
              <a href="#" class="join" @click="show = true">
                Join
              </a>
            </li>

            <!-- Si le client est connecte  -->

            <!--Notifications of mission and contracts -->
            <li class="list-inline-item" v-if="loggedClient">
              <div class="dropdown show" v-if="notifications!=null">
                <div
                  class="notification d-inline-block dropdown-toggle"
                  role="button"
                  id="notificationsDropdown"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <div
                    class="active-notifications"
                    v-if="notifications.length != 0"
                  ></div>
                  <i class="far fa-bell"></i>
                </div>

                <div
                  class="dropdown-menu"
                  aria-labelledby="notificationsDropdown"
                  v-if="notifications.length != 0"
                >
                  <div class="dropdown-item notification-header">
                    <h4 class="py-2 mb-0">Notifications</h4>
                  </div>
                  <a
                    href="#"
                    v-for="(notification, index) in notifications"
                    :key="index"
                    class="dropdown-item"
                    @click.prevent="showMissions"
                    :class="
                      notification.data.mission_status == 1
                        ? 'color-success'
                        : 'color-danger'
                    "
                  >
                    Your mission is
                    {{
                      notification.data.mission_status == 1
                        ? "confirmed"
                        : "refused"
                    }}
                  </a>
                </div>
                <!-- No notifications -->
                <div
                  class="dropdown-menu mt-2"
                  aria-labelledby="notificationsDropdown"
                  v-if="notifications.length == 0"
                >
                  <div class="dropdown-item notification-header">
                    <h4>Notifications</h4>
                  </div>
                  <span class="dropdown-item"
                    >there is no notifications ...</span
                  >
                </div>
              </div>
            </li>

            <li class="list-inline-item" v-if="loggedClient">
              <div class="dropdown show">
                <div
                  class="visit-profil-client dropdown-toggle menu-client-dropdown"
                  role="button"
                  id="clientMenu"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    :src="
                      'http://localhost:8000/storage/clientImages/' +
                        client.id +
                        '/' +
                        client.client_image
                    "
                    :alt="'client ' + client.id + ' profile image'"
                    class="d-block img-fluid"
                  />
                </div>

                <div
                  class="dropdown-menu client-menu"
                  aria-labelledby="clientMenu"
                >
                  <a
                    class="dropdown-item"
                    href="#"
                    @click.prevent="visitProfile"
                    >Profil</a
                  >
                  <a
                    class="dropdown-item"
                    href="#"
                    @click.prevent="showMissions"
                    >Missions</a
                  >
                  <a
                    class="dropdown-item"
                    href="#"
                    @click.prevent="showContracts"
                    >Contracts</a
                  >
                </div>
              </div>
            </li>

            <li class="list-inline-item" v-if="loggedClient">
              <div class="logout-client">
                <a href="#" class="" @click.prevent="logoutClient">
                  <i class="fas fa-sign-out-alt"></i>
                </a>
              </div>
            </li>
          </ul>
        </ul>
      </div>
    </div>

    <!-- NavBar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light p-0">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="container">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a class="nav-link" href="#"
                >how it works <span class="sr-only">(current)</span></a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#"
                >how to recruit <span class="sr-only">(current)</span></a
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/browse"
                >browse profiles
                <span class="sr-only">(current)</span></router-link
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#"
                >Contact us <span class="sr-only">(current)</span></a
              >
            </li>
          </ul>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item px-3">
              <ul class="list-inline">
                <li class="list-inline-item social-media-item">
                  <a href="">
                    <i class="fab fa-facebook-f mr-2"></i>
                  </a>
                </li>
                <li class="list-inline-item social-media-item">
                  <a href="">
                    <i class="fab fa-instagram mr-2"></i>
                  </a>
                </li>
                <li class="list-inline-item social-media-item">
                  <a href="">
                    <i class="fab fa-twitter mr-2"></i>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Inscription Modal -->
    <transition name="fade">
      <div
        v-if="show"
        class="modal"
        @click.self="closeModal"
        id="connexionModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        :class="show ? 'show' : ''"
        :style="
          show
            ? 'display:block; padding:17px; background-color:rgba(0,0,0,.65)'
            : 'display:none'
        "
        :aria-hidden="show ? '' : 'true'"
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
              <div class="alert-danger text-center mb-3 px-4 py-2" v-if="error">
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
    </transition>

    <!-- Register Modal -->
    <transition name="fade">
      <div
        v-if="!show && showRegister"
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </header>
  <!-- Visible on low sizes -->
  <header class="d-block d-md-none">
    <div class="container-md mx-0 px-0">
      <div class="first-header">
        <div class="logo-header w-100">
          <div class="row">
            <div class="col-3 p-0"></div>
            <div class="col-6 p-0 text-center">
              <a href="#">
                <h1 class="logo-text">Recruit <span>.</span></h1>
              </a>
            </div>
            <div class="col-3 p-0"></div>
          </div>
        </div>
        <div class="first-header-menu">
          <!-- Si le client n'est pas connecter -->
          <div class="d-flex justify-content-around mt-3" v-if="!loggedClient">
            <div class="">
              <a href="#" class="join" @click="show = true">
                Join
              </a>
            </div>
          </div>

          <!-- Si le client est connecter -->
          <div class="d-flex justify-content-center mt-3" v-if="loggedClient">
            <div class="visit-profil-client mx-3">
              <a href="#" class="" @click.prevent="visitProfile">
                <img
                  :src="
                    'http://localhost:8000/storage/clientImages/' +
                      client.id +
                      '/' +
                      client.client_image
                  "
                  :alt="'client ' + client.id + ' profile image'"
                  class="d-block img-fluid"
                />
              </a>
            </div>
            <div class="logout-client mx-3">
              <a href="#" class="" @click.prevent="logoutClient">
                <i class="fas fa-sign-out-alt"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- NavBar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light px-0 py-3 pl-3">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="container">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a class="nav-link" href="#"
                >how it works <span class="sr-only">(current)</span></a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#"
                >how to recruit <span class="sr-only">(current)</span></a
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/browse"
                >browse profiles
                <span class="sr-only">(current)</span></router-link
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#"
                >Contact us <span class="sr-only">(current)</span></a
              >
            </li>
          </ul>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item px-3">
              <ul class="list-inline">
                <li class="list-inline-item social-media-item">
                  <a href="">
                    <i class="fab fa-facebook-f mr-2"></i>
                  </a>
                </li>
                <li class="list-inline-item social-media-item">
                  <a href="">
                    <i class="fab fa-instagram mr-2"></i>
                  </a>
                </li>
                <li class="list-inline-item social-media-item">
                  <a href="">
                    <i class="fab fa-twitter mr-2"></i>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
export default {
  components: {
    PulseLoader,
  },
  data() {
    return {
      show: false,
      showConfirmModal: false,
      showRegister: false,
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
      notifCounter: 0,
    };
  },
  watch: {
    show() {
      if (this.show) {
        document.body.classList.add("modal-open");
      } else {
        document.body.classList.remove("modal-open");
      }
    },
    showRegister() {
      if (this.showRegister) {
        document.body.classList.add("modal-open");
      } else {
        document.body.classList.remove("modal-open");
      }
    },
  },
  computed: {
    client() {
      return this.$store.getters.getActifClient;
    },
    /* computed methods for validation */
    validationFirstName() {
      return this.firstNameErrors.length > 0 ? true : false;
    },
    validationLastName() {
      return this.lastNameErrors.length > 0 ? true : false;
    },
    validationEmail() {
      return this.emailErrors.length > 0 ? true : false;
    },
    validationPhoneNumber() {
      return this.phoneNumberErrors.length > 0 ? true : false;
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
    loggedClient() {
      return this.$store.getters.getClientStatus;
    },
    notifications() {
      return this.$store.getters.getUnreadNotifications;
    },
  },
  methods: {
    /**
     *  moethod to free inputs
     */
    freeForms() {
      this.firstName = null;
      this.lastName = null;
      this.email = null;
      this.password = null;
      this.phoneNumber = null;
      this.firstNameErrors = [];
      this.lastNameErrors = [];
      this.emailErrors = [];
      this.passwordErrors = [];
      this.phoneNumberErrors = [];
      this.validationForFirstName = null;
      this.validationForLastName = null;
      this.validationForEmail = null;
      this.validationForPassword = null;
      this.validationForPhoneNumber = null;
      this.success_message = null;
      this.error = null;
    },
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
      // var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      // if (!re.test(this.password)) {
      //   this.passwordErrors.push("password must have a valid format");
      // }

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
        this.success_message = "Client has been added succesfully";
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
     *  visit client profile
     */
    visitProfile() {
      console.log("visit profile");
      this.$router.push("/profile");
    },
    /**
     *   logout client
     */
    logoutClient() {
      this.$store
        .dispatch("logoutPerform")
        .then(() => {
          this.$router.push("/home");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    openmodal() {
      this.$modal.show("example");
    },
    showRegisterModal() {
      this.freeForms();
      this.show = false;
      this.showRegister = true;
    },
    closeModal() {
      this.freeForms();
      this.show = false;
    },
    closeRegisterModal() {
      this.freeForms();
      this.showRegister = false;
    },
    confirm() {
      this.showConfirmModal = false;
      this.show = false;
    },
    returnHome() {
      this.$router.push("/home");
    },
    showMissions() {
      this.$router.push("/clients/"+ this.client.id +"/missions");
    },
    showContracts() {
      this.$router.push("/clients/"+ this.client.id +"/contracts");
    },
    /**
     *  Get unread Notifications
     */
    getUnreadNotifications() {
      this.intervalid = setInterval(
        function() {
            const client_id = this.client.id;
            this.$store.dispatch("getUnreadNotifications",client_id);
        }.bind(this),
        10000
      );
    },
  },
  created() {
    this.getUnreadNotifications();
  },
};
</script>

<style scoped>
@font-face {
  font-family: "Helvetica ";
  src: url("~@/assets/fonts/PragmaticaMedium.otf") format("otf");
}
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@900&display=swap");
a:hover {
  text-decoration: none;
}
h1.logo-text {
  font-family: "Nunito", sans-serif;
  font-size: 30px;
  color: #404145;
}
.logo-text span {
  color: #1dbf73;
  font-weight: bold;
  font-size: 40px;
}
header {
  background-color: #fff;
  border-bottom: 1cpx solid #b9aaaa;
}
.first-header {
  margin-top: 2rem;
  margin-bottom: 1.4rem;
}
.visit-profil-client,
.logout-client {
  width: 40px;
  height: 40px;
  border-radius: 100%;
}
.logout-client {
  border: 1px solid #e5e9ed;
  position: relative;
}
.logout-client a {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #555555;
}
.logout-client a:hover {
  text-decoration: none;
  color: #007c92;
}
.visit-profil-client img {
  border-radius: 100%;
}
.register {
  font-size: 14px;
  color: #555555;
  display: inline-block;
  border: 1px solid #e5e9ed;
  padding: 9px 26px 9px 60px;
  border-radius: 50px;
  position: relative;
  text-transform: uppercase;
}
.register i {
  display: inline-block;
  height: 40px;
  width: 40px;
  text-align: center;
  line-height: 38px;
  border: 1px solid #e5e9ed;
  border-radius: 50%;
  position: absolute;
  left: -1px;
  top: -1px;
  -webkit-transition: 2s;
  transition: 2s;
  margin-right: 12px;
  color: #007c92;
}
.register:hover {
  text-decoration: none;
  color: #007c92;
}
.join {
  display: inline-block;
  font-size: 14px;
  color: #1dbf73;
  border: 1px solid#19a463;
  border-radius: 4px;
  padding: 4px 25px;
  font-weight: bold;
  transition: all 0.2s ease;
}
.join:hover {
  color: #fff;
  text-decoration: none;
  background-color: #19a463;
}
.social-media-item a i {
  color: #c3c6c9;
}
.social-media-item a i:hover {
  color: #007c92;
  transition: 0.5s;
}

.header-logo {
  width: 20%;
}
.header-menu li {
  margin-right: 25px !important;
}
.header-menu li span {
  line-height: 1.5em;
  font-weight: 400;
  color: #333333;
}
.bg-light {
  border-top: 1px solid #dad8d8;
  background-color: #fff !important;
}
.navbar-light .navbar-nav .nav-link {
  font-family: Helvetica;
  font-weight: 600 !important;
  color: #7a7d85;
  line-height: 24px;
  font-size: 17px;
  margin-right: 20px;
  text-transform: capitalize;
}
.navbar-light .navbar-nav .nav-link:hover {
  font-weight: 600 !important;
  color: #1dbf73;
  transition: 0.3s;
}
.navbar-nav {
  padding-top: 0.8rem !important;
  padding-bottom: 0.8rem !important;
}

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

/** Notifications */
.notification {
  padding: 5px 10px;
  background-color: #fff;
  color: #44566d;
  font-size: 1.1rem;
  position: relative;
}
.unread-notification {
  position: absolute;
  top: -20%;
  right: -30%;
  border-radius: 15px;
  color: #fff;
  background-color: #44566d;
  font-size: 12px;
}
.dropdown-menu.show {
  display: block;
  border-radius: 0px;
  padding-top: 0px;
  top: -5px;
  left: -370% !important;
}
.client-menu.show {
  top: 8px !important;
  left: -100% !important;
}
.notification-header {
  color: #fff;
  background-color: #44566d;
}
.notification-header:hover {
  color: #fff;
  background-color: #44566d;
}

.notification-header h4 {
  font-size: 1rem;
  font-weight: 600;
}
.color-notification {
  color: #0eb40e;
  font-weight: 600;
}
.active-notifications {
  position: absolute;
  top: 5%;
  right: 35%;
  color: red;
  background-color: #dd0d0d;
  width: 8px;
  height: 8px;
  border-radius: 100%;
}
.color-success {
  color: #078c33;
}
.color-danger {
  color: #d00c0c;
}
.menu-client-dropdown::after {
  content: none;
}
</style>
