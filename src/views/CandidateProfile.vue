<template>
  <section class="pb-5">
    <div class="container pt-5">
      <div class="profile pt-5">
        <h2 class="text-left title mb-5 px-5">
          <span class="icon" @click="goBack"
            ><i class="fas fa-arrow-left mr-2"></i
          ></span>
          Candidate
        </h2>
        <!-- loading spinner -->
        <div class="text-center py-3" v-if="isLoading">
          <clip-loader
            :loading="isLoading"
            :color="color"
            :size="size"
          ></clip-loader>
        </div>
        <div class="d-flex candidate-info-wrapper" v-if="!isLoading">
          <div
            class="d-flex align-items-start align-items-center pb-5 px-5 candidate-info"
          >
            <div class="candidate-image">
              <!-- candidate Image -->
              <img
                :src="
                  'http://localhost:8000/storage/candidates_images/' +
                    candidate.id +
                    '/' +
                    candidate.candidate_image
                "
                :alt="'candidate ' + candidate.id + ' profile image'"
                class="d-block img-fluid img-profile mb-4"
              />
            </div>
            <div class="candidate-description pl-5 px-5">
              <h4 class="name">
                {{ candidate.first_name + " " + candidate.last_name }}
              </h4>
              <ul class="list-inline contact mr-2 mb-2 ml-2">
                <li class="list-inline-item mr-3">
                  <i class="fas fa-calendar-alt mr-2"></i> 2 ans d'experience
                </li>
              </ul>
              <p class="ml-2 mb-2">
                <span class="d-inline-block rating">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                </span>
                <span class="d-inline-block ml-2 rating-avis">
                  ( 20 avis )
                </span>
              </p>
              <p class="ml-2"><span class="mr-2">4</span>missions active</p>
            </div>
          </div>
          <div class="ml-auto pr-5 pt-4 mt-2 candidate-id">
            ID: E0E{{ candidate.id }}
          </div>
        </div>
        <div class="row px-5" v-if="!isLoading">
          <div class="col-8">
            <div class="card-calendar1 py-4 px-5">
              <div class="candidate-calendar">
                <h5>Choose the period :</h5>
                <!-- Calendar -->
                <div
                  class="calendar mx-auto pt-4 pb-2 d-flex justify-content-center align-items-center"
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
                <!-- Calendar keys -->
                <div class="d-block calendar-keys">
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
                <div class="mission-description mt-4">
                  <h5>Mission Description :</h5>
                  <div class="form-group pt-3 pl-3">
                    <label for="description"
                      >write the mission description here</label
                    >
                    <textarea
                      class="form-control"
                      :class="validationForDescription"
                      id="description"
                      rows="3"
                      v-model="description"
                      placeholder="mission's description"
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
                  <!-- input file -->
                  <div class="form-group pl-3">
                    <label for="description">Join File :</label>
                    <div class="input-group mb-3">
                      <div class="custom-file">
                        <input
                          type="file"
                          class="custom-file-input"
                          id="inputGroupFile01"
                          aria-describedby="inputGroupFileAddon01"
                          @change="uploadFile"
                          accept=".pdf,.doc,.txt"
                        />
                        />
                        <label class="custom-file-label" for="inputGroupFile01"
                          >Choose file</label
                        >
                      </div>
                    </div>
                  </div>

                  <div class="float-right pb-3 pt-2">
                    <button
                      class="btn btn-success btn-hire"
                      @click.prevent="hireProfile"
                    >
                      Hire Profile
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
          <div class="col-4 pl-1 pr-0">
            <div class="card-calendar2 h-100 pt-4 pl-4 mb-5">
              <div class="candidate-skills">
                <h5>Candidate Skills :</h5>
                <ul class="list-inline py-4">
                  <li
                    class="list-inline-item mr-2 mb-3"
                    v-for="skill in candidate.skills"
                    :key="skill.id"
                  >
                    <span class="skill px-3 py-1">{{ skill.name }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
export default {
  components: {
    ClipLoader,
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

      end: {
        timeAdjust: "23:59:59",
      },
      /* Data for validation */
      description: null,
      descriptionErrors: [],
      validationForDescription: null,
      validationForRange: true,
      rangeErrors: [],
      countDown: 10,
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
    client_id() {
      const client = this.$store.getters.getActifClient;
      return client.id;
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
    /**
     *  Methods for validate file input and mission description
     */
    uploadFile(e) {
      this.mission_file = e.target.files[0];
      console.log(this.mission_file);
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
    validChosenRange: function() {
      this.rangeErrors = [];

      if (!this.range) {
        this.rangeErrors.push(
          "You must choose range ( start date to end date for mission )"
        );
      }

      this.validationForRange = this.rangeErrors.length ? true : false;
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
    hireProfile() {
      this.error = null;
      this.isLoadingData = true;

      /**
       *  Call the validation methods Before send data to backend
       */
      this.validDescription();
      this.validChosenRange();

      /**
       *    Return if the errors is here
       */
      if (this.descriptionErrors.length || this.rangeErrors.length) {
        this.isLoadingData = false;
        return;
      }

      const missionDetail = new FormData();

      missionDetail.append("client_id", this.client_id);
      missionDetail.append("candidate_id", this.candidate.id);
      missionDetail.append("start_date", this.range.start);
      missionDetail.append("end_date", this.range.end);
      missionDetail.append("description", this.description);
      missionDetail.append("type", "cdd");
      // add mission file to request if != null
      if (this.mission_file) {
        console.log("test " + this.mission_file);
        missionDetail.append("mission_file", this.mission_file);
      }

      this.$store
        .dispatch("setMission", missionDetail)
        .then(() => {
          console.log("New mission is created");
          this.isLoadingData = false;
          this.success_message = "The mission was sent to verification";
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
  },
  created() {
    this.getCandidate();
  },
};
</script>

<style scoped>
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
  background-color: #14a800;
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
</style>
