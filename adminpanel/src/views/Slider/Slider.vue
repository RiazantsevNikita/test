<template>
  <div id="page-wrapper">
    <div class="row">
      <div class="col-lg-12">
        <h1 class="page-header">Слайдер</h1>
      </div>
      <!-- /.col-lg-12 -->
    </div>
    <div class="row">
      <div class="col-lg-8">
        <table class="table">
          <thead>
            <tr>
              <th>Текушие слады</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in data.slides" :key="index">
              <td>
                <img width="100%" :src="prefix + item" alt="sss" />
              </td>
              <td>
                <button class="btn btn-danger" @click="deleteSlide(index)">
                  Удалить
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-lg-4">
        <h3>Добавить слайд</h3>
        <picture-input
          ref="pictureInput"
          width="600"
          height="600"
          accept="image/jpeg, image/png"
          size="10"
          buttonClass="btn"
          :customStrings="{
            upload: '<h1>Bummer!</h1>',
            drag: 'Выберите изображение',
          }"
        ></picture-input>
        <button class="btn btn-primary" @click="click()">Добавить</button>
      </div>
    </div>
    <!-- /.row -->
    <div class="row">
      <button
        type="button"
        class="btn btn-success absolute__success-btn"
        @click="updateSlider()"
      >
        Сохранить
      </button>
    </div>
    <!-- /.row -->
    <div class="row"></div>
    <!-- /.row -->
    <div class="row"></div>
    <!-- /.row -->
  </div>
  <!-- /#page-wrapper -->
</template>

<script>
import PictureInput from "vue-picture-input";
import Images from "../../components/api/Images";
import { API } from "../../components/api/index";
import { admin_API } from "../../components/api/index";

export default {
  name: "Slider",
  data() {
    return {
      data: [],
      prefix: process.env.VUE_APP_BASE_URL+"static/originals/",
    };
  },
  components: {
    PictureInput,
  },
  methods: {
    click: function () {
      if (this.$refs.pictureInput.file) {
        Images(this.$refs.pictureInput.file)
          .then((response) => {
            if (response.status == 200) {
              this.data.slides.push(response.data);
            }
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        console.log("Nothing!");
      }
    },
    updateSlider: function () {
      let str = {
        id: this.data._id,
        slides: this.data.slides
      };
      admin_API
        .post("update-slider", str)
        .then((response) => {
          alert(response.status == 200 ? "Обновлено" : "Error!");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteSlide: function (index) {
      let conf = confirm("Удалить слайд?");
      if (conf) {
        this.data.slides.splice(index, 1);
      }
    },
  },
  mounted() {
    API.post("get-slider").then((response) => (this.data = response.data));
  },
};
</script>

<style scoped>
h3 {
  text-align: center;
}
td {
  padding: 10px;
}
.btn-primary {
  margin-top: 15px;
  margin-left: 15px;
}
.absolute__success-btn {
  position: fixed;
  z-index: 1000;
  bottom: 5%;
  right: 5%;
}
</style>