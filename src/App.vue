<template>
  <div class="main">
    <Header style="margin-bottom: 100px" />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { API } from "./api/index.js";
import axios from "axios";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  metaInfo: {
    meta: [{ charset: "utf-8" }],
  },
  mounted() {
    API.post("get-all-contries").then((response) => {
      this.countries = response.data;
      if (localStorage.country) {
        this.$store.commit("setCountry", JSON.parse(localStorage.country));
      } else {
        axios
          .get("https://ipapi.co/json/")
          .then((response) => {
            let index = this.countries.findIndex(
              (item) =>
                item.code.toLowerCase() ===
                response.data.country_code.toLowerCase()
            );
            if (index === -1) {
              let index = this.countries.findIndex(
                (item) => item.code.toLowerCase() === "ru"
              );
              if (index === -1) {
                this.$store.commit("setCountry", this.countries[0]);
                localStorage.country = JSON.stringify(this.countries[0]);
              } else {
                this.$store.commit("setCountry", this.countries[index]);
                localStorage.country = JSON.stringify(this.countries[index]);
              }
            } else {
              this.$store.commit("setCountry", this.countries[index]);
              localStorage.country = JSON.stringify(this.countries[index]);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  },
};
</script>
