<template>
  <footer id="main-footer">
    <div class="container-md mx-lg-5 px-md-4">
      <div class="row pt-5">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <ul class="footer-list">
            <li class="footer-list-item footer-logo-image mb-3 header-logo">
              <a href="#">
                <h1 class="logo-text">Recruit <span>.</span></h1>
              </a>
            </li>
            <li class="footer-list-item mb-3">
              <p>
                Ipsum dolor sit amet, consecterelit, sed do eiusmod tempor
                incididunt.Ipsum dolor sit amet, consecterelit, sed do eiusmod
                tempor incididunt.
              </p>
            </li>
            <li class="footer-list-item mb-3">
              <i class="fas fa-map mr-2"></i>
              Agadir cite eddakhla
            </li>
            <li class="footer-list-item mb-3">
              <i class="fas fa-phone-alt mr-2"></i>
              +2126-45367678
            </li>
            <li class="footer-list-item mb-3">
              <i class="fas fa-envelope mr-2"></i>
              agency@contact.com
            </li>
          </ul>
        </div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <ul class="footer-list">
            <li class="footer-list-item footer-list-title mb-4 pb-2 ml-3">
              Departement
            </li>
            <li class="footer-list-item footer-list-item-hover mb-3">
              <i class="fas fa-angle-double-right footer-icone"></i>
              <a href="#" class="d-inline">Notre agence</a>
            </li>
            <li class="footer-list-item footer-list-item-hover mb-3">
              <i class="fas fa-angle-double-right footer-icone"></i>
              <a href="#" class="d-inline">a propos</a>
            </li>
            <li class="footer-list-item footer-list-item-hover mb-3">
              <i class="fas fa-angle-double-right footer-icone"></i>
              <a href="#" class="d-inline">about us</a>
            </li>
            <li class="footer-list-item footer-list-item-hover mb-3">
              <i class="fas fa-angle-double-right footer-icone"></i>
              <a href="#" class="d-inline">contactez nous</a>
            </li>
          </ul>
        </div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <ul class="footer-list">
            <li class="footer-list-item footer-list-title mb-4 pb-2 ml-3">
              Quick links
            </li>
            <li class="footer-list-item footer-list-item-hover mb-3">
              <i class="fas fa-angle-double-right footer-icone"></i>
              <a href="#" class="d-inline">Notre agence</a>
            </li>
            <li class="footer-list-item footer-list-item-hover mb-3">
              <i class="fas fa-angle-double-right footer-icone"></i>
              <a href="#" class="d-inline">a propos</a>
            </li>
            <li class="footer-list-item footer-list-item-hover mb-3">
              <i class="fas fa-angle-double-right footer-icone"></i>
              <a href="#" class="d-inline">about us</a>
            </li>
            <li class="footer-list-item footer-list-item-hover mb-3">
              <i class="fas fa-angle-double-right footer-icone"></i>
              <a href="#" class="d-inline">contactez nous</a>
            </li>
          </ul>
        </div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 px-5 px-md-1 mb-4">
          <div class="work-box px-3 py-1">
            <ul class="work-list px-2 mb-0">
              <li class="work-list-item py-4">
                Lundi - Vendredi
                <span>09:00 AM - 19:00 PM</span>
              </li>
              <li class="work-list-item py-4">
                Samedi
                <span>09:00 AM - 13:00 PM</span>
              </li>
              <li class="work-list-item py-4">
                Dimanche
                <span>Seulement les cas urgents</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  setup() {},
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Oxygen:wght@700&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@900&display=swap');
h1.logo-text{
  font-family: 'Nunito', sans-serif;
  font-size: 30px;
  color:#fff;
}
.logo-text span{
  color:#1dbf73;
  font-weight: bold;
  font-size: 40px;
}
ul {
  list-style-type: none;
}
#main-footer {
  background-color: #141414;
}
.footer-list-item {
  line-height: 25px;
  margin-bottom: 9px;
  color: #fff;
  font-size: 15px;
}
.footer-logo-image img {
  width: 170px;
}
.footer-list-item p {
  font-family: "Roboto", sans-serif;
  font-size: 15px;
}
.footer-list-item i {
  color: #1dbf73 !important;
}

.footer-list-title {
  color: #ffffff;
  font-size: 20px;
  font-family: "Oxygen", sans-serif;
  font-weight: bold;
}
.footer-list-title::before {
  content: "";
  width: 50px;
  height: 4px;
  background-color: #1dbf73;
  left: 0;
  position: absolute;
  top: 40px;
  left: 72px;
}
.footer-list-item-hover a {
  display: block;
  color: #f7f7f7;
  font-size: 14px;
  font-family: "Oxygen";
  font-weight: 500;
  position: relative;
  padding-left: 0;
}
.footer-list-item-hover i {
  visibility: hidden;
  transition: all 0.4s ease;
}
.footer-list-item-hover:hover a {
  padding-left: 10px;
  -webkit-transition: all 0.4s ease;
  -o-transition: all 0.4s ease;
  transition: all 0.4s ease;
  color: #129de8;
  text-decoration: none;
}
.footer-list-item-hover:hover i {
  -webkit-transition: all 0.4s ease;
  -o-transition: all 0.4s ease;
  transition: all 0.4s ease;
  visibility: visible;
  color: #fff !important;
}
.work-box {
  background-color: #f6f6f6;
  border-radius: 15px;
}
.work-list-item {
  font-family: "Oxygen", sans-serif;
  font-weight: bold;
  font-size: 14px;
  display: inline-block;
  vertical-align: middle;
  width: 100%;
  color: #1dbf73 !important;
  border-bottom: 1px solid #cbcbcb;
}
.work-list-item span {
  color: #666666;
  font-size: 14px;
  display: block;
  font-weight: 500;
}
.work-list-item:last-child {
  border-bottom: 0px solid #cbcbcb;
}
</style>
