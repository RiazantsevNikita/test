<template>
  <div
    class="modal-body"
    :uk-slideshow="`ratio: 1:1; autoplay: false; index: ${activeSlide}`"
  >
    <font-awesome-icon
      icon="times"
      size="2x"
      class="fullscreen-button"
      @click="$emit('close')"
    />
    <div class="image-container">
      <div
        class="uk-position-relative uk-visible-toggle uk-light catalog-slider"
        tabindex="-1"
        style="height: 100%"
      >
        <ul class="uk-slideshow-items" id="catalog">
          <li
            v-for="(item, index) in catalog.pages"
            :key="index"
            @contextmenu.stop.prevent=""
            class="img-magnifier-container"
          >
            <img
              v-lazy="image(item, '1440p/', true)"
              width="100%"
              :id="`image-${index}`"
              height="auto"
              alt=""
              uk-cover
              class="slider-image"
              uk-img="target: !.uk-slideshow-items"
            />
          </li>
        </ul>
        <a
          class="uk-position-center-left uk-position-small"
          href="#"
          uk-slidenav-previous
          uk-slideshow-item="previous"
        ></a>
        <a
          class="uk-position-center-right uk-position-small"
          href="#"
          uk-slidenav-next
          uk-slideshow-item="next"
        ></a>
      </div>
    </div>
    <div class="scroll-container" style="height: 15%">
      <div class="uk-position-small" style="height: 100%">
        <ul
          class="uk-thumbnav"
          style="
            overflow-x: scroll;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            height: 100%;
            align-items: center;
          "
        >
          <li
            :uk-slideshow-item="index"
            v-for="(item, index) in catalog.pages"
            :key="index"
            style="flex-shrink: 0"
            @contextmenu.stop.prevent=""
          >
            <a href="#"
              ><img v-lazy="image(item, '720p/')" width="100" alt=""
            /></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import imagesHelper from "../helper/image";

export default {
  name: "ModalCatalog",
  props: {
    catalog: Object,
    activeSlide: Number,
  },
  mounted() {
    // this.magnify("image-0", 3);
  },
  methods: {
    image: function (item, width, notAvif = false) {
      return imagesHelper(item, width, notAvif);
    }
  }
};
</script>

<style scoped>
.modal-body {
  z-index: 10000000000;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: black;
  top: 0px;
  left: 0px;
}
.fullscreen-button {
  position: absolute;
  top: 5px;
  right: 10px;
  color: white;
  z-index: 100;
  cursor: pointer;
}
.image-container {
  height: 80%;
}
.slider-image {
  max-width: 100%;
  max-height: 90%;
  width: auto !important;
  height: auto !important;
  margin-top: 2%;
}
.uk-slideshow-items {
  height: 100%;
  min-height: 100% !important;
}
.img-magnifier-container {
  position: relative;
}

.img-magnifier-glass {
  position: absolute;
  border: 3px solid #000;
  border-radius: 50%;
  cursor: none;
  /*Установите размер стекла лупы:*/
  width: 100px;
  height: 100px;
}
</style>