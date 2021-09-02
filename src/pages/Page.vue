<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-lg-12 text-center">
          <h1>{{ page.title }}</h1>
        </div>
      </div>
    </div>
    <Catalog :catalog="page.catalog" />
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div v-html="page.text" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Catalog from "../components/Catalog.vue";
import CatalogSlider from "../components/CatalogSlider.vue";
import Footer from "../components/Footer.vue";
import { API } from "../api/index.js";

export default {
  components: {
    Header,
    CatalogSlider,
    Catalog,
    Footer,
  },
  data() {
    return {
      data: [],
      page: {}
    };
  },
  metaInfo() {
    return {
      title: this.page.metaTitle ? this.page.metaTitle : "Title",
      meta: [
        {
          name: "description",
          content: this.page.metaDescription
            ? this.page.metaDescription
            : "desc"
        }
      ]
    };
  },
  computed: {
    country() {
      return this.$store.state.country;
    }
  },
  watch: {
    country: function() {
      this.selectPage();
    }
  },
  methods: {
    selectPage: function () {
      let index = this.data.findIndex(item => item.country._id === this.country._id);
      if (index !== -1) {
        this.page = this.data[index];
      }
    }
  },
  serverPrefetch() {
    return API.post("get-href-page", { href: this.$route.path})
      .then((response) => {
        this.page = response.data[0];
      })
      .catch((error) => {
        console.log(error);
      });
  },
  mounted() {
    API.post("get-href-page", { href: this.$route.path})
      .then((response) => {
        this.data = response.data;
        this.selectPage();
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>