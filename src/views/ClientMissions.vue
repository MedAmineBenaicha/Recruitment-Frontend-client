<template>
  <section class="pt-5">
    <div class="container">
      <div class="row">
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
                    v-if="mission.mission_status == 1"
                    class="btn btn-info btn-details py-1"
                    @click.prevent="payMission(mission.id)"
                  >
                    <i class="fas fa-credit-card mr-2"></i>
                    Proceed to payment
                  </button>
                  <!-- rate button -->
                  <button
                    v-if="mission.mission_status == 2"
                    class="btn btn-success btn-details py-1"
                    @click.prevent="rateMission(mission.id)"
                  >
                    <i class="fas fa-info-circle mr-2"></i>
                    Rate Mission
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  <Footer/>
</template>

<script>
import Footer from "../components/layout/Footer.vue";
export default {
  components: {
    Footer,
  },
  data() {
    return {
      isLoadingMissions: false,
    };
  },
  computed: {
    clientMissions() {
      return this.$store.getters.getClientMissions;
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
    missionStatus(status) {
      switch (status) {
        case 0:
          return "pending";
        case 1:
          return "en cours";
        case 2:
          return "completed";
        case 3:
          return "refused";
      }
    },
    getBadge(status) {
      switch (status) {
        case 0:
          return "badge-secondary";
        case 1:
          return "badge-warning";
        case 2:
          return "badge-success";
        case 3:
          return "badge-danger";
      }
    },
    rateMission(mission_id) {
      const client_id = this.$route.params.id;  
      this.$router.push(
        "/clients/" + client_id + "/missions/" + mission_id + "/rate"
      );
    },
  },
  created() {
    this.getCLientMissions();
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
  transition: 0.8s;
  -webkit-animation: fade 2s linear;
  animation: fade 2s linear;
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
</style>
