<template>
  <div class="profile-card h-100">
    <div class="profile-card-content px-4 ">
      <ul class="list-inline pb-4 pt-3">
        <li class="lixt-inline-item float-left">
          <span class="available px-3 py-1">available</span>
        </li>
      </ul>
      <!-- User Image -->
      <img
        :src="
          'http://localhost:8000/storage/candidates_images/' +
            candidate.id +
            '/' +
            candidate.candidate_image
        "
        :alt="'candidate ' + candidate.id  + ' profile image'"
        class="d-block img-fluid img-profile mb-4"
      />
      <h4 class="text-center">
        <a href="#" class="profile-name">{{
          candidate.label
        }}</a>
      </h4>
      <span class="d-block mt-3 text-center work"
        ><i class="fa fa-user mr-2"></i>freelancer</span
      >

      <ul class="list-inline mx-auto d-flex justify-content-center mt-3 pl-4">
        <li
          class="list-inline-item mr-2"
          v-for="(skill, index) in skills"
          :key="skill.id"
        >
          <span class="skill px-3 py-1" v-if="index < 2">{{ skill.name }}</span>
          <span class="skill-over px-3 py-1" v-if="index == 2"
            >+{{ skills.length - 2 }}</span
          >
        </li>
      </ul>

      <p class="description text-center mt-4">
        Mohamed Amine is a developper and designer ready to work
      </p>

      <hr class="mx-auto" />

      <div class="text-center mt-3 pb-3">
        <a
          class="profile-link"
          href="#"
          @click.prevent="visitCandidateProfile(candidate.id)"
        >
          VIEW PROFILE</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["actifCandidate", "skills"],
  data() {
    return {};
  },
  computed: {
    candidate() {
      return this.actifCandidate;
    },
  },
  methods: {
    visitCandidateProfile(id) {
      this.$router.push({ path: `/browse/candidate/${id}` });
    },
  },
};
</script>

<style scoped>
.profile-card {
  background-color: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.available {
  background-color: #56d48f;
  color: #fff;
  border-radius: 15px;
  font-weight: 600;
}
.price {
  color: #3c495a;
  font-weight: 600;
  font-size: 1.1rem;
}
.img-profile {
  width: 130px;
  height: 130px;
  border-radius: 100%;
  margin: 0 auto;
  clear: both;
}
.profile-name {
  color: #3c495a;
  font-weight: 600;
  text-transform: capitalize;
  text-decoration: none;
}
.work {
  color: #56d48f;
  font-weight: 600;
  text-transform: capitalize;
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
.description {
  color: #838e9c;
  font-weight: 600;
}
hr {
  color: gray;
  width: 30%;
}
.profile-link {
  text-transform: uppercase;
  color: #445060;
  font-weight: 600;
  text-decoration: none;
}
</style>
