<template>
  <section class="py-5">
    <div class="container">
      <div class="row">
        <!-- loading spinner -->
        <div class="col-12 mx-auto py-4" v-if="isLoadingMissions">
          <clip-loader :loading="isLoadingMissions"></clip-loader>
        </div>
        <div
          class="col-12 col-sm-6 col-md-4 mb-4 mission-wrapper"
          v-for="mission in clientMissions"
          :key="mission.id"
        >
          <div class="mission-card h-100 pl-4 pr-3">
            <div class="mission-header mt-4 d-flex justify-content-start">
              <div class="mission-candidate-image">
                <img
                  :src="
                    'http://localhost:8000/storage/candidates_images/' +
                      mission.candidate.id +
                      '/' +
                      mission.candidate.candidate_image
                  "
                  alt=""
                  class="img-fluid d-block"
                />
              </div>
              <div class="mission-header-details pl-4 pt-3">
                <h4>{{ mission.candidate.label }}</h4>
              </div>
            </div>
            <div class="mission-body mt-3 h-auto">
              <span>Mission {{ mission.id }}</span>
              <p class="mt-2 pr-5">
                {{
                  mission.description.length > 67
                    ? mission.description.substring(0, 67) + "..."
                    : mission.description
                }}
              </p>
            </div>
            <hr />
            <ul class="list-inline mission-footer  pb-4">
              <li class="list-inline-item">
                <div
                  class="mission-status badge mt-2 px-2 py-1 text-center"
                  :class="getBadge(mission.mission_status)"
                >
                  {{ missionStatus(mission.mission_status) }}
                </div>
              </li>
              <li class="list-inlien-item float-right">
                <div class="mission-details">
                  <!-- payment button -->
                  <button
                    v-if="
                      mission.mission_status == 1 &&
                        mission.mission_payment_status == 0
                    "
                    class="btn btn-info btn-details py-1"
                    @click.prevent="payMission(mission.id)"
                  >
                    <i class="fas fa-credit-card mr-2"></i>
                    Proceed to payment
                  </button>
                  <!-- rate button -->
                  <button
                    v-if="
                      mission.mission_payment_status == 1 &&
                        mission.mission_status == 3 &&
                        mission.mission_rating_status != 1
                    "
                    class="btn btn-success btn-details py-1"
                    @click.prevent="showRatingModal(mission.id)"
                  >
                    <i class="fas fa-info-circle mr-2"></i>
                    Rate Mission
                  </button>
                  <p
                    class="ml-2 mb-2"
                    v-if="
                      mission.mission_status == 3 &&
                        mission.mission_rating_status == 1
                    "
                  >
                    <span class="d-inline-block rating">
                      <i
                        v-for="index in mission.rating.mission_rating"
                        :key="index"
                        class="fas fa-star"
                      ></i>
                    </span>
                    <span class="d-inline-block no-rating">
                      <i
                        class="fas fa-star"
                        v-for="index in 5 - mission.rating.mission_rating"
                        :key="index"
                      ></i>
                    </span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- Pagination -->
        <div class="col-12 mt-5 d-flex justify-content-center">
          <pagination
            v-model="page"
            :records="records"
            :per-page="perPage"
            text=""
            theme="bootstrap4"
          />
        </div>
      </div>
    </div>
  </section>
  <!-- Rate Mission Modal -->
  <transition name="fade">
    <div
      v-if="show"
      class="modal"
      @click.self="closeModal"
      id="RateModal"
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
            <h5 class="modal-title text-center mb-3">
              Rate Mission {{ rating }}
            </h5>
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
          <div class="modal-body mx-1 pt-0 px-3 py-3">
            <!-- loading spinner -->
            <div class="col-12 mx-auto pb-3" v-if="isLoadingRating">
              <clip-loader
                :loading="isLoadingRating"
                :color="color"
                :size="size"
              ></clip-loader>
            </div>
            <!-- Rate Mission -->
            <div class="">
              <div class="stars">
                <label class="rate">
                  <input
                    type="radio"
                    name="radio1"
                    id="star1"
                    value="1"
                    v-model="rating"
                    @click="rating = 1"
                  />
                  <div class="face"></div>
                  <i class="far fa-star star one-star"></i>
                </label>
                <label class="rate">
                  <input
                    type="radio"
                    name="radio1"
                    id="star2"
                    value="2"
                    v-model="rating"
                    @click="rating = 2"
                  />
                  <div class="face"></div>
                  <i class="far fa-star star two-star"></i>
                </label>
                <label class="rate">
                  <input
                    type="radio"
                    name="radio1"
                    id="star3"
                    value="3"
                    v-model="rating"
                    @click="rating = 3"
                  />
                  <div class="face"></div>
                  <i class="far fa-star star three-star"></i>
                </label>
                <label class="rate">
                  <input
                    type="radio"
                    name="radio1"
                    id="star4"
                    value="4"
                    v-model="rating"
                    @click="rating = 4"
                  />
                  <div class="face"></div>
                  <i class="far fa-star star four-star"></i>
                </label>
                <label class="rate">
                  <input
                    type="radio"
                    name="radio1"
                    id="star5"
                    value="5"
                    v-model="rating"
                    @click="rating = 5"
                  />
                  <div class="face"></div>
                  <i class="far fa-star star five-star"></i>
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <ul class="list-inline">
              <li class="list-inline-item float-right">
                <button
                  class="btn btn-success btn-details py-1"
                  @click.prevent="rateMission()"
                >
                  <i class="fas fa-info-circle mr-2"></i>
                  Rate Mission
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
  <Footer />
</template>

<script>
import Footer from "../components/layout/Footer.vue";
import Pagination from "v-pagination-3";
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
import $ from "jquery";
export default {
  components: {
    Footer,
    ClipLoader,
    Pagination,
  },
  data() {
    return {
      isLoadingMissions: false,
      isLoadingRating: false,
      show: false,
      rating: null,
      mission_id: null,
      color: "#14a800",
      //pagination data
      page: 1,
      perPage: 6,
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
  },
  computed: {
    clientMissions() {
      const startIndex = this.perPage * (this.page - 1);
      const endIndex = startIndex + this.perPage;
      return this.$store.getters.getClientMissions.slice(startIndex, endIndex);
    },
    records() {
      return this.$store.getters.getClientMissions.length;
    },
  },
  methods: {
    /**
     *  Get Client from API laravel Server
     */
    getCLientMissions() {
      const id = this.$route.params.id;
      this.isLoadingMissions = true;
      this.$store
        .dispatch("getCLientMissions", { client_id: id })
        .then(() => {
          this.isLoadingMissions = false;
        })
        .catch(() => {
          this.isLoadingMissions = false;
        });
    },
    missionStatus(status){
      switch (status){
        case 0:
          return "pending";
        case 1:
          return "p-payment";
        case 2:
          return "In progress";
        case 3:
          return "completed";
        case 4:
          return "refused";
      }
    },
    getBadge(status){
      switch (status){
        case 0:
          return "badge-secondary";
        case 1:
          return "badge-warning";
        case 2:
          return "badge-primary";
        case 3:
          return "badge-success";
        case 4:
          return "badge-danger";
      }
    },
    proceedToPayment(mission_id) {
      const client_id = this.$route.params.id;
      this.$router.push(
        "/clients/" + client_id + "/missions/" + mission_id + "/rate"
      );
    },
    payMission(mission_id) {
      const client_id = this.$route.params.id;
      this.$router.push(
        "/clients/" + client_id + "/missions/" + mission_id + "/payment"
      );
    },
    showRatingModal(mission_id) {
      this.show = true;
      this.mission_id = mission_id;
    },
    rateMission(mission_id) {
      mission_id = this.mission_id;
      if (this.rating == null) {
        return;
      }
      this.isLoadingRating = true;
      const ratingMission = new FormData();
      ratingMission.append("mission_id", mission_id);
      ratingMission.append("mission_rating", this.rating);
      this.$store
        .dispatch("rateMission", ratingMission)
        .then(() => {
          this.updateMissionRatingStatus(mission_id, 1);
        })
        .catch(() => {
          this.isLoadingRating = false;
        });
    },
    updateMissionRatingStatus(mission_id, status) {
      const updatedMission = new FormData();
      updatedMission.append("mission_rating_status", status);
      updatedMission.append("_method", "PUT");

      this.$store
        .dispatch("updateMissionRatingStatus", {
          id: mission_id,
          mission: updatedMission,
        })
        .then(() => {
          this.isLoadingRating = false;
          this.success = "Missions's Rated successfully !!!";
          this.getCLientMissions();
        })
        .catch((error) => {
          this.isLoadingRating = false;
          console.log(error.message);
          this.error = "The rating process failed";
        });
    },
    closeModal() {
      this.show = false;
    },
    markNotificationsAsRead() {
      const client_id = this.$route.params.id;
      console.log("notifications marked as read");
      this.$store.dispatch("markNotificationsAsRead", client_id);
    },
  },
  mounted() {
    this.getCLientMissions();
    this.markNotificationsAsRead();
    $(function() {
      $(document).on(
        {
          mouseover: function() {
            $(this)
              .find(".far")
              .addClass("star-over");
            $(this)
              .prevAll()
              .find(".far")
              .addClass("star-over");
          },
          mouseleave: function() {
            $(this)
              .find(".far")
              .removeClass("star-over");
            $(this)
              .prevAll()
              .find(".far")
              .removeClass("star-over");
          },
        },
        ".rate"
      );

      $(document).on("click", ".rate", function() {
        if (
          !$(this)
            .find(".star")
            .hasClass("rate-active")
        ) {
          $(this)
            .siblings()
            .find(".star")
            .addClass("far")
            .removeClass("fas rate-active");
          $(this)
            .find(".star")
            .addClass("rate-active fas")
            .removeClass("far star-over");
          $(this)
            .prevAll()
            .find(".star")
            .addClass("fas")
            .removeClass("far star-over");
        } else {
          console.log("has");
        }
      });
    });
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@600&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
section {
  background-color: #f0f4f8;
}
.mission-card {
  border: 1px solid #edeef1;
  background-color: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: 0.3s;
  -webkit-animation: fade 2s linear;
  animation: fade 2s linear;
}
.mission-card:hover {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.18);
}
/* .mission-card:hover {
  background-color: #0f0f2d;
  cursor: pointer;
}
.mission-card:hover .mission-header h4 {
  color: #fff;
}
.mission-card:hover .mission-body p {
  color: #fff;
  font-weight: 500;
}
.mission-card:hover .mission-body span {
  color: #d6d5da;
}

.mission-card:hover .mission-footer .btn-details {
  background-color: #fff;
  color: #000;
  border-color: #e5eaeb;
} */

.mission-candidate-image img {
  width: 60px;
  height: 60px;
  border-radius: 100%;
}
.mission-header h4 {
  color: #222224;
  font-size: 1.3rem;
  font-size: 600;
  font-family: "Source Sans Pro", sans-serif;
}
.mission-body span {
  color: #94929d;
  font-weight: 600;
}
.mission-body p {
  color: #2e2b3d;
  font-weight: 400;
  font-family: "Roboto", sans-serif;
  line-height: 1.6;
  font-size: 0.95rem;
}
.btn-details {
  font-size: 0.95rem !important;
}
.star {
  color: red;
}
.star.active {
  color: red;
}
.list:hover .star,
.list.disabled:hover .star {
  color: red !important;
}
.list:hover .star.active,
.list.disabled:hover .star.active {
  color: red;
}
/**
  *  Rate Modal
 */
#rateModal .modal-content {
  border-radius: 4px;
}
#rateModal .modal-dialog {
  max-width: 400px;
}
#rateModal .modal-header {
  border-bottom: none;
}
#rateModal .modal-title {
  color: #253246;
  font-weight: bold;
  font-family: "GiltroyRegular" sans-serif;
}
/*
*   Rate Section
 */
body {
  background: #ebefff;
}
.rating i {
  color: #fdcc0d;
  border-color: 1px solid #fdcc0d;
  margin-right: 4px;
}
.no-rating i {
  color: #a2a2a0;
  border-color: 1px solid #fdcc0d;
}

.wrap {
  width: 250px;
  height: 50px;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
}
.stars {
  width: fit-content;
  margin: 0 auto;
  cursor: pointer;
}
.star {
  color: #fdcc0d !important;
}
.rate {
  height: 50px;
  margin-left: -5px;
  padding: 5px;
  font-size: 25px;
  position: relative;
  cursor: pointer;
}
.rate input[type="radio"] {
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 0%);
  pointer-events: none;
}
.star-over::after {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  font-size: 16px;
  content: "\f005";
  display: inline-block;
  color: #fdcc0d;
  z-index: 1;
  position: absolute;
  top: 17px;
  left: 10px;
}

.rate:nth-child(1) .face::after {
  content: "\f119"; /* ☹ */
}
.rate:nth-child(2) .face::after {
  content: "\f11a"; /* 😐 */
}
.rate:nth-child(3) .face::after {
  content: "\f118"; /* 🙂 */
}
.rate:nth-child(4) .face::after {
  content: "\f580"; /* 😊 */
}
.rate:nth-child(5) .face::after {
  content: "\f59a"; /* 😄 */
}
.face {
  opacity: 0;
  position: absolute;
  width: 35px;
  height: 35px;
  background: #ff9529;
  border-radius: 5px;
  top: -50px;
  left: 2px;
  transition: 0.2s;
  pointer-events: none;
}
.face::before {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  content: "\f0dd";
  display: inline-block;
  color: #ff9529;
  z-index: 1;
  position: absolute;
  left: 9px;
  bottom: -15px;
}
.face::after {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  display: inline-block;
  color: #fff;
  z-index: 1;
  position: absolute;
  left: 5px;
  top: -1px;
}

.rate:hover .face {
  opacity: 1;
}

/* Not sure if I like this or not. */
/* Makes the emoji stay displayed */
/* input[type="radio"]:checked + .face {
	opacity: 1 !important;
} */
</style>
