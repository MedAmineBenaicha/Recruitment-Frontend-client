<template>
  <section class="main-section py-5">
    <div class="container">
      <div class="row">
        <div class="col-5 my-5 ">
          <div class="d-flex justify-content-center align-items-center mb-4">
            <div class="main-title">
              hire the best profiles
            </div>
          </div>
          <h5 class="mb-4">
            Save up to 60% on costs and development time<br />
          </h5>
          <router-link class="btn btn-browse" to="browse">
            Browse Profiles
          </router-link>
        </div>
        <div class="col-7"></div>
      </div>
    </div>
  </section>
  <section class="second-section py-5">
    <div class="container">
      <h1 class="text-center">
        The # 1 Recruiting Platform for Qualified Sales Candidates.
      </h1>
    </div>
  </section>
</template>

<script>
import "vue-js-modal/dist/styles.css";

export default {
  name: "Home",
  data() {
    return {
      
    };
  },
  methods: {
    
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&display=swap");

.main-section {
  background-color: #001a3b !important;
}
.main-title {
  font-size: 62px;
  color: #fff;
  font-weight: 500;
  font-family: "Open Sans", sans-serif;
  text-transform: capitalize;
}
.btn-browse {
  padding: 10px 24px;
  color: #ffffff;
  border: 3px solid #ffffff;
  border-radius: 25px;
  font-weight: 500;
  font-family: "Open Sans", sans-serif;
  transition: all .3s ease;
}
.btn-browse:hover{
  color:#fff;
  text-decoration: none;
  border: 3px solid gray;
}
.btn-browse:focus{
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
</style>
