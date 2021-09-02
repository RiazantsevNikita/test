<template>
  <div
    class="uk-position-relative uk-visible-toggle uk-light slider"
    style="margin-bottom: 40px"
    tabindex="-1"
    uk-slideshow="autoplay: true; ratio: 7:3"
  >
    <ul class="uk-slideshow-items">
      <li v-for="item in data.slides" :key="item">
          <img
            :src="image(item)"
            width="100%"
            height="auto"
            alt=""
            uk-cover
            uk-img="target: !.uk-slideshow-items"
          />
      </li>
    </ul>

    <a
      class="uk-position-center-left uk-position-small uk-hidden-hover"
      href="#"
      uk-slidenav-previous
      uk-slideshow-item="previous"
    ></a>
    <a
      class="uk-position-center-right uk-position-small uk-hidden-hover"
      href="#"
      uk-slidenav-next
      uk-slideshow-item="next"
    ></a>
  </div>
</template>

<script>
import { API } from "../api/index";
import imagesHelper from "../helper/image";

export default {
  name: "Slider",
  data() {
    return {
      data: []
    };
  },
  metaInfo() {
    return {
      link: [
      // { rel: 'preload', href: this.image(this.data.slides[0]), as: 'image', type: "image/avif" }
    ]
    };
  },
  mounted() {
    API.post("get-slider").then((response) => {
      this.data = response.data;
    });
  },
  serverPrefetch() {
    return API.post("get-slider")
      .then((response) => {
        this.data = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    image: function(item) {
      return imagesHelper(item);
    }
  }
};
</script>

<style scoped>
.slider {
  max-height: 550px;
  /* width: 90%; */
  overflow: hidden;
}
</style>