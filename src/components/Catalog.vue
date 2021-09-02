<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-sm-12"></div>
        <div class="col-lg-6 col-sm-12">
          <div
            class="
              uk-position-relative uk-visible-toggle uk-light
              catalog-slider
              
            "
            
            tabindex="-1"
            uk-slideshow="ratio: 1:1; autoplay: false"
          >
            <ul class="uk-slideshow-items" id="catalog">
              <li
                v-for="(item, index) in catalog.pages"
                :key="index"
                @contextmenu.stop.prevent=""
                class="img-magnifier-container"
              >
                <img
                  v-lazy="image(item, '720p/')"
                  width="100%"
                  :id="`image-${index}`"
                  height="auto"
                  alt=""
                  uk-cover
                  uk-img="target: !.uk-slideshow-items"
                />
              </li>
            </ul>
            <font-awesome-icon
              icon="expand"
              size="2x"
              class="fullscreen-button"
              @click="openModal()"
            />
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

            <div class="uk-position-small">
              <ul
                class="uk-thumbnav"
                style="
                  overflow-x: scroll;
                  display: flex;
                  flex-direction: row;
                  flex-wrap: nowrap;
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
        <div class="col-lg-3" col-sm-12></div>
      </div>
    </div>
    <modal-catalog
      v-if="modal"
      @close="modal = false"
      :catalog="catalog"
      :activeSlide="activeSlide"
    />
  </div>
</template>

<script>
import imagesHelper from "../helper/image";
import ModalCatalog from "./ModalCatalog.vue";

export default {
  name: "Slider",
  props: {
    catalog: Object,
  },
  components: {
    ModalCatalog,
  },
  data() {
    return {
      modal: false,
      activeSlide: 0,
      mouseX: 0,
      mouseY: 0,
    };
  },
  methods: {
    image: function (item, width) {
      return imagesHelper(item, width);
    },
    openModal: function () {
      let sliderElements = document.getElementById("catalog").childNodes;
      for (let i = 0; i < sliderElements.length; i++) {
        if (sliderElements[i].classList.contains("uk-active")) {
          this.activeSlide = i;
          break;
        }
      }
      this.modal = true;
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.catalog-slider {
  max-height: 70%;
}
.uk-thumbnav li {
  padding: 10px;
}
.uk-thumbnav {
  justify-content: start;
}
.fullscreen-button {
  color: black;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
</style>