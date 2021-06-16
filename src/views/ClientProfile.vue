<template>
  <section class="profil py-5">
    <!-- Profil Client -->
    <div class="container-md">
      <div class="row">
        <!-- loading spinner -->
        <div class="col-12 mx-auto py-3" v-if="isLoadingProfile">
          <clip-loader
            :loading="isLoadingProfile"
            :color="color"
          ></clip-loader>
        </div>
        <div class="col-12 col-lg-4 mb-4" v-if="!isLoadingProfile">
          <div class="profil-body px-4 pt-4">
            <ul class="list-inline mb-5">
              <li class="list-inline-item float-left"></li>
              <li class="list-inline-item float-right">
                <span class="online">En ligne</span>
              </li>
            </ul>
            <div class="profil-image mx-auto" @click="showUpdateProfile">
              <img
                :src="
                  'http://localhost:8000/storage/clientImages/' +
                    client.id +
                    '/' +
                    client.client_image
                "
                :alt="'client ' + client.id + ' profile image'"
                class="d-block img-fluid profil-image-source"
              />
              <a href="#"><i class="fas fa-camera profil-image-update"></i></a>
            </div>
            <div class="profil-info mt-4">
              <h4 class="text-center">
                {{ client.first_name + " " + client.last_name }}
              </h4>
              <hr />
              <ul class="list-info pl-0">
                <li class="list-info-item">
                  <ul class="list-inline">
                    <li class="list-inline-item">
                      <i class="fas fa-map-marker-alt mr-2"></i>
                      From
                    </li>
                    <li class="list-inline-item float-right">
                      <b>Beni Mellal </b>
                    </li>
                  </ul>
                </li>
                <li class="list-info-item">
                  <ul class="list-inline">
                    <li class="list-inline-item">
                      <i class="fas fa-user mr-2"></i>
                      Name
                    </li>
                    <li class="list-inline-item float-right">
                      <b>{{ client.last_name }} </b>
                    </li>
                  </ul>
                </li>
                <li class="list-info-item">
                  <ul class="list-inline">
                    <li class="list-inline-item">
                      <i class="fas fa-envelope mr-2"></i>
                      Email
                    </li>
                    <li class="list-inline-item float-right">
                      <b>{{ client.email }} </b>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-8" v-if="!isLoadingProfile">
          <div class="info-update ml-lg-3 h-100">
            <div class="info-update-header">
              <h2 class="pl-5 pt-5">Editer Profil</h2>
              <ul class="list-inline list-menu pl-4">
                <li
                  class="list-inline-item mr-3"
                  :class="showMenu1 ? 'active-option' : 'non-active-option'"
                  id="option-1"
                  @click="showDetails"
                >
                  Info Client
                </li>
                <li
                  class="list-inline-item mr-3"
                  :class="showMenu2 ? 'active-option' : 'non-active-option'"
                  id="option-2"
                  @click="showMission"
                >
                  Latest Missions
                </li>
                <li
                  class="list-inline-item mr-3"
                  :class="showMenu3 ? 'active-option' : 'non-active-option'"
                  id="option-3"
                  @click="showUpdateProfile"
                >
                  Update profile picture
                </li>
              </ul>
            </div>
            <!-- Menu 1 -->
            <div
              class="menu-option info-update-body px-4 pt-4"
              :class="showMenu1 ? 'd-block' : 'd-none'"
            >
              <!-- suucess message -->
              <div
                class="alert-success text-center my-3 px-4 py-3"
                v-if="successUpdate && countDown > 0"
              >
                {{ successUpdate }}
              </div>
              <!-- error message -->
              <div
                class="alert-danger text-center my-3 px-4 py-3"
                v-if="error && countDown > 0"
              >
                {{ error }}
              </div>
              <!-- spinner -->
              <div
                class="d-flex justify-content-center px-4 py-3 my-3"
                v-if="isLoading"
              >
                <pulse-loader :loading="true"></pulse-loader>
              </div>
              <form class="mb-4">
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="inputNom">First Name</label>
                    <input
                      type="nom"
                      class="form-control"
                      :class="validationForFirstName"
                      id="inputNom"
                      v-model="client.first_name"
                      placeholder="First name"
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
                  <div class="form-group col-md-6">
                    <label for="inputPrenom">Last Name</label>
                    <input
                      type="text"
                      class="form-control"
                      :class="validationForLastName"
                      id="inputPrenom"
                      v-model="client.last_name"
                      placeholder="last name"
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
                </div>
                <div class="form-group">
                  <label for="inputEmail">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    :class="validationForEmail"
                    id="inputEmail"
                    v-model="client.email"
                    autocomplete="off"
                    placeholder="Enter your email"
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
                <div class="form-group">
                  <label for="inputAddress">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    :class="validationForPassword"
                    autocomplete="off"
                    id="inputAddress"
                    v-model="password"
                    placeholder="If you want to change the password enter new one"
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
                <div class="form-group">
                  <label for="phoneNumber">Phone Number</label>
                  <input
                    type="text"
                    class="form-control"
                    :class="validationForPhoneNumber"
                    id="phoneNumber"
                    v-model="client.phone_number"
                    placeholder="Your phone number"
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
                <button
                  type="submit"
                  class="btn btn-primary"
                  @click.prevent="updateClient"
                >
                  Update
                </button>
              </form>
            </div>
            <!-- Menu 2 -->
            <div
              class="menu-option menu-reservation"
              :class="showMenu2 ? 'd-block' : 'd-none'"
            >
              <div class="px-5 py-4" v-if="!client.missions.length">
                <h4>
                  <i class="far fa-frown"></i>
                  You don't have any missions
                </h4>
                <div class="d-block text-center mt-5">
                  <a href="#" class="join">
                    Browse Profiles
                  </a>
                </div>
              </div>
              <!-- you have missions -->
              <div class="px-5 py-4" v-if="client.missions.length">
                <ul class="list p-0">
                  <li
                    v-for="mission in client.missions"
                    :key="mission.id"
                    class="list-item mission-details py-2 my-3"
                    :class="statusClass[mission.mission_status]"
                  >
                    <ul class="list-inline d-flex justify-content-between px-3">
                      <li class="list-inline-item px-3 mission-name">
                        {{ mission.description.substring(0, 30) + "..." }}
                      </li>
                      <li
                        class="list-inline-item px-3"
                        :class="statusFlag[mission.mission_status]"
                      >
                        <i :class="statusIconName[mission.mission_status] + ' mr-2'"></i
                        >{{ statusName[mission.mission_status] }}
                      </li>
                      <li
                        class="list-inline-item px-3"
                        v-if="mission.mission_status == 2"
                      >
                        <span class="d-inline-block rating">
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                        </span>
                      </li>
                      <li
                        class="list-inline-item px-3"
                        style="width:136.417px"
                        v-if="mission.mission_status != 2"
                      >
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <!-- Menu 3 -->
            <div
              class="menu-option info-update-body px-4 pt-4"
              :class="showMenu3 ? 'd-block' : 'd-none'"
            >
              <!-- suucess message -->
              <div
                class="alert-success text-center my-3 px-4 py-3"
                v-if="successUpdate && countDown > 0"
              >
                {{ successUpdate }}
              </div>
              <!-- error message -->
              <div
                class="alert-danger text-center my-3 px-4 py-3"
                v-if="error && countDown > 0"
              >
                {{ error }}
              </div>
              <!-- spinner -->
              <div
                class="d-flex justify-content-center px-4 my-3"
                v-if="isLoading"
              >
                <pulse-loader :loading="true"></pulse-loader>
              </div>
              <form class="mb-4">
                <div class="form-group">
                  <label for="description">Upload profile picture :</label>
                  <div class="input-group mb-3">
                    <div class="custom-file">
                      <input
                        type="file"
                        class="custom-file-input"
                        id="profile-picture"
                        aria-describedby="profile-picture"
                        required
                        accept="image/*"
                        @change="uploadImage"
                      />
                      <label class="custom-file-label" for="inputGroupFile01"
                        >Choose file</label
                      >
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  class="btn btn-primary"
                  @click.prevent="updateClientImage"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
export default {
  components: {
    ClipLoader,
    PulseLoader
  },
  data() {
    return {
      showMenu1: true,
      showMenu2: false,
      showMenu3: false,
      password: null,
      client_image: null,
      isLoading: false,
      successUpdate: null,
      error: null,
      countDown: 20,
      isLoadingProfile: false,
      color: "#14a800",
      /* data for validation */
      firstNameErrors: [],
      lastNameErrors: [],
      emailErrors: [],
      passwordErrors: [],
      phoneNumberErrors: [],
      userImageErrors: [],
      validationForFirstName: null,
      validationForLastName: null,
      validationForEmail: null,
      validationForPassword: null,
      validationForPhoneNumber: null,
      validationForUserImage: null,
      /* data for mission status */
      statusFlag: [
        "mission-en-attente",
        "mission-en-cours",
        "mission-completed",
        "mission-error",
      ],
      statusClass: [
        "en-attente-mission",
        "en-cours-mission",
        "completed-mission",
        "error-mission",
      ],
      statusName: ["pending", "en-cours", "completed", "error"],
      statusIconName: ["fas fa-paper-plane", "fas fa-exclamation-circle", "fas fa-check", "fas fa-times"],
    };
  },
  computed: {
    client() {
      return this.$store.getters.getActifClient;
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
    validationPassword() {
      return this.passwordErrors.length ? true : false;
    },
    validationPhoneNumber() {
      return this.phoneNumberErrors.length ? true : false;
    },
    validationUserImage() {
      return this.userImageErrors.length ? true : false;
    },
    /* data for test missionstatus */
  },
  methods: {
    showExcerpt(text) {
      return text.substring(0, 20) + "...";
    },
    showDetails() {
      if (!this.showMenu1) {
        this.showMenu1 = true;
        this.showMenu2 = false;
        this.showMenu3 = false;
      }
    },
    showMission() {
      if (!this.showMenu2) {
        this.showMenu2 = true;
        this.showMenu1 = false;
        this.showMenu3 = false;
      }
    },
    showUpdateProfile() {
      if (!this.showMenu3) {
        this.showMenu2 = false;
        this.showMenu1 = false;
        this.showMenu3 = true;
      }
    },
    /**
     *  Method to validate First Name
     */
    validFirstName: function() {
      console.log("valid first Name ? ");
      this.firstNameErrors = [];

      if (!this.client.first_name) {
        this.firstNameErrors.push("First Name should not be empty");
      }
      if (this.client.first_name.length < 4) {
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
      console.log("valid last Name ? ");
      this.lastNameErrors = [];

      if (!this.client.last_name) {
        this.lastNameErrors.push("Last Name should not be empty");
      }
      if (this.client.last_name.length < 4) {
        this.lastNameErrors.push("Last Name must be more than 4 characters");
      }

      this.validationForLastName = this.lastNameErrors.length
        ? "is-invalid"
        : "is-valid";
    },
    /*
     *  Method to validate Email
     */
    validEmail: function() {
      console.log("valid email ? ");
      this.emailErrors = [];

      if (!this.client.email) {
        this.emailErrors.push("Email should not be empty");
      }
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(this.client.email)) {
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
      console.log("valid password ? ");
      this.passwordErrors = [];

      if (!this.password) {
        this.passwordErrors.push("Password should not be empty");
      }
      /**
       *  this code will be available after update all users passsword
       */
      var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      if (!re.test(this.password)) {
        this.passwordErrors.push(
          "password must contains letter,numbers and symbols like : @+:-..."
        );
      }

      this.validationForPassword = this.passwordErrors.length
        ? "is-invalid"
        : "is-valid";
    },
    /**
     *  Method to validate Phone Number
     */
    validPhoneNumber: function() {
      console.log("valid phone number ? ");
      this.phoneNumberErrors = [];

      if (!this.client.phone_number) {
        this.phoneNumberErrors.push("Phone Number should not be empty");
      }
      if (this.client.phone_number.length != 10) {
        this.phoneNumberErrors.push("Phone Number must be 10 numbers");
      }

      this.validationForPhoneNumber = this.phoneNumberErrors.length
        ? "is-invalid"
        : "is-valid";
    },
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      }
    },
    updateClient() {
      this.error = null;
      this.isLoading = true;

      console.log(this.isLoading);

      /**
       *  Call the validation methods Before send data to backend
       */
      this.validFirstName();
      this.validLastName();
      this.validEmail();
      this.validPhoneNumber();

      if (this.password.length) {
        this.validPassword();
      }

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

      const updatedCLient = new FormData();
      const id = this.client.id;
      updatedCLient.append("first_name", this.client.first_name);
      updatedCLient.append("last_name", this.client.last_name);
      updatedCLient.append("email", this.client.email);
      updatedCLient.append("password", this.password);
      updatedCLient.append("phone_number", this.client.phone_number);
      updatedCLient.append("_method", "PUT");

      this.$store
        .dispatch("updateClient", { id: id, client: updatedCLient })
        .then(() => {
          console.log("After Done Axios ==> update Client");
          this.isLoading = false;
          this.successUpdate = "The update succeded";
          this.countDownTimer();
          this.getCLientProfile();
        })
        .catch(() => {
          this.isLoading = false;
          this.error = "Something wrong, Please try again";
          this.countDownTimer();
        });
    },
    uploadImage(e) {
      this.client_image = e.target.files[0];
      console.log(this.client_image);
    },
    updateClientImage() {
      this.error = null;
      this.isLoading = true;

      const updatedProfile = new FormData();
      const id = this.client.id;
      updatedProfile.append("client_image", this.client_image);
      updatedProfile.append("_method", "PUT");

      this.$store
        .dispatch("updateClientImage", { id: id, client: updatedProfile })
        .then(() => {
          console.log("After Done Axios ==> update Client image");
          this.isLoading = false;
          this.successUpdate = "The update succeded";
          this.countDownTimer();
          this.getCLientProfile();
        })
        .catch(() => {
          this.isLoading = false;
          this.error = "Something wrong, Please try again";
          this.countDownTimer();
        });
    },
    /**
     *  Get Client from API laravel Server
     */
    getCLientProfile(){
      this.isLoadingProfile = true;
      this.$store.dispatch('getCLientProfile')
      .then(()=>{
        this.isLoadingProfile = false;
      })
      .catch(()=>{
        this.isLoadingProfile = false;
      })
    }
  },
  created(){
    this.getCLientProfile();
  }
};
</script>

<style scoped>
#profilSection,
.profil {
  background-color: #f0f4f8;
}
.profil-body,
.info-update {
  background-color: #fff;
  box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.15);
}
.profil-image {
  height: 150px;
  width: 150px;
  border-radius: 100%;
  position: relative;
}
.profil-image-source,
.profil-image-doctor {
  border-radius: 100%;
}
.profil-image-update {
  font-size: 3em;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  visibility: hidden;
}
.profil-image:hover {
  cursor: pointer;
}
.profil-image:hover .profil-image-source {
  filter: grayscale(80%);
  transition: 0.3s;
}
.profil-image:hover .profil-image-update {
  visibility: visible;
}
.profil-info h4 {
  font-family: "GiltroyRegular" sans-serif;
  font-weight: bold;
  font-size: 20px;
  color: #253246;
}
.list-info,
.list-info li ul {
  list-style-type: none;
}
.list-info li ul li {
  color: #62646a;
  margin-bottom: 10px;
  font-size: 14px;
}
.online {
  border: 1px solid #1dbf73;
  padding: 0px 20px 2px 10px;
  color: #1dbf73;
  border-radius: 20px;
  font-weight: 600;
}
.badge-image {
  width: 30px;
  height: 30px;
}
.modifier-profil {
  color: #62646a;
  font-size: 14px;
  padding: 5px 15px;
  border: 1px solid #a9b4c7;
  font-weight: bold;
  cursor: pointer;
}
.modifier-profil:hover {
  color: #fff;
  border: 1px solid #a9b4c7;
  background-color: #a9b4c7;
  text-decoration: none;
}
.illustration-profil img {
  height: 500px;
  margin-left: auto;
}
.info-update-header {
  height: 150px;
  background-color: #f1f6ff;
  position: relative;
}
.profil-body,
.info-update {
  border: 1px solid #e4dada;
}
.list-menu {
  position: absolute;
  bottom: 0px;
  margin-bottom: 0px;
}
.info-update-header h2 {
  color: #000;
  font-weight: bold;
}
.list-menu li {
  font-size: 17px;
  font-weight: 600;
  padding-bottom: 4px;
  cursor: pointer;
}
.non-active-option {
  color: gray;
}
.active-option {
  color: #000;
  border-bottom: 3px solid #06adef;
  margin-bottom: 0px;
}
.info-update-body form label {
  color: #201919;
  font-weight: 600;
}
.menu-reservation h4 {
  color: #565454;
  font-weight: 600;
  font-size: 20px;
}
.menu-reservation i {
  color: #ad523c;
  font-size: 25px;
  margin-right: 10px;
}
.btn-profil-reservation {
  padding: 10px 30px;
  border-radius: 25px;
  background-color: #ad523c;
  color: #fff;
  font-weight: 600;
}
.btn-profil-reservation:hover {
  text-decoration: none;
  color: #fff;
}
.client-reservations {
  padding: 12px 30px;
  background-color: #d4edda;
  border: 4px solid #c3e6cb;
  width: 70%;
  border-radius: 15px;
}
.client-reservations span {
  color: #000;
  font-weight: 600;
  font-size: 16px;
}
.reservation-statut {
  border: 1px solid green;
  padding: 2px 8px;
  border-radius: 25px;
}
.client-reservations i {
  color: #319447;
}
.join {
  display: inline-block;
  font-size: 14px;
  color: #1dbf73;
  border: 3px solid #19a463;
  border-radius: 20px;
  padding: 9px 25px;
  font-weight: bold;
  transition: all 0.2s ease;
}
.join:hover {
  color: #fff;
  text-decoration: none;
  background-color: #19a463;
}
.custom-file-label {
  color: #6c757d;
}
ul {
  list-style-type: none;
}
.mission-details {
  background-color: #fff;
  border: 2px solid gray;
  border-radius: 10px;
  font-size: 1.1rem;
  color: #000;
}
.en-attente-mission {
  background-color: #777c7a0f;
  border: 2px solid #777c7a;
  color: #000;
}
.en-cours-mission {
  background-color: #e2b70f0f;
  border: 2px solid #e2b70f;
  color: #000;
}
.completed-mission {
  background-color: #19a4630f;
  border: 2px solid #19a463;
  color: #000;
}
.error-mission {
  background-color: #a419260f;
  border: 2px solid #a41926;
  color: #000;
}
.mission-completed,
.mission-completed i {
  background-color: #19a463;
  color: #fff;
  font-weight: 600;
  border-radius: 25px;
  font-size: 0.9rem;
}
.mission-en-cours,
.mission-en-cours i {
  background-color: #e2b70f;
  color: #fff;
  font-weight: 600;
  border-radius: 25px;
  font-size: 0.9rem;
}
.mission-en-attente,
.mission-en-attente i {
  background-color: #777c7a;
  color: #fff;
  font-weight: 600;
  border-radius: 25px;
  font-size: 0.9rem;
}
.mission-error,
.mission-error i{
  background-color: #a41926;
  color: #fff;
  font-weight: 600;
  border-radius: 25px;
  font-size: 0.9rem;
}
.mission-name {
  font-size: 1rem;
  font-weight: 600;
  color: #4b4848;
}
.rating {
  font-size: 14px;
}
.rating i {
  color: #fdcc0d;
  margin-right: 4px;
  font-size: 15px;
}
</style>
