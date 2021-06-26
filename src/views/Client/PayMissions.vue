<template>
  <section>
    <div class="container py-5">
      <div class="row">
        <!-- loading spinner -->
        <div class="col-12 mx-auto py-3" v-if="isLoading">
          <clip-loader :loading="isLoading"></clip-loader>
        </div>
        <!-- Mission and payment details -->
        <div class="col-12 col-md-6" v-if="!isLoading">
          <div class="mission-wrapper card">
            <div class="card-header">
              <b>Mission details </b>
            </div>
            <div class="card-body">
              <ul class="list px-1">
                <li class="list-item mb-3">
                  <ul class="list-inline d-flex justify-content-between">
                    <li class="list-inline-item item-width">
                      Description :
                    </li>
                    <li class="list-inline-item item-right">
                      {{ mission.description }}
                    </li>
                  </ul>
                </li>
                <li class="list-item mb-3">
                  <ul class="list-inline d-flex justify-content-between">
                    <li class="list-inline-item item-width">
                      Start Date :
                    </li>
                    <li class="list-inline-item item-right">
                      {{ mission.start_date }}
                    </li>
                  </ul>
                </li>
                <li class="list-item mb-3">
                  <ul class="list-inline d-flex justify-content-between">
                    <li class="list-inline-item item-width">
                      End Date :
                    </li>
                    <li class="list-inline-item item-right">
                      {{ mission.end_date }}
                    </li>
                  </ul>
                </li>
                <li class="list-item mb-3">
                  <ul class="list-inline d-flex justify-content-between">
                    <li class="list-inline-item item-width">
                      Duration :
                    </li>
                    <li class="list-inline-item item-right">
                      {{ duration }} days
                    </li>
                  </ul>
                </li>
                <li class="list-item mb-3">
                  <ul class="list-inline d-flex justify-content-between">
                    <li class="list-inline-item item-width">
                      Payment :
                    </li>
                    <li class="list-inline-item item-right payment-amount">
                      {{ payment }} <span class="item-width">Dhs</span>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div class="card-footer text-muted">
              <button
                class="btn btn-primary float-right"
                @click="showPaymentProcess = true"
              >
                Pay
              </button>
            </div>
          </div>
        </div>

        <!-- payment Process -->
        <div
          class="col-12 col-md-6"
          :class="showPaymentProcess ? 'd-block' : 'd-none'"
          v-if="!isLoading"
        >
          <div class="card mission-wrapper">
            <div class="card-header">
              <b>Payment Process </b>
            </div>
            <div class="card-body">
              <div class="bg-white shadow-sm pt-4 pl-2 pr-2 pb-2">
                <!-- Credit card form tabs -->
                <ul
                  role="tablist"
                  class="nav bg-light nav-pills rounded nav-fill payment-choice-list mb-3"
                >
                  <li class="nav-item">
                    <a
                      data-toggle="pill"
                      href="#credit-card"
                      class="nav-link active "
                    >
                      <i class="fas fa-credit-card mr-2"></i> Credit Card
                    </a>
                  </li>
                  <li class="nav-item">
                    <a data-toggle="pill" href="#paypal" class="nav-link ">
                      <i class="fab fa-paypal mr-2"></i> Paypal
                    </a>
                  </li>
                  <li class="nav-item">
                    <a data-toggle="pill" href="#net-banking" class="nav-link ">
                      <i class="fas fa-mobile-alt mr-2"></i> Net Banking
                    </a>
                  </li>
                </ul>
              </div>
              <!-- End -->
              <!-- Credit card form content -->
              <div class="tab-content">
                <!-- credit card info-->
                <div id="credit-card" class="tab-pane fade show active pt-3">
                  <form role="form" onsubmit="event.preventDefault()">
                    <div class="form-group">
                      <label for="username">
                        <h6>Card Owner</h6>
                      </label>
                      <input
                        type="text"
                        name="username"
                        placeholder="Card Owner Name"
                        required
                        class="form-control "
                      />
                    </div>
                    <div class="form-group">
                      <label for="cardNumber">
                        <h6>Card number</h6>
                      </label>
                      <div class="input-group">
                        <input
                          type="text"
                          name="cardNumber"
                          placeholder="Valid card number"
                          class="form-control "
                          required
                        />
                        <div class="input-group-append">
                          <span class="input-group-text text-muted">
                            <i class="fab fa-cc-visa mx-1"></i>
                            <i class="fab fa-cc-mastercard mx-1"></i>
                            <i class="fab fa-cc-amex mx-1"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-8">
                        <div class="form-group">
                          <label>
                            <span class="hidden-xs">
                              <h6>Expiration Date</h6>
                            </span>
                          </label>
                          <div class="input-group">
                            <input
                              type="number"
                              placeholder="MM"
                              name=""
                              class="form-control"
                              required
                            />
                            <input
                              type="number"
                              placeholder="YY"
                              name=""
                              class="form-control"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="form-group mb-4">
                          <label
                            data-toggle="tooltip"
                            title="Three digit CV code on the back of your card"
                          >
                            <h6>
                              CVV <i class="fa fa-question-circle d-inline"></i>
                            </h6>
                          </label>
                          <input type="text" required class="form-control" />
                        </div>
                      </div>
                    </div>
                    <div class="card-footer">
                      <button
                        type="button"
                        class="subscribe btn btn-primary btn-block shadow-sm"
                      >
                        Confirm Payment
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <!-- End -->
              <!-- End -->
            </div>
            <!-- End -->
            <!-- End -->
          </div>
        </div>
      </div>
    </div>
  </section>
  <Footer />
</template>

<script>
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
import Footer from "../../components/layout/Footer.vue";
import $ from "jquery";
export default {
  components: {
    ClipLoader,
    Footer,
  },
  data() {
    return {
      isLoading: false,
      showPaymentProcess: false,
    };
  },
  computed: {
    mission() {
      return this.$store.getters.getClientMission;
    },
    duration() {
      const start_date = this.mission.start_date;
      const end_date = this.mission.end_date;
      return this.differenceBetweenTwoDates(start_date, end_date);
    },
    payment() {
      const duration = this.duration;
      const candidate_salary = this.mission.candidate.salary;
      const tgm = this.mission.candidate.tgm;
      let payment = (duration * candidate_salary) / 30;
      return Math.trunc(payment * tgm);
    },
  },
  methods: {
    differenceBetweenTwoDates(start_date, end_date) {
      var diff = Math.floor(
        (Date.parse(end_date) - Date.parse(start_date)) / 86400000
      );
      return diff;
    },
    getMissionById() {
      this.isLoading = true;
      const client_id = this.$route.params.client_id;
      const mission_id = this.$route.params.mission_id;
      let payload = {
        client_id: client_id,
        mission_id: mission_id,
      };
      this.$store
        .dispatch("getMissionById", payload)
        .then(() => {
          console.log("here");
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          console.log(error.message);
        });
    },
  },
  created() {
    this.getMissionById();
  },
  mounted() {
    $(function() {
      $('[data-toggle="tooltip"]').tooltip();
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
ul {
  list-style-type: none;
}
.mission-wrapper {
  border: 1px solid #edeef1;
  background-color: #fff;
  box-shadow: 0 3px 6px rgba(240, 234, 234, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.item-width {
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 600;
  color: #2f3132;
  font-size: 16px;
  width: 40%;
}
span.item-width {
  color: #159e5e;
}
.item-right {
  font-weight: 550;
  color: #787c7c;
}
.payment-amount {
  color: #159e5e;
  font-size: 20px;
}
.card-header,
.card-footer {
  background-color: #fff !important;
}
.card-header b {
  color: #242222;
}
/*
*   Credit Card
 */
.rounded {
  border-radius: 1rem;
}

.nav-pills .nav-link {
  color: #555;
}

.nav-pills .nav-link.active {
  color: white;
}

input[type="radio"] {
  margin-right: 5px;
}
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: #fff;
  background-color: #1dbf73;
}
.btns {
  background-color: #1dbf73;
}
.btns:hover {
  background-color: #1dbf73;
  border-color: #1e7e34;
}
.payment-choice-list{
    border: 1px solid #d2d5d7;
}
</style>
