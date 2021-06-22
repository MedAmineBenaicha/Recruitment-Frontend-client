<template>
  <section
    class="main-section py-0 py-md-5 d-none d-md-block"
    :class="section_class"
  >
    <div>
      <div
        class="background-image main-section-first"
        :style="changeBackgroundArray[0] == true ? 'opacity: 1;' : 'opacity: 0;'"
      ></div>
      <div
        class="background-image main-section-second"
        :style="changeBackgroundArray[1] == true ? 'opacity: 1;' : 'opacity: 0;'"
      ></div>
      <div
        class="background-image main-section-third"
        :style="changeBackgroundArray[2] == true ? 'opacity: 1;' : 'opacity: 0;'"
      ></div>
    </div>
    <div class="container py-md-5">
      <div class="row">
        <div class="col-12 col-md-7 my-5">
          <h1 class="main-title mb-4 d-none d-md-block">
            Find the best <i>employees</i> For your business
          </h1>
          <h1 class="main-title-small mb-4 d-block d-md-none">
            Find the best <i>employees</i> For your business
          </h1>
          <!-- search-bar high sizes-->
          <div class="search-bar d-none d-md-block">
            <form>
              <div class="d-flex flex-row">
                <div class="col-sm-10 my-1 px-0 search-input">
                  <label class="sr-only" for="inlineFormInputName"
                    >Search for recruit</label
                  >
                  <input
                    type="text"
                    class="form-control pl-5 h-100"
                    id="inlineFormInputName"
                    placeholder="Search for talented Employee"
                  />
                  <div class="search-icon"><i class="fas fa-search"></i></div>
                </div>
                <div class="col-auto my-1 px-0 search-submit">
                  <button type="submit" class="btn btn-success h-100 px-4">
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
          <!-- search-bar Low sizes -->
          <div class="search-bar d-block d-md-none search-bar-small">
            <form>
              <div class="">
                <div class="my-1 px-0 search-input">
                  <label class="sr-only" for="inlineFormInputName"
                    >Search for recruit</label
                  >
                  <input
                    type="text"
                    class="form-control pl-5 h-100"
                    id="inlineFormInputName"
                    placeholder="Search for talented Employee"
                  />
                  <div class="search-icon"><i class="fas fa-search"></i></div>
                </div>
                <div
                  class="my-1 px-0 w-100 mt-3 search-submit search-submit-small"
                >
                  <button
                    type="submit"
                    class="btn btn-block btn-success h-100 px-4"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
          <ul class="list-inline mt-4">
            <li class="list-inline-item">
              <p class="popular">Popular :</p>
            </li>
            <li class="list-inline-item popular-skill px-3 mx-2">
              Android
            </li>
            <li class="list-inline-item popular-skill px-3 mx-2">
              PHP
            </li>
            <li class="list-inline-item popular-skill px-3 mx-2">
              Flutter
            </li>
            <li class="list-inline-item popular-skill px-3 mx-2">
              UI/UX Design
            </li>
          </ul>
        </div>
        <div class="col-7"></div>
      </div>
    </div>
  </section>
  <section class="main-section py-0 py-md-5 d-block d-md-none">
    <div class="container py-md-5">
      <div class="row">
        <div class="col-12 col-md-7 my-5">
          <h1 class="main-title mb-4 d-none d-md-block">
            Find the best <i>employees</i> For your business
          </h1>
          <h1 class="main-title-small mb-4 d-block d-md-none">
            Find the best <i>employees</i> For your business
          </h1>
          <!-- search-bar high sizes-->
          <div class="search-bar d-none d-md-block">
            <form>
              <div class="d-flex flex-row">
                <div class="col-sm-10 my-1 px-0 search-input">
                  <label class="sr-only" for="inlineFormInputName"
                    >Search for recruit</label
                  >
                  <input
                    type="text"
                    class="form-control pl-5 h-100"
                    id="inlineFormInputName"
                    placeholder="Search for talented Employee"
                  />
                  <div class="search-icon"><i class="fas fa-search"></i></div>
                </div>
                <div class="col-auto my-1 px-0 search-submit">
                  <button type="submit" class="btn btn-success h-100 px-4">
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
          <!-- search-bar Low sizes -->
          <div class="search-bar d-block d-md-none search-bar-small">
            <form>
              <div class="">
                <div class="my-1 px-0 search-input">
                  <label class="sr-only" for="inlineFormInputName"
                    >Search for recruit</label
                  >
                  <input
                    type="text"
                    class="form-control pl-5 h-100"
                    id="inlineFormInputName"
                    placeholder="Search for talented Employee"
                  />
                  <div class="search-icon"><i class="fas fa-search"></i></div>
                </div>
                <div
                  class="my-1 px-0 w-100 mt-3 search-submit search-submit-small"
                >
                  <button
                    type="submit"
                    class="btn btn-block btn-success h-100 px-4"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
          <ul class="list-inline mt-4">
            <li class="list-inline-item">
              <p class="popular">Popular :</p>
            </li>
            <li class="list-inline-item popular-skill px-3 mx-2">
              Android
            </li>
            <li class="list-inline-item popular-skill px-3 mx-2">
              PHP
            </li>
            <li class="list-inline-item popular-skill px-3 mx-2">
              Flutter
            </li>
            <li class="list-inline-item popular-skill px-3 mx-2">
              UI/UX Design
            </li>
          </ul>
        </div>
        <div class="col-7"></div>
      </div>
    </div>
  </section>
  <section class="">
    <div class="container px-4">
      <h2 class="text-title">
        Popular categories
      </h2>
      <div class="row">
        <div class="col-12 col-sm-6 col-md-3 mb-3">
          <div class="category-img mx-auto mx-auto">
            <img
              src="@/assets/android.jpg"
              class="d-block img-fluid h-100 w-100"
            />
            <!-- Black img for Background -->
            <div class="background-img"></div>
            <!-- label for categories-->
            <div class="text-img pt-3 pl-3">
              <span class="d-block">Build your app</span>
              <h3 class="text-img-h3">
                Mobile Developement
              </h3>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3 mb-3">
          <div class="category-img mx-auto">
            <img
              src="@/assets/ui-ux-design.jpg"
              class="d-block img-fluid h-100 w-100"
            />
            <!-- Black img for Background -->
            <div class="background-img"></div>
            <!-- label for categories-->
            <div class="text-img pt-3 pl-3">
              <span class="d-block">Build your sketch</span>
              <h3 class="text-img-h3">
                UI/UX Design
              </h3>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3 mb-3">
          <div class="category-img mx-auto">
            <img
              src="@/assets/frontend.jpg"
              class="d-block img-fluid h-100 w-100"
            />
            <!-- Black img for Background -->
            <div class="background-img"></div>
            <!-- label for categories-->
            <div class="text-img pt-3 pl-3">
              <span class="d-block">Build your website</span>
              <h3 class="text-img-h3">
                Frontend Developement
              </h3>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3 mb-3">
          <div class="category-img mx-auto">
            <img
              src="@/assets/backend.jpg"
              class="d-block img-fluid h-100 w-100"
            />
            <!-- Black img for Background -->
            <div class="background-img"></div>
            <!-- label for categories-->
            <div class="text-img pt-3 pl-3">
              <span class="d-block">Build your server</span>
              <h3 class="text-img-h3">
                Backend Developement
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="steps-section m-0 py-4">
    <div class="container px-4 py-5">
      <h2 class="text-title">
        Easy 3 Steps to go with us
      </h2>
      <div class="row">
        <div class="col-12 col-sm-6 col-md-4 step mt-4">
          <div class="mx-auto text-center">
            <img
              src="@/assets/icons/register.png"
              alt=""
              class="d-block img-fluid icon-image mx-auto"
            />
            <h4 class="mt-4 mb-3">Register an account</h4>
            <p>
              Register your account now for free and try our services to recruit
              talented employees
            </p>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-4 step mt-4">
          <div class="mx-auto text-center">
            <img
              src="@/assets/icons/find.png"
              alt=""
              class="d-block img-fluid icon-image mx-auto"
            />
            <h4 class="mt-4 mb-3">Find an employee</h4>
            <p>
              Register your account now for free and try our services to recruit
              talented employees
            </p>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-4 step mt-4">
          <div class="mx-auto text-center">
            <img
              src="@/assets/icons/apply.png"
              alt=""
              class="d-block img-fluid icon-image mx-auto"
            />
            <h4 class="mt-4 mb-3">Apply for service</h4>
            <p>
              Register your account now for free and try our services to recruit
              talented employees
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="m-0 py-4">
    <div class="container px-4 py-5">
      <h2 class="text-title">
        Explore the marketplace
      </h2>
      <div class="row mt-4">
        <div class="col-6 col-md-3 mb-5">
          <div class="market-item">
            <img
              src="@/assets/svgs/ui-ux.svg"
              alt=""
              class="d-block img-fluid mx-auto"
            />
            <hr class="my-2" />
            <h5 class="w-100 text-center">Frontend Developement</h5>
          </div>
        </div>
        <div class="col-6 col-md-3 mb-5">
          <div class="market-item">
            <img
              src="@/assets/svgs/backend.svg"
              alt=""
              class="d-block img-fluid mx-auto"
            />
            <hr class="my-2" />
            <h5 class="w-100 text-center">Backend Developement</h5>
          </div>
        </div>
        <div class="col-6 col-md-3 mb-5">
          <div class="market-item">
            <img
              src="@/assets/svgs/programming.svg"
              alt=""
              class="d-block img-fluid mx-auto"
            />
            <hr class="my-2" />
            <h5 class="w-100 text-center">Programming</h5>
          </div>
        </div>
        <div class="col-6 col-md-3 mb-5">
          <div class="market-item">
            <img
              src="@/assets/svgs/marketing.svg"
              alt=""
              class="d-block img-fluid mx-auto"
            />
            <hr class="my-2" />
            <h5 class="w-100 text-center">Marketing</h5>
          </div>
        </div>
        <div class="col-6 col-md-3 mb-5">
          <div class="market-item">
            <img
              src="@/assets/svgs/contracts.svg"
              alt=""
              class="d-block img-fluid mx-auto"
            />
            <hr class="my-2" />
            <h5 class="w-100 text-center">Contracts</h5>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- high sizes -->
  <section class="testimonial pb-4 mb-0 d-none d-md-block">
    <div class="container">
      <h2 class="text-title text-center pt-5">
        What our clients say
      </h2>
      <div class="gtco-testimonials">
        <Carousel :items-to-show="1.5" :wrap-around="true">
          <Slide v-for="slide in slides" :key="slide">
            <div>
              <div class="card text-center">
                <img
                  class="card-img-top"
                  :src="getImgUrl(slide.image)"
                  alt=""
                />
                <div class="card-body">
                  <h5>
                    {{ slide.name }} <br />
                    <span> Project Manager </span>
                  </h5>
                  <p class="card-text">
                    {{ slide.paragraph }}
                  </p>
                </div>
              </div>
            </div>
          </Slide>
          <template #addons>
            <Pagination />
          </template>
        </Carousel>
      </div>
    </div>
  </section>
  <!-- Low sizes -->
  <section class="testimonial testimonial-small pb-4 mb-0 d-block d-md-none">
    <div class="container">
      <h2 class="text-title text-center pt-5">
        What our clients say
      </h2>
      <div class="gtco-testimonials">
        <Carousel :items-to-show="1" :wrap-around="true">
          <Slide v-for="slide in slides" :key="slide">
            <div>
              <div class="card text-center">
                <img
                  class="card-img-top"
                  :src="getImgUrl(slide.image)"
                  alt=""
                />
                <div class="card-body">
                  <h5>
                    {{ slide.name }} <br />
                    <span> Project Manager </span>
                  </h5>
                  <p class="card-text">
                    {{ slide.paragraph }}
                  </p>
                </div>
              </div>
            </div>
          </Slide>
          <template #addons>
            <Pagination />
          </template>
        </Carousel>
      </div>
    </div>
  </section>
  <Footer></Footer>
</template>

<script>
import "vue-js-modal/dist/styles.css";
import { defineComponent } from "vue";
import { Carousel, Pagination, Slide } from "vue3-carousel";
import Footer from "../components/layout/Footer.vue";

import "vue3-carousel/dist/carousel.css";
export default defineComponent({
  name: "Home",
  components: {
    Carousel,
    Slide,
    Pagination,
    Footer,
    //Navigation,
  },
  data() {
    return {
      client1: {
        name: "Benaicha Mohamed amine",
        image: "benaicha",
        paragraph:
          " “ Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat ” ",
      },
      client2: {
        name: "Amiri Mohamed",
        image: "amiri",
        paragraph:
          " “ Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat ” ",
      },
      client3: {
        name: "Elattar Mohamed",
        image: "elattar",
        paragraph:
          " “ Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat ” ",
      },
      section_class: null,
      section_class_array: [
        "main-section-first",
        "main-section-second",
        "main-section-third",
      ],
      changeBackgroundArray: [true, false, false],
    };
  },
  watch: {},
  computed: {
    slides() {
      let slides = [this.client1, this.client2, this.client3];
      return slides;
    },
    counter() {
      return this.$store.getters.getCounter;
    },
  },
  methods: {
    getImgUrl(pic) {
      return require("@/assets/images/" + pic + ".jpg");
    },
    changeClassBackground: function() {
      /*let counter = this.counter;
      this.intervalid = setInterval(
        function() {
          if (counter == 3) {
            console.log("init");
            counter = 0;
          }
          console.log("change");
          this.section_class = this.section_class_array[counter];
          counter++;
        }.bind(this),
        8000
      );
      */
    },
    changeBackground() {
      let counter = this.counter;
      this.intervalid = setInterval(
        function() {
          if (counter == 3) {
            counter = 0;
          }
          for (let i = 0; i < 3; i++) {
            if (i == counter) {
              this.changeBackgroundArray[i] = true;
            } else {
              this.changeBackgroundArray[i] = false;
            }
          }
          counter++;
        }.bind(this),
        8000
      );
    },
  },
  mounted() {
    this.section_class = this.section_class_array[0];
    this.changeBackground();
    //this.changeClassBackground();
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@900&display=swap");
@import url("https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700");
.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
section {
  margin-bottom: 7rem;
}
.main-section {
  background-color: #023a15 !important;
  position: relative;
}
.background-image {
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  -webkit-animation: fade 2s linear;
  animation: fade 2s linear;
  -webkit-transition: opacity 0.9s;
  -o-transition: opacity 0.9s;
  transition: opacity 0.9s;
}
.main-section-first {
  background-color: #023a15 !important;
  background-image: url("~@/assets/images/fiverr-background.png");
  background-position: center;
}
.main-section-second {
  background-color: #7d1a00 !important;
  background-image: url("~@/assets/images/background2.png");
  background-position: center;
}
.main-section-third {
  background-color: #b64762 !important;
  background-image: url("~@/assets/images/background3.png");
  background-position: center;
}
.main-title,
.main-title-small {
  font-family: "Roboto", sans-serif;
  font-size: 48px;
  line-height: 56px;
  color: #fff;
  font-weight: 500;
  font-family: "Open Sans", sans-serif;
}
.main-title-small {
  font-size: 38px;
}
.btn-browse {
  padding: 10px 24px;
  color: #ffffff;
  border: 3px solid #ffffff;
  border-radius: 25px;
  font-weight: 500;
  font-family: "Open Sans", sans-serif;
  transition: all 0.3s ease;
}
.btn-browse:hover {
  color: #fff;
  text-decoration: none;
  border: 3px solid gray;
}
.btn-browse:focus {
  box-shadow: 0 0 0 0.2rem rgba(57, 58, 59, 0.25);
}
.list {
  list-style-type: none;
  color: #fff;
  font-weight: 500;
  font-family: "Open Sans", sans-serif;
}
.main-section h5 {
  font-size: 20px;
  color: #fff;
  letter-spacing: 0;
  line-height: 28px;
  font-weight: 400;
  font-style: normal;
  font-family: "Open Sans", sans-serif;
}
.second-section h1 {
  font-size: 45px;
  color: #02295c !important;
  text-align: center;
  line-height: 66px;
  font-weight: 500;
  font-family: "Open Sans", sans-serif;
}

/*
* Search Css
*/
.search-input,
.search-submit {
  height: 46px;
}
.search-input {
  position: relative;
}
.search-input input {
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
.search-submit button {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-color: #19a463 !important;
  font-weight: 600;
}
.search-submit-small button,
.search-bar-small input {
  border-radius: 7px;
}
.search-icon {
  position: absolute;
  left: 3%;
  top: 16.5%;
  color: #ced4da;
  font-weight: 600;
  font-size: 20px;
}
.popular {
  color: #fff;
  font-family: "Open Sans", sans-serif;
  font-size: 14px;
  line-height: 27px;
  font-weight: 600;
  color: #fff;
}
.popular-skill {
  font-family: "Open Sans", sans-serif;
  line-height: 24px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  padding: 1px 12px 0;
  border: 1px solid #fff;
  border-radius: 40px;
}
/*
*   Second Section
*/
.text-title {
  font-family: "Open Sans", sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: #404145;
  padding-bottom: 24px;
  margin: 0;
}
.category-img {
  position: relative;
}
.category-img {
  height: 345px;
  max-width: 245px;
}
.background-img {
  height: 345px;
  width: 100%;
  position: absolute;
  top: 0%;
  left: 0%;
  background-color: #0000002b;
}
.text-img {
  position: absolute;
  top: 0%;
  left: 0%;
  z-index: 2;
  color: #fff;
  font-family: "Nunito", sans-serif;
}
.text-img span {
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
}
.text-img h3 {
  font-size: 1.5rem !important;
  line-height: 130%;
}

/*
*   Third Section
*/
.steps-section {
  background-color: #f1fdf7;
}
.icon-image {
  width: 75px;
  height: 75px;
}
.step {
  font-family: "Open Sans", sans-serif;
  color: #000;
}
.step h4 {
  font-weight: 600;
}
.step p {
  color: gray;
}
/*
*   Fourth Section
*/
.market-item {
  transition: 0.3s;
}
.market-item img {
  width: 48px;
  height: 48px;
}
.market-item h5 {
  color: #222325;
  position: relative;
  display: inline-block;
  cursor: pointer;
  transition: color 0.2s;
}
.market-item hr {
  width: 20%;
  font-weight: 500;
  height: 1px;
  background-color: #c5c6c9;
  transition: 0.3s;
}
.market-item:hover hr {
  width: 50%;
  background-color: #1dbf73;
}

/*
*   Testimonials
*/
.testimonial {
  background-color: #f5f5f5;
}
@import url("https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700");
.gtco-testimonials {
  position: relative;
  margin-top: 30px;
}
@media (max-width: 767px) {
  .gtco-testimonials {
    margin-top: 20px;
  }
}
.gtco-testimonials h2 {
  font-size: 30px;
  text-align: center;
  margin-bottom: 50px;
  color: #ffffff;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
  letter-spacing: 2px;
}
.gtco-testimonials .owl-stage-outer {
  padding: 30px 0;
}
.gtco-testimonials .owl-nav {
  display: none;
}
.gtco-testimonials .owl-dots {
  text-align: center;
}
.gtco-testimonials .owl-dots span {
  position: relative;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  display: block;
  background: #fff;
  border: 2px solid #1dbf73;
  margin: 0 5px;
}
.gtco-testimonials .owl-dots .active {
  box-shadow: none;
}
.gtco-testimonials .owl-dots .active span {
  background: #1dbf73;
  box-shadow: none;
  height: 12px;
  width: 12px;
  margin-bottom: -1px;
}
.gtco-testimonials .card {
  background: #fff;
  box-shadow: 0 8px 30px -7px #c9dff0;
  margin: 0 20px;
  padding: 0 10px;
  border-radius: 20px;
  border: 0;
}
.gtco-testimonials .card .card-img-top {
  max-width: 100px;
  border-radius: 50%;
  margin: 15px auto 0;
  box-shadow: 0 8px 20px -4px #95abbb;
  width: 100px;
  height: 100px;
}
.gtco-testimonials .card h5 {
  color: #1dbf73;
  font-size: 24px;
  line-height: 1.3;
  font-weight: 600;
}
.gtco-testimonials .card h5 span {
  font-size: 18px;
  color: #666666;
}
.gtco-testimonials .card p {
  font-size: 18px;
  color: #555;
  padding-bottom: 15px;
}
.gtco-testimonials .active {
  opacity: 0.5;
  transition: all 0.3s;
}
.gtco-testimonials .center {
  opacity: 1;
}
.gtco-testimonials .center h5 {
  font-size: 24px;
}
.gtco-testimonials .center h5 span {
  font-size: 20px;
}
.gtco-testimonials .center .card-img-top {
  max-width: 100%;
  height: 120px;
  width: 120px;
}
.owl-carousel .owl-nav button.owl-next,
.owl-carousel .owl-nav button.owl-prev,
.owl-carousel button.owl-dot {
  outline: 0;
}
.carousel__pagination-button--active {
  background-color: #1dbf73 !important;
}
.carousel__pagination-button {
  background-color: #1dbf7369 !important;
}
.testimonial-small .carousel__pagination {
  padding-left: 0px;
}
.testimonial-small
  .carousel__pagination
  .carousel__pagination-item
  .carousel__pagination-button--active {
  background-color: #1dbf73 !important;
}
.testimonial-small .carousel__pagination .carousel__pagination-item button {
  background-color: #1dbf7369 !important;
}
</style>
