<template>
  <div id="page-wrapper">
    <div class="row">
      <div class="col-lg-12">
        <h1 class="page-header">Добавить каталог</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6">
        <input
          type="text"
          v-model="name"
          placeholder="Название"
          style="width: 100%"
          class="form-control"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6">
        <span>Действует от</span>
        <input type="date" v-model="startDate" class="form-control" />
      </div>
      <div class="col-lg-6">
        <span>Действует до</span>
        <input type="date" v-model="endDate" class="form-control" />
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6">
        <span>Для страны:</span>
        <select v-model="country" class="form-control">
          <option
            v-for="(item, index) in countries"
            :key="index"
            :value="item._id"
          >
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="col-lg-6">
        <span>Компания:</span>
        <select v-model="company" class="form-control">
          <option
            v-for="(item, index) in companies"
            :key="index"
            :value="item._id"
          >
            {{ item.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6">
        <input
          class="form-control"
          type="file"
          @change="loadImage()"
          ref="img"
        />
      </div>
    </div>
    <div class="row" v-for="(item, index) in pages" :key="item">
      <div class="col-lg-3">
        <img :src="'http://orinice.pp.ua/static/originals/' + item" alt="" />
      </div>
      <div class="col-lg-3">
        <button class="btn btn-danger" @click="deletePage(index)">
          Удалить
        </button>
      </div>
    </div>
    <button
      type="button"
      class="btn btn-success absolute__success-btn"
      @click="send()"
    >
      Сохранить
    </button>
  </div>
</template>

<script>
import { API } from "../../components/api/index";
import { admin_API } from "../../components/api/index";
import Images from "../../components/api/Images";
import YimoVueEditor from "yimo-vue-editor";
import PictureInput from "vue-picture-input";

export default {
  name: "AddObject",
  components: {
    YimoVueEditor,
    PictureInput,
  },
  data() {
    return {
      name: "",
      pages: [],
      country: "",
      company: "",
      startDate: "",
      endDate: "",
      companies: [],
      countries: [],
    };
  },
  mounted() {
    this.getContent();
  },
  methods: {
    getContent: async function () {
      await API.post("get-all-companies").then((response) => {
        this.companies = response.data;
      });
      await API.post("get-all-contries").then((response) => {
        this.countries = response.data;
      });
    },
    loadImage: function () {
      let file = this.$refs.img.files[0];
      Images(file)
        .then((response) => {
          this.pages.push(response.data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    deletePage: function (index) {
      this.pages.splice(index, 1);
    },
    send: function () {
      let obj = {
        name: this.name,
        countryId: this.country,
        companyId: this.company,
        startDate: this.startDate,
        endDate: this.endDate,
        pages: this.pages,
      };
      admin_API
        .post("add-catalog", JSON.stringify(obj))
        .then((response) => {
          if (response.status === 200) {
            alert("Добавлено");
            location.reload();
          }
        })
        .catch((error) => {
          console.log(error);
          alert("Ошибка!");
        });
    },
  },
};
</script>

<style scoped>
.absolute__success-btn {
  position: fixed;
  z-index: 1000;
  bottom: 5%;
  right: 5%;
}
.subimage {
  border: 1px solid black;
}
.padding {
  padding: 30px;
}
.purchaseTerms {
  font-size: 15px;
  font-weight: 700;
}
.input {
  width: 15px;
}
input {
  width: 100%;
}
select {
  width: 100%;
}
img {
  width: 100%;
  margin: 15px;
}
.quillWrapper {
  margin-bottom: 30px;
}
button {
  margin-top: 30px;
  margin-bottom: 50px;
}
.slider {
  margin-top: 40px;
}
.automatic {
  cursor: pointer;
  font-style: italic;
  font-size: 12px;
}
.row {
  margin-top: 25px;
  margin-bottom: 25px;
}
</style>
