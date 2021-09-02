<template>
  <div id="page-wrapper">
    <div class="row">
      <div class="col-lg-12">
        <h1 class="page-header">Добавить новую страницу</h1>
      </div>
      <!-- /.col-lg-12 -->
    </div>
    <!-- /.row -->
    <div class="row">
      <div class="col-lg-1"></div>
      <div class="col-lg-11">
        <h3>Заголовок</h3>
        <input type="text" class="form-control" v-model="title" />
      </div>
    </div>
    <!-- /.row -->
    <div class="row">
      <div class="col-lg-1"></div>
      <div class="col-lg-11">
        <h3>Мета заголовок</h3>
        <input type="text" class="form-control" v-model="metaTitle" />
      </div>
    </div>
    <!-- /.row -->
    <div class="row">
      <div class="col-lg-1"></div>
      <div class="col-lg-11">
        <h3>Мета описание</h3>
        <textarea
          rows="4"
          style="font-size: 18px"
          class="form-control"
          v-model="metaDescription"
        />
      </div>
    </div>
    <!-- /.row -->
    <div class="row">
      <div class="col-lg-1"></div>
      <div class="col-lg-11">
        <h3>Ссылка</h3>
        <input type="text" class="form-control" v-model="href" />
        <p class="automatic" @click="trans()">
          Использовать автоматически созданный URL
        </p>
      </div>
    </div>
    <!-- /.row -->
    <div class="row">
      <div class="col-lg-6">
        <span>Для страны:</span>
        <select class="form-control" v-model="country._id">
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
        <select class="form-control" v-model="company._id">
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
        <span>Каталог:</span>
        <select class="form-control" v-model="catalog._id">
          <option value="">Нет</option>
          <option
            v-for="(item, index) in filteredCatalogs"
            :key="index"
            :value="item._id"
          >
            {{ item.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="row" style="margin-top: 50px">
      <div class="col-lg-12">
        <yimo-vue-editor
          class="editor"
          v-model="text"
          :config="config"
        ></yimo-vue-editor>
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
  <!-- /#page-wrapper -->
</template>

<script>
import { transliterate as tr, slugify } from "transliteration";
import YimoVueEditor from "yimo-vue-editor";
import { API } from "../../components/api/index";
import { admin_API } from "../../components/api/index";
import ru from "../../components/lang/ru";

export default {
  name: "Add",
  data() {
    return {
      title: "",
      metaTitle: "",
      metaDescription: "",
      href: "/",
      text: "",
      catalog: {
        _id: "",
      },
      company: {
        _id: "",
      },
      country: {
        _id: "",
      },
      companies: [],
      countries: [],
      catalogs: [],
      filteredCatalogs: [],
      config: {
        uploadImgUrl: "http://orinice.pp.ua/api/admin/add-image-text",
        uploadHeaders: {
          Authorization: "Bearer " + localStorage.token,
        },
        lang: ru,
      },
    };
  },
  components: {
    YimoVueEditor,
  },
  mounted() {
    this.getContent();
  },
  watch: {
    catalog: function () {
      let index = this.catalogs.findIndex((item) => item._id == this.catalog);
      if (index != -1) {
        this.company = this.catalogs[index].company._id;
        this.country = this.catalogs[index].country._id;
      }
    },
    company: function () {
      let filteredData = this.catalogs.filter(
        (item) => item.company._id == this.company
      );
      this.filteredCatalogs = filteredData;
    },
    country: function () {
      let filteredData = this.catalogs.filter(
        (item) => item.country._id == this.country
      );
      this.filteredCatalogs = filteredData;
    },
  },
  methods: {
    getContent: async function () {
      await API.post("get-all-companies").then((response) => {
        this.companies = response.data;
      });
      await API.post("get-all-contries").then((response) => {
        this.countries = response.data;
      });
      await API.post("get-all-catalogs").then((response) => {
        this.catalogs = response.data;
      });
    },
    trans: function () {
      let title = this.title;
      slugify.config({ lowercase: true, separator: "-" });
      let ChPU = slugify(title);
      this.href = "/" + ChPU;
    },
    send: function () {
      console.log("lalalallal");
      let obj = {
        title: this.title,
        href: this.href,
        catalogId: this.catalog._id,
        companyId: this.company._id,
        countryId: this.country._id,
        text: this.text,
        metaDescription: this.metaDescription,
        metaTitle: this.metaTitle
      };
      console.log(obj);
      admin_API
        .post("add-page", JSON.stringify(obj))
        .then((response) => {
          if (response.status === 200) {
            alert("Добалено!");
          } else if (response.status === 204) {
            alert("Страница с такой ссылкой уже существует");
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
input {
  width: 70%;
  padding: 5px;
  font-size: 20px;
}
textarea {
  width: 70%;
  padding: 5px;
  font-size: 15px;
  margin-bottom: 20px;
}
.automatic {
  cursor: pointer;
  font-style: italic;
  font-size: 12px;
}
.editor {
  margin-bottom: 50px;
}
</style>