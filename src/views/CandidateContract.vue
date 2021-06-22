<template>
  <!-- high sizes -->
  <section class="pb-5">
    <div class="container-md pt-5">
      <div class="profile pt-5">
        <h2 class="text-left title mb-5 px-5">
          <span class="icon" @click="goBack"
            ><i class="fas fa-arrow-left mr-2"></i
          ></span>
          Candidate Contract
        </h2>
        <!-- loading spinner -->
        <div class="text-center py-3" v-if="isLoading">
          <clip-loader
            :loading="isLoading"
            :color="color"
            :size="size"
          ></clip-loader>
        </div>
        <div class="row px-5" v-if="!isLoading">
          <div class="col-12 px-0">
            <div class="card-calendar1 py-4 px-0 px-md-5">
              <div class="candidate-calendar">
                <!-- choose contract type -->
                <div class="mission-description mt-4 d-none d-md-block">
                  <h5>Choose Contract Type :</h5>
                  <div class="input-group form-select mt-4 mb-3">
                    <div class="input-group-prepend">
                      <label class="input-group-text" for="inputGroupSelect01"
                        >Options</label
                      >
                    </div>
                    <select
                      class="custom-select"
                      id="inputGroupSelect01"
                      v-model="selected"
                    >
                      <option selected>Choose...</option>
                      <option
                        v-for="contractType in contractsType"
                        :key="contractType.id"
                        :value="contractType.id"
                        >{{
                          contractType.name +
                            " ( " +
                            contractType.description +
                            " )"
                        }}
                      </option>
                    </select>
                  </div>
                  <div class="form-group">
                    <!-- If the errors is empty -->
                    <div
                      v-if="!validationDescription"
                      class="valid-feedback pt-3 pl-3"
                    >
                      Looks good!
                    </div>
                    <!-- If the errors is full -->
                    <div
                      v-if="validationDescription"
                      class="invalid-feedback pt-3 pl-3"
                    >
                      <span
                        class="d-block"
                        v-for="(error, index) in descriptionErrors"
                        :key="index"
                      >
                        {{ error }}
                      </span>
                    </div>
                  </div>
                </div>
                <!-- choose contract type low sizes -->
                <div class="mission-description mt-4 d-block d-md-none">
                  <h5>Choose Contract Type :</h5>
                  <div class="input-group mt-4 mb-3">
                    <div class="input-group-prepend">
                      <label class="input-group-text" for="inputGroupSelect01"
                        >Options</label
                      >
                    </div>
                    <select class="custom-select" id="inputGroupSelect01">
                      <option selected>Choose...</option>
                      <option
                        v-for="contractType in contractsType"
                        :key="contractType.id"
                        :value="contractType.id"
                        >{{ contractType.name }}</option
                      >
                    </select>
                  </div>
                  <div class="form-group">
                    <!-- If the errors is empty -->
                    <div
                      v-if="!validationDescription"
                      class="valid-feedback pt-3 pl-3"
                    >
                      Looks good!
                    </div>
                    <!-- If the errors is full -->
                    <div
                      v-if="validationDescription"
                      class="invalid-feedback pt-3 pl-3"
                    >
                      <span
                        class="d-block"
                        v-for="(error, index) in descriptionErrors"
                        :key="index"
                      >
                        {{ error }}
                      </span>
                    </div>
                  </div>
                </div>
                <h5 v-if="selected != null">
                  Choose the period : {{ startDate }}
                </h5>
                <!-- Calendar for range date-->
                <div
                  class="calendar mx-auto pt-4 pb-2 d-flex justify-content-center align-items-center"
                  v-if="selected != null && selected != CDI_ID"
                >
                  <v-date-picker
                    v-model="range"
                    is-range
                    is-dark
                    is-expanded
                    :color="calendarColor"
                    :model-config="modelConfig"
                    :attributes="attributes"
                    :min-date="new Date()"
                    :disabled-dates="disabledDates"
                  />
                </div>
                <!-- Calendar keys for range date-->
                <div
                  class="d-block calendar-keys"
                  v-if="selected != null && selected != CDI_ID"
                >
                  <ul class="list-inline pl-3">
                    <li class="list-inline-item">
                      <span class="d-inline-block square"></span>
                    </li>
                    <li class="list-inline-item">
                      <span class="ml-3">The range dates is already taken</span>
                    </li>
                  </ul>
                </div>
                <!-- Range Error -->
                <div class="d-block" v-if="validationForRange">
                  <span
                    class="d-block range-error"
                    v-for="(error, index) in rangeErrors"
                    :key="index"
                  >
                    {{ error }}
                  </span>
                </div>
                <!-- Calendar for one date-->
                <div
                  class="calendar mx-auto pt-4 pb-2 d-flex justify-content-center align-items-center"
                  v-if="selected != null && selected == CDI_ID"
                >
                  <v-date-picker
                    v-model="startDate"
                    mode="date"
                    is-dark
                    is-expanded
                    :color="calendarColor"
                    :model-config="modelConfigForOneDate"
                    :attributes="attributes"
                    :min-date="new Date()"
                    :disabled-dates="disabledDates"
                  />
                </div>
                <!-- Calendar keys for one date -->
                <div
                  class="d-block calendar-keys"
                  v-if="selected != null && selected == CDI_ID"
                >
                  <ul class="list-inline pl-3">
                    <li class="list-inline-item">
                      <span class="d-inline-block square"></span>
                    </li>
                    <li class="list-inline-item">
                      <span class="ml-3">The range dates is already taken</span>
                    </li>
                  </ul>
                </div>
                <!-- Start Date Error -->
                <div class="d-block" v-if="validationForStartDate">
                  <span
                    class="d-block range-error"
                    v-for="(error, index) in startDateErrors"
                    :key="index"
                  >
                    {{ error }}
                  </span>
                </div>
                <!-- Contrat description -->
                <div class="mission-description mt-4">
                  <h5>Contract Description :</h5>
                  <div class="form-group pt-3 pl-3">
                    <label for="description"
                      >write the contract description here</label
                    >
                    <textarea
                      class="form-control"
                      :class="validationForDescription"
                      id="description"
                      rows="3"
                      v-model="description"
                      placeholder="contract's description"
                    ></textarea>
                    <!-- If the errors is empty -->
                    <div v-if="!validationDescription" class="valid-feedback">
                      Looks good!
                    </div>
                    <!-- If the errors is full -->
                    <div v-if="validationDescription" class="invalid-feedback">
                      <span
                        class="d-block"
                        v-for="(error, index) in descriptionErrors"
                        :key="index"
                      >
                        {{ error }}
                      </span>
                    </div>
                  </div>
                </div>
                <!-- Make Contract buton -->
                <div class="float-right pb-3 pt-2">
                  <button
                    class="btn btn-success btn-hire"
                    @click.prevent="makeContract(selected, CDI_ID)"
                  >
                    Make Contract
                  </button>
                </div>
                <div
                  class="mx-auto text-center pb-3 pt-2 clear"
                  v-if="isLoadingData"
                >
                  <clip-loader
                    :loading="isLoadingData"
                    :color="color"
                    :size="size"
                  ></clip-loader>
                </div>
                <div
                  class="mx-auto text-center pb-3 pt-2 alert alert-success clear"
                  v-if="success_message && countDown > 0"
                >
                  {{ success_message }}
                </div>
                <div
                  class="mx-auto text-center pb-3 pt-2 alert alert-danger clear"
                  v-if="error && countDown > 0"
                >
                  {{ error }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <Footer />
</template>

<script>
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
import Footer from "../components/layout/Footer.vue";
export default {
  components: {
    ClipLoader,
    Footer,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      success_message: null,
      isLoadingData: false,
      color: "#14a800",
      /* Data for calendar */
      calendarColor: "green",
      range: null,
      startDate: null,
      mission_file: null,
      modelConfig: {
        start: {
          type: "string",
          mask: "YYYY-MM-DD",
        },
        end: {
          type: "string",
          mask: "YYYY-MM-DD",
        },
      },
      modelConfigForOneDate: {
        type: "string",
        mask: "YYYY-MM-DD",
      },

      end: {
        timeAdjust: "23:59:59",
      },
      /* Data for validation */
      description: null,
      descriptionErrors: [],
      validationForRange: true,
      validationForStartDate: true,
      startDateErrors: [],
      rangeErrors: [],
      countDown: 10,
      selected: null,
    };
  },
  computed: {
    candidate() {
      return this.$store.getters.getCandidate;
    },
    missions() {
      const candidate = this.$store.getters.getCandidate;
      return candidate.missions;
    },
    attributes() {
      const candidate = this.$store.getters.getCandidate;
      const missions = candidate.missions;
      const colors = ["red"];
      let attributes = [];
      missions.forEach((mission) => {
        const start_date = this.getDate(mission.start_date);
        const end_date = this.getDate(mission.end_date);
        let attribute = {
          highlight: {
            start: { fillMode: "outline", color: colors[0] },
            base: { fillMode: "light", color: colors[0] },
            end: { fillMode: "outline", color: colors[0] },
          },
          dates: { start: start_date, end: end_date },
        };
        attributes.push(attribute);
      });
      return attributes;
    },
    validationDescription() {
      return this.descriptionErrors.length ? true : false;
    },
    disabledDates() {
      const candidate = this.$store.getters.getCandidate;
      const missions = candidate.missions;
      console.log(candidate);
      let disableDates = [];
      missions.forEach((mission) => {
        const start_date = this.getDate(mission.start_date);
        const end_date = this.getDate(mission.end_date);
        let disableDate = {
          start: start_date,
          end: end_date,
        };
        disableDates.push(disableDate);
      });
      return disableDates;
    },
    client() {
      return this.$store.getters.getActifClient;
    },
    client_id() {
      const client = this.$store.getters.getActifClient;
      return client.id;
    },
    contractsType() {
      const contractsType = this.$store.getters.getContractsType;
      const contractsTypeActive = [];
      contractsType.forEach((contractType) => {
        if (contractType.status == 1) {
          contractsTypeActive.push(contractType);
        }
      });
      return contractsTypeActive;
    },
    CDI_ID() {
      const contractsType = this.$store.getters.getContractsType;
      let id = null;
      contractsType.forEach((contractType) => {
        if (contractType.name == "CDI" && contractType.status == 1) {
          id = contractType.id;
        }
      });
      return id;
    },
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    getCandidate() {
      this.isLoading = true;
      const id = this.$route.params.id;
      this.$store
        .dispatch("getCandidate", id)
        .then(() => {
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    getDate(date) {
      let splittedDate = date.split("-");
      let dateToConvert = [
        splittedDate[1],
        splittedDate[2],
        splittedDate[0],
      ].join("/");
      return new Date(dateToConvert);
    },
    validChosenRange: function() {
      this.rangeErrors = [];

      if (!this.range) {
        this.rangeErrors.push(
          "You must choose range ( start date to end date for mission )"
        );
      }

      this.validationForRange = this.rangeErrors.length ? true : false;
    },
    validChosenStartDate: function() {
      this.startDateErrors = [];

      if (!this.startDate) {
        this.startDateErrors.push("You must choose start date of contract CDI");
      }

      this.validationForStartDate = this.startDateErrors.length ? true : false;
    },
    validDescription: function() {
      this.descriptionErrors = [];

      if (!this.description) {
        this.descriptionErrors.push("Description must not be empty");
      } else {
        if (this.description.length < 80) {
          this.descriptionErrors.push(
            "Description must have more than 80 caracters"
          );
        }
      }

      this.validationForDescription = this.descriptionErrors.length
        ? "is-invalid"
        : "is-valid";
    },
    getContractType(id) {
      const contractsType = this.$store.getters.getContractsType;
      let type;
      contractsType.forEach((contractType) => {
        if (contractType.id == id) {
          console.log(contractType);
          type = contractType.name;
        }
      });
      return type;
    },
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      }
    },
    /* send Mission to hire Candidate Profile */
    makeContract(contractType, CDI_ID) {
      this.error = null;
      this.isLoadingData = true;

      if (contractType == null || CDI_ID == null) {
        this.isLoadingData = false;
        this.error = "You must choose Contract Type before make a contract";
        return;
      }

      if (contractType == CDI_ID) {
        /**
         *  Call the validation methods Before send data to backend
         */
        this.validChosenStartDate();

        /**
         *    Return if the errors is here
         */
        if (this.startDateErrors.length) {
          this.isLoadingData = false;
          return;
        }
      } else {
        /**
         *  Call the validation methods Before send data to backend
         */
        this.validChosenRange();

        /**
         *    Return if the errors is here
         */
        if (this.rangeErrors.length) {
          this.isLoadingData = false;
          return;
        }
      }

      this.validDescription();

      /**
       *    Return if the errors is here
       */
      if (this.descriptionErrors.length) {
        this.isLoadingData = false;
        return;
      }
      /**
       *  if the client is null
       */
      if (this.client == null) {
        this.isLoadingData = false;
        this.error = "You must login before make a contract";
        return;
      }

      const contractDetail = new FormData();

      contractDetail.append("client_id", this.client_id);
      contractDetail.append("candidate_id", this.candidate.id);
      if (contractType != CDI_ID) {
        contractDetail.append("start_date", this.range.start);
        contractDetail.append("end_date", this.range.end);
      } else {
        // the case of CDI contract
        contractDetail.append("start_date", this.startDate);
      }

      contractDetail.append("description", this.description);
      contractDetail.append("type", this.getContractType(contractType));
      contractDetail.append("status", 0);

      this.$store
        .dispatch("setContract", contractDetail)
        .then(() => {
          console.log("New contract is created");
          this.isLoadingData = false;
          this.success_message = "The contract was sent to verification";
          this.countDownTimer();
          // re call Candidate to update changes
          this.getCandidate();
        })
        .catch(() => {
          this.isLoadingData = false;
          this.error = "Something wrong, Please try again";
          this.countDownTimer();
        });
    },
    loadContractsType() {
      this.isLoading = true;
      this.$store
        .dispatch("loadContractsType")
        .then(() => {
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
  },
  created() {
    this.getCandidate();
    this.loadContractsType();
  },
};
</script>

<style scoped>
.contract-wrapper {
  max-width: 584px;
}
section {
  background-color: #f0f4f8;
}
.candidate-info-wrapper {
  border-bottom: 1px solid #e0e0e0;
}
.profile {
  background-color: #fff;
  border: 1px solid #e0e0e0;
}
.profile h2 {
  font-weight: 600;
}
.icon {
  font-size: 1.4rem;
  cursor: pointer;
  color: #14a800;
}
.name {
  font-weight: bold;
  color: #313133;
}
.contact li {
  color: #29292b;
  font-weight: 550;
}
.contact li i {
  color: #cc6591;
}
.candidate-description p {
  color: gray;
}
.candidate-description p span {
  font-weight: bold;
  color: #313133;
}
.img-profile {
  width: 150px;
  height: 150px;
  border-radius: 100%;
  margin: 0 auto;
  clear: both;
}
.card-calendar2 {
  background-color: #fff;
  border-left: 1px solid #e0e0e0;
}
.card-calendar2-small {
  border-left: 0px solid #e0e0e0;
}
.card-calendar1 {
  background-color: #fff;
}
.card-calendar1 h5,
.card-calendar2 h5 {
  font-weight: bold;
  font-size: 1.2rem;
  color: #000;
}
.skill,
.skill-over {
  color: #3e4b5c;
  border: 1px solid #e2e9f5;
  border-radius: 15px;
}
.skill-over {
  background-color: #55a8fd;
  color: #fff;
  border: 1px solid #9ec6ef;
  font-weight: 600;
}
.btn-hire {
  background-color: #1dbf73;
  color: #fff;
  font-weight: bold;
  border-radius: 40px;
  padding: 9px 25px;
}
.btn-like {
  color: #14a800;
  background-color: #fff;
  border: 1px solid #14a800;
  border-radius: 100%;
  padding: 15px;
  cursor: pointer;
  font-size: 1.2rem;
}
.btn-hire:hover {
  background-color: #19a463;
}
.btn-like:hover {
  background-color: #14a800;
  color: #fff;
}
.mission-title {
  color: #14a800;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.1rem;
}
.rating i {
  color: #fdcc0d;
  margin-right: 4px;
}
.list {
  list-style-type: none;
}
.list .list-item {
  border-bottom: 1px solid #e0e0e0;
}
.mission-date {
  font-weight: 550;
  color: #6f6d6d;
}
.candidate-id {
  color: #313133;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 18px;
}
.rating {
  font-size: 14px;
}
.rating-avis {
  font-weight: 550;
  color: #636367;
  font-size: 14px;
}
.range-error {
  display: none;
  width: 100%;
  font-size: 90%;
  color: #a72834;
}
.clear {
  clear: both;
}
.square {
  width: 15px;
  height: 15px;
  background-color: #ca292f;
  border: 0.5px solid #4a4949;
}
.calendar-keys span {
  font-weight: 550;
}
.form-select {
  width: 60%;
}
</style>
