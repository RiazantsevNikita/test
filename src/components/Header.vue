<template>
  <div
    uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky"
  >
    <nav
      class="
        uk-navbar-container
        uk-navbar-transparent
        uk-background-secondary
        uk-light
        uk-margin
      "
      uk-navbar="mode: click"
    >
      <div class="uk-navbar-left uk-margin-large-left">
        <a class="uk-navbar-item uk-logo header-logo" href="/">ORINICE</a>
      </div>
      <div class="uk-navbar-right desktop-menu">
        <ul class="uk-navbar-nav">
          <li v-for="(item, index) in menu" :key="index">
            <a :href="item.href">{{ item.name }}</a>
            <div
              v-if="item.type == 'one' || item.type == 'two'"
              class="uk-navbar-dropdown uk-navbar-dropdown-width-2"
            >
              <div class="uk-navbar-dropdown-grid uk-child-width-1-2" uk-grid>
                <div>
                  <ul class="uk-nav uk-navbar-dropdown-nav">
                    <li
                      v-for="(v, i) in item.menu"
                      :key="i"
                      :class="
                        v.type == 'title'
                          ? 'uk-nav-header'
                          : v.type == 'separator'
                          ? 'uk-nav-divider'
                          : ''
                      "
                    >
                      <a v-if="v.type == 'href'" :href="v.href">{{ v.name }}</a>
                      <span v-if="v.type == 'title'">{{ v.name }}</span>
                    </li>
                  </ul>
                </div>
                <div v-if="item.type == 'two'">
                  <ul class="uk-nav uk-navbar-dropdown-nav">
                    <li class="uk-active"><a href="#">Active</a></li>
                    <li><a href="#">Item</a></li>
                    <li class="uk-nav-header">Header</li>
                    <li><a href="#">Item</a></li>
                    <li><a href="#">Item</a></li>
                    <li class="uk-nav-divider"></li>
                    <li><a href="#">Item</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <!-- <ul class="uk-navbar-nav">
        <li class="uk-active"><a href="#">Active</a></li>
        <li>
          <a href="#">Parent</a>
          <div class="uk-navbar-dropdown">
            <ul class="uk-nav uk-navbar-dropdown-nav">
              <li class="uk-active"><a href="#">Active</a></li>
              <li><a href="#">Item</a></li>
              <li><a href="#">Item</a></li>
            </ul>
          </div>
        </li>
        <li><a href="#">Item</a>
          <div class="uk-navbar-dropdown uk-navbar-dropdown-width-2">
            <div class="uk-navbar-dropdown-grid uk-child-width-1-2" uk-grid>
              <div>
                <ul class="uk-nav uk-navbar-dropdown-nav">
                  <li class="uk-active"><a href="#">Active</a></li>
                  <li><a href="#">Item</a></li>
                  <li class="uk-nav-header">Header</li>
                  <li><a href="#">Item</a></li>
                  <li><a href="#">Item</a></li>
                  <li class="uk-nav-divider"></li>
                  <li><a href="#">Item</a></li>
                </ul>
              </div>
              <div>
                <ul class="uk-nav uk-navbar-dropdown-nav">
                  <li class="uk-active"><a href="#">Active</a></li>
                  <li><a href="#">Item</a></li>
                  <li class="uk-nav-header">Header</li>
                  <li><a href="#">Item</a></li>
                  <li><a href="#">Item</a></li>
                  <li class="uk-nav-divider"></li>
                  <li><a href="#">Item</a></li>
                </ul>
              </div>
            </div>
          </div>
        </li>
      </ul> -->
      </div>
      <div class="uk-navbar-right">
        <ul class="uk-navbar-nav">
          <li>
            <a class="uk-navbar-toggle">
              <font-awesome-icon icon="globe-europe" size="2x" />
              <span class="language-text">{{ activeCountry.code }}</span>
              <font-awesome-icon icon="angle-down" size="2x" />
            </a>
            <div class="uk-navbar-dropdown" id="countrySelector">
              <ul class="uk-nav uk-navbar-dropdown-nav">
                <li v-for="(item, index) in countries" :key="index">
                  <a href="" @click="changeCountry(item)">{{ item.name }}</a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div class="uk-navbar-right mobile-menu">
        <ul class="uk-navbar-nav">
          <li>
            <a class="uk-navbar-toggle" uk-navbar-toggle-icon="ratio: 1.5"></a>
            <div class="uk-navbar-dropdown mobile-main-menu">
              <ul class="uk-nav uk-navbar-dropdown-nav">
                <li
                  v-for="(v, i) in mobileMenu"
                  :key="i"
                  :class="
                    v.type == 'title'
                      ? 'uk-nav-header'
                      : v.type == 'separator'
                      ? 'uk-nav-divider'
                      : ''
                  "
                >
                  <a v-if="v.type == 'href'" :href="v.href">{{ v.name }}</a>
                  <span v-if="v.type == 'title'">{{ v.name }}</span>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { API } from "../api/index.js";

export default {
  name: "Header",
  data() {
    return {
      menu: [],
      mobileMenu: [],
      countries: [],
      activeCountry: {},
      ipCountry: {},
      widthDevice: this.$screen.width,
    };
  },
  mounted() {
    API.post("get-all-contries").then((response) => {
      this.countries = response.data;
    });
  },
  methods: {
    changeCountry: function (item) {
      this.$store.commit("setCountry", item);
    },
    getAllMenu: function () {
      API.post("get-all-menu").then((response) => {
        let menus = response.data;
        let localCountry = this.country._id;
        menus.forEach((el) => {
          if (el.mobile == true && el.country._id == localCountry) {
            this.mobileMenu = el.menu;
          } else if (el.mobile == false && el.country._id == localCountry) {
            this.menu = el.menu;
          }
        });
      });
    },
  },
  computed: {
    country() {
      return this.$store.state.country;
    }
  },
  watch: {
    "$screen.width"(val) {
      this.widthDevice = val;
    },
    country: function(val) {
      this.activeCountry = val;
      this.getAllMenu();
    }
  },
};
</script>

<style scoped>
.header-logo {
  font-family: "Squada One", cursive;
  color: white !important;
  font-size: 42px;
}
.mobile-main-menu {
  width: 100%;
  margin-top: -20px;
  left: 0px !important;
  text-align: center;
}
.uk-navbar-dropbar-slide {
  height: 100%;
}
.uk-navbar-right {
  margin-left: 0px;
}
.language-text {
  margin-right: 5px;
  font-size: 24px;
  margin-left: 5px;
}
@media screen and (max-width: 991px) {
  .desktop-menu {
    display: none;
  }
}

@media screen and (min-width: 991px) {
  .mobile-menu {
    display: none;
  }
}
</style>