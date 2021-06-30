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
              <b>Contract details </b>
            </div>
            <div class="card-body">
              <ul class="list px-1">
                <li class="list-item mb-3">
                  <ul class="list-inline d-flex justify-content-between">
                    <li class="list-inline-item item-width">
                      Description :
                    </li>
                    <li class="list-inline-item item-right">
                      {{ contract.description }}
                    </li>
                  </ul>
                </li>
                <li class="list-item mb-3">
                  <ul class="list-inline d-flex justify-content-between">
                    <li class="list-inline-item item-width">
                      Start Date :
                    </li>
                    <li class="list-inline-item item-right">
                      {{ contract.start_date }}
                    </li>
                  </ul>
                </li>
                <li class="list-item mb-3">
                  <ul class="list-inline d-flex justify-content-between">
                    <li class="list-inline-item item-width">
                      End Date :
                    </li>
                    <li class="list-inline-item item-right">
                      {{ contract.end_date }}
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
                        :class="validationForCardOwner"
                        id="card_owner"
                        v-model="card_owner"
                        required
                        class="form-control "
                      />
                      <!-- If the errors is empty -->
                      <div
                        v-if="!validationForCardOwner"
                        class="valid-feedback"
                      >
                        Looks good!
                      </div>
                      <!-- If the errors is full -->
                      <div
                        v-if="validationForCardOwner"
                        class="invalid-feedback"
                      >
                        <span
                          class="d-block"
                          v-for="(error, index) in CardOwnerErrors"
                          :key="index"
                        >
                          {{ error }}
                        </span>
                      </div>
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
                          :class="validationForCardNumber"
                          id="card_number"
                          v-model="card_number"
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
                        <!-- If the errors is empty -->
                        <div
                          v-if="!validationForCardNumber"
                          class="valid-feedback"
                        >
                          Looks good!
                        </div>
                        <!-- If the errors is full -->
                        <div
                          v-if="validationForCardNumber"
                          class="invalid-feedback"
                        >
                          <span
                            class="d-block"
                            v-for="(error, index) in CardNumberErrors"
                            :key="index"
                          >
                            {{ error }}
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
                              :class="validationForMonth"
                              id="date_month"
                              v-model="date_month"
                              name=""
                              class="form-control"
                              required
                            />
                            <input
                              type="number"
                              placeholder="YY"
                              :class="validationForYear"
                              id="date_year"
                              v-model="date_year"
                              name=""
                              class="form-control"
                              required
                            />
                            <!-- If the errors is empty -->
                            <div
                              v-if="!validationForYear"
                              class="valid-feedback"
                            >
                              Looks good!
                            </div>
                            <!-- If the errors is full -->
                            <div
                              v-if="validationForYear"
                              class="invalid-feedback"
                            >
                              <span
                                class="d-block"
                                v-for="(error, index) in DateYearErrors"
                                :key="index"
                              >
                                {{ error }}
                              </span>
                            </div>
                            <!-- If the errors is empty -->
                            <div
                              v-if="!validationForMonth"
                              class="valid-feedback"
                            >
                              Looks good!
                            </div>
                            <!-- If the errors is full -->
                            <div
                              v-if="validationForMonth"
                              class="invalid-feedback"
                            >
                              <span
                                class="d-block"
                                v-for="(error, index) in DateMonthErrors"
                                :key="index"
                              >
                                {{ error }}
                              </span>
                            </div>
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
                          <input
                            type="text"
                            required
                            class="form-control"
                            :class="validationForCVV"
                            id="cvv"
                            v-model="cvv"
                          />
                          <!-- If the errors is empty -->
                          <div v-if="!validationForCVV" class="valid-feedback">
                            Looks good!
                          </div>
                          <!-- If the errors is full -->
                          <div v-if="validationForCVV" class="invalid-feedback">
                            <span
                              class="d-block"
                              v-for="(error, index) in CVVErrors"
                              :key="index"
                            >
                              {{ error }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="card-footer">
                      <button
                        type="button"
                        class="subscribe btn btn-primary btn-block shadow-sm"
                        @click="payContract"
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
                Payment In Progress
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
              <div class="col-12 mx-auto pb-3" v-if="isLoadingPayment">
                <clip-loader
                  :loading="isLoadingPayment"
                  :color="color"
                  :size="size"
                ></clip-loader>
              </div>
              <!-- Pay Mission -->
              <div class="payment-done-wrapper w-100" v-if="!isLoadingPayment">
                <div class="payment-done text-center">
                  <i class="far fa-check-circle"></i>
                </div>
                <h4 class="text-center mt-2">Payment Done</h4>
              </div>
            </div>
            <div class="modal-footer">
              <ul class="list-inline">
                <li class="list-inline-item float-right">
                  <button
                    class="btn btn-success btn-details py-1"
                    @click.prevent="printPaymentContractInvoice"
                  >
                    <i class="fas fa-print mr-2"></i>
                    Print Invoice
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </transition>
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
      show: false,
      isLoadingPayment: false,
      /* data for validation */
      CardOwnerErrors: [],
      CardNumberErrors: [],
      DateMonthErrors: [],
      DateYearErrors: [],
      CVVErrors: [],
      validationForCardOwner: null,
      validationForCardNumber: null,
      validationForMonth: null,
      validationForYear: null,
      validationForCVV: null,
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
    /* computed methods for validation */
    validationCardOwner() {
      return this.CardOwnerErrors.length ? true : false;
    },
    validationCardNumber() {
      return this.CardNumberErrors.length ? true : false;
    },
    validationDateMonth() {
      return this.DateMonthErrors.length ? true : false;
    },
    validationDateYear() {
      return this.DateYearErrors.length ? true : false;
    },
    validationCVV() {
      return this.CVVErrors.length ? true : false;
    },
    contract() {
      return this.$store.getters.getClientContract;
    },
    duration() {
      const start_date = this.contract.start_date;
      const end_date = this.contract.end_date;
      return this.differenceBetweenTwoDates(start_date, end_date);
    },
    payment() {
      const duration = this.duration;
      const candidate_salary = this.contract.candidate.salary;
      const tgm = this.contract.candidate.tgm;
      let payment = (duration * candidate_salary) / 30;
      return Math.trunc(payment * tgm);
    },
  },
  methods: {
    /*
     **
     *  Method to validate Card Owner Name
     */
    validCardOwner: function() {
      console.log("valid Card Owner Name ? ");
      this.CardOwnerErrors = [];

      if (!this.card_owner) {
        this.CardOwnerErrors.push("Card Owner Name should not be empty");
      } else {
        if (this.card_owner.length < 4) {
          this.CardOwnerErrors.push(
            "Card Owner Name must be more than 4 characters"
          );
        }
      }

      this.validationForCardOwner = this.CardOwnerErrors.length
        ? "is-invalid"
        : "is-valid";
    },

    /*
     **
     *  Method to validate Card number Name
     */
    validCardNumber: function() {
      console.log("valid card number ? ");
      this.CardNumberErrors = [];

      if (!this.card_number) {
        this.CardNumberErrors.push("Card Number should not be empty");
      } else {
        if (this.card_number.length != 16) {
          this.CardNumberErrors.push("Card Number must be 16 numbers");
        }
      }

      this.validationForCardNumber = this.CardNumberErrors.length
        ? "is-invalid"
        : "is-valid";
    },

    /*
     **
     *  Method to validate date month
     */
    validDateMonth: function() {
      console.log("valid date month ? ");
      this.DateMonthErrors = [];

      if (!this.date_month) {
        this.DateMonthErrors.push("Date Month should not be empty");
      } else {
        if (this.date_month.length != 2) {
          this.DateMonthErrors.push("Date Month must be 2 numbers");
        }
      }

      this.validationForMonth = this.DateMonthErrors.length
        ? "is-invalid"
        : "is-valid";
    },

    /*
     **
     *  Method to validate date year
     */
    validDateYear: function() {
      console.log("valid date year ? ");
      this.DateYearErrors = [];

      if (!this.date_year) {
        this.DateYearErrors.push("Date Year should not be empty");
      } else {
        if (this.date_year.length != 2) {
          this.DateYearErrors.push("Date Year must be 2 numbers");
        }
      }

      this.validationForYear = this.DateYearErrors.length
        ? "is-invalid"
        : "is-valid";
    },
    /*
     **
     *  Method to validate date year
     */
    validCVV: function() {
      console.log("valid date year ? ");
      this.CVVErrors = [];

      if (!this.cvv) {
        this.CVVErrors.push("CVV should not be empty");
      } else {
        if (this.cvv.length != 3) {
          this.CVVErrors.push("CVV must be 3 numbers");
        }
      }

      this.validationForCVV = this.CVVErrors.length ? "is-invalid" : "is-valid";
    },
    differenceBetweenTwoDates(start_date, end_date) {
      var diff = Math.floor(
        (Date.parse(end_date) - Date.parse(start_date)) / 86400000
      );
      return diff;
    },
    getContractById() {
      this.isLoading = true;
      const client_id = this.$route.params.client_id;
      const contract_id = this.$route.params.contract_id;
      let payload = {
        client_id: client_id,
        contract_id: contract_id,
      };
      this.$store
        .dispatch("getContractById", payload)
        .then(() => {
          console.log("here");
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          console.log(error.message);
        });
    },
    showPaymentProcessModal() {
      this.show = true;
    },
    closeModal() {
      this.show = false;
    },
    getCLientContracts() {
      const id = this.$route.params.id;
      this.$store
        .dispatch("getCLientContracts", { client_id: id })
        .then(() => {})
        .catch(() => {});
    },
    payContract() {
      this.isLoadingPayment = true;
      this.show = false;

      /**
       *  Call the validation methods Before send data to backend
       */
      this.validCardOwner();
      this.validCardNumber();
      this.validDateMonth();
      this.validDateYear();
      this.validCVV();

      /**
       *    Return if the errors is here
       */
      if (
        this.CardOwnerErrors.length ||
        this.CardNumberErrors.length ||
        this.DateMonthErrors.length ||
        this.DateYearErrors.length ||
        this.CVVErrors.length
      ) {
        this.isLoadingPayment = false;
        return;
      }
      this.show = true;
      const contract_id = this.contract.id;
      const paymentData = new FormData();
      paymentData.append("contract_id", contract_id);
      paymentData.append("amount", this.payment);
      this.$store
        .dispatch("payContract", paymentData)
        .then(() => {
          this.updateContractPaymentStatus();
        })
        .catch((error) => {
          this.isLoadingPayment = false;
          console.log(error.message);
        });
    },
    updateContractPaymentStatus() {
      const status = 1;
      const contract_id = this.contract.id;
      const updatedContract = new FormData();
      updatedContract.append("contract_payment_status", status);
      updatedContract.append("_method", "PUT");

      this.$store
        .dispatch("updateContractPaymentStatus", {
          id: contract_id,
          contract: updatedContract,
        })
        .then(() => {
          this.updateContractStatus();
        })
        .catch((error) => {
          this.isLoadingPayment = false;
          console.log(error.message);
          this.error = "The payment process failed";
        });
    },
    updateContractStatus() {
      const status = 2;
      const contract_id = this.contract.id;
      const updatedContract = new FormData();
      updatedContract.append("status", status);
      updatedContract.append("_method", "PUT");

      this.$store
        .dispatch("updateContractStatus", {
          id: contract_id,
          contract: updatedContract,
        })
        .then(() => {
          this.isLoadingPayment = false;
          this.success = "Contracts's Payed successfully !!!";
          this.getCLientContracts();
        })
        .catch((error) => {
          this.isLoadingPayment = false;
          console.log(error.message);
          this.error = "The payment process failed";
        });
    },
    donePayment() {
      const client_id = this.$route.params.client_id;
      this.closeModal();
      this.$router.push("/clients/" + client_id + "/contracts");
    },
    printPaymentContractInvoice() {
      const contractData = new FormData();
      contractData.append("client_id", this.contract.client_id);
      contractData.append("candidate_id", this.contract.candidate_id);
      this.$store
        .dispatch("printPaymentContractInvoice", contractData)
        .then(() => {
          setTimeout(function(){
            this.donePayment();
          }, 3000);
        })
        .catch(() => {
          this.error = "The print process failed";
        });
    },
  },
  created() {
    this.getContractById();
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
.payment-choice-list {
  border: 1px solid #d2d5d7;
}
/** Payment Modal */
.modal-title {
  font-weight: 600;
  text-transform: lowercase;
  color: #434d49;
}
.payment-done {
  font-size: 5rem;
  color: #18a865;
}
.payment-done-wrapper h4 {
  font-weight: 550;
  color: #134672;
  margin-top: 1rem;
}
</style>
