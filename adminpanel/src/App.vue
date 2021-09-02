<template>
  <div id="app">
    <div v-if="token">
      <Header />
      <Sidebar />
      <router-view />
    </div>
    <div v-else>
      <Auth />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Sidebar from "./components/Sidebar.vue";
import Header from "./components/HeaderNav.vue";
import Auth from "./components/Auth.vue";

export default Vue.extend({
  name: "AdminPanel",
  components: {
    Sidebar,
    Header,
    Auth,
  },
  data() {
    return {
      token: false,
    };
  },
  mounted() {
    if (localStorage.token) {
      this.token = true;
    }
  },
});
</script>