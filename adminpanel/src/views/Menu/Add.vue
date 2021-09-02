<template>
  <div id="page-wrapper">
    <div class="row">
      <div class="col-lg-12">
        <h1 class="page-header">Добавить меню</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-4">
        <label>Моб. версия</label>
        <input type="checkbox" v-model="mobile" />
      </div>
      <div class="col-lg-4">
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
      <div class="col-lg-4">
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
    <div
      v-show="mobile == false && country.length > 0 && company.length > 0"
      class="row"
      v-for="(item, index) in menu"
      :key="index"
    >
      <div class="col-lg-8">
        <div class="form-check">
          <input
            type="radio"
            class="form-check-input"
            v-bind:value="'single'"
            v-model="menu[index].type"
          />
          <label class="form-check-label">Простой</label>
        </div>
        <div class="form-check">
          <input
            type="radio"
            class="form-check-input"
            v-bind:value="'one'"
            v-model="menu[index].type"
          />
          <label class="form-check-label">Выпадающий в один ряд</label>
        </div>
        <div class="form-check">
          <input
            type="radio"
            class="form-check-input"
            v-bind:value="'two'"
            v-model="menu[index].type"
          />
          <label class="form-check-label">Выпадащий в два ряда</label>
        </div>
        <input
          type="text"
          class="form-control"
          placeholder="Название"
          v-model="item.name"
        />
        <input
          type="text"
          class="form-control"
          placeholder="Ссылка"
          v-model="item.href"
        />
        <div class="row" v-if="item.type == 'one'">
          <div class="col-lg-2"></div>
          <div class="col-lg-10">
            <div class="row" v-for="(it, indx) in menu[index].menu" :key="indx">
              <div class="col-lg-10" v-if="it.type == 'href'">
                <input
                  type="text"
                  v-model="menu[index].menu[indx].name"
                  class="form-control"
                  style="width: 100%"
                  placeholder="Название"
                />
                <input
                  type="text"
                  v-model="menu[index].menu[indx].href"
                  class="form-control"
                  style="width: 100%"
                  placeholder="Ссылка"
                />
              </div>
              <div class="col-lg-10" v-if="it.type == 'title'">
                <input
                  type="text"
                  v-model="menu[index].menu[indx].name"
                  class="form-control"
                  style="width: 100%"
                  placeholder="Название"
                />
              </div>
              <div class="col-lg-10" v-if="it.type == 'separator'">
                <hr />
              </div>
              <div class="col-lg-1">
                <button
                  class="btn btn-danger"
                  @click="removeSecondElement(index, indx)"
                >
                  Удалить
                </button>
              </div>
            </div>
            <div class="buttons-add">
              <button @click="addHref(index)" class="btn btn-primary">
                Добавить ссылку
              </button>
              <button @click="addTitle(index)" class="btn btn-primary">
                Добавить заголовок
              </button>
              <button @click="addSeparator(index)" class="btn btn-primary">
                Добавить разделитель
              </button>
            </div>
          </div>
        </div>
        <div class="row" v-if="item.type == 'two'">
          <div class="col-lg-2"></div>
          <div class="col-lg-5">
            <div
              v-show="it.col == 'left'"
              class="row"
              v-for="(it, indx) in menu[index].menu"
              :key="indx"
            >
              <div class="col-lg-9" v-if="it.type == 'href'">
                <input
                  type="text"
                  class="form-control"
                  v-model="menu[index].menu[indx].name"
                  style="width: 100%"
                  placeholder="Название"
                />
                <input
                  type="text"
                  class="form-control"
                  v-model="menu[index].menu[indx].href"
                  style="width: 100%"
                  placeholder="Ссылка"
                />
              </div>
              <div class="col-lg-9" v-if="it.type == 'title'">
                <input
                  type="text"
                  class="form-control"
                  v-model="menu[index].menu[indx].name"
                  style="width: 100%"
                  placeholder="Название"
                />
              </div>
              <div class="col-lg-9" v-if="it.type == 'separator'">
                <hr />
              </div>
              <div class="col-lg-3">
                <button
                  class="btn btn-danger"
                  @click="removeSecondElement(index, indx)"
                >
                  Удалить
                </button>
              </div>
            </div>
            <div class="buttons-add">
              <button @click="addHref(index, 1)" class="btn btn-primary">
                Добавить ссылку
              </button>
              <button @click="addTitle(index, 1)" class="btn btn-primary">
                Добавить заголовок
              </button>
              <button @click="addSeparator(index, 1)" class="btn btn-primary">
                Добавить разделитель
              </button>
            </div>
          </div>
          <div class="col-lg-5">
            <div
              v-show="it.col == 'right'"
              class="row"
              v-for="(it, indx) in menu[index].menu"
              :key="indx"
            >
              <div class="col-lg-9" v-if="it.type == 'href'">
                <input
                  type="text"
                  class="form-control"
                  v-model="menu[index].menu[indx].name"
                  style="width: 100%"
                  placeholder="Название"
                />
                <input
                  type="text"
                  class="form-control"
                  v-model="menu[index].menu[indx].href"
                  style="width: 100%"
                  placeholder="Ссылка"
                />
              </div>
              <div class="col-lg-9" v-if="it.type == 'title'">
                <input
                  type="text"
                  class="form-control"
                  v-model="menu[index].menu[indx].name"
                  style="width: 100%"
                  placeholder="Название"
                />
              </div>
              <div class="col-lg-9" v-if="it.type == 'separator'">
                <hr />
              </div>
              <div class="col-lg-3">
                <button
                  class="btn btn-danger"
                  @click="removeSecondElement(index, indx)"
                >
                  Удалить
                </button>
              </div>
            </div>
            <div class="buttons-add">
              <button @click="addHref(index, 2)" class="btn btn-primary">
                Добавить ссылку
              </button>
              <button @click="addTitle(index, 2)" class="btn btn-primary">
                Добавить заголовок
              </button>
              <button @click="addSeparator(index, 2)" class="btn btn-primary">
                Добавить разделитель
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-2">
        <button class="btn btn-danger" @click="removeFirstElement(index)">
          Удалить
        </button>
      </div>
    </div>
    <div
      v-if="mobile == false && country.length > 0 && company.length > 0"
      class="row"
    >
      <div class="col-lg-4">
        <div @click="addMenu()" class="add-menu">
          <i class="fas fa-plus"></i>
        </div>
      </div>
    </div>

    <div class="row" v-if="mobile && country.length > 0 && company.length > 0" >
      <div class="col-lg-3"></div>
      <div class="col-lg-6">
            <div
              class="col-lg-12"
              v-for="(it, indx) in menu"
              :key="indx"
            >
              <div class="col-lg-9" v-if="it.type == 'href'">
                <input
                  type="text"
                  class="form-control"
                  v-model="menu[indx].name"
                  style="width: 100%"
                  placeholder="Название"
                />
                <input
                  type="text"
                  class="form-control"
                  v-model="menu[indx].href"
                  style="width: 100%"
                  placeholder="Ссылка"
                />
              </div>
              <div class="col-lg-9" v-if="it.type == 'title'">
                <input
                  type="text"
                  class="form-control"
                  v-model="menu[indx].name"
                  style="width: 100%"
                  placeholder="Название"
                />
              </div>
              <div class="col-lg-9" v-if="it.type == 'separator'">
                <hr />
              </div>
              <div class="col-lg-3">
                <button
                  class="btn btn-danger"
                  @click="removeFirstElement(index, indx)"
                >
                  Удалить
                </button>
              </div>
            </div>
            <div class="buttons-add">
              <button @click="addHrefMobile()" class="btn btn-primary">
                Добавить ссылку
              </button>
              <button @click="addTitleMobile()" class="btn btn-primary">
                Добавить заголовок
              </button>
              <button @click="addSeparatorMobile()" class="btn btn-primary">
                Добавить разделитель
              </button>
            </div>
          </div>
          <div class="col-lg-3"></div>
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

export default {
  name: "Menu",
  data() {
    return {
      menu: [],
      country: "",
      company: "",
      mobile: false,
      countries: [],
      companies: [],
      id: "",
    };
  },
  mounted() {
    API.post("get-all-contries").then((response) => {
      this.countries = response.data;
    });
    API.post("get-all-companies").then((response) => {
      this.companies = response.data;
    });
  },
  methods: {
    addMenu: function () {
      let menu = {
        type: "single",
        name: "",
        href: "",
        menu: [],
      };
      this.menu.push(menu);
    },
    addHref: function (index, indexCol = -1) {
      let menu = {
        type: "href",
        name: "",
        href: "",
      };
      if (indexCol == 1) {
        menu.col = "left";
      } else {
        menu.col = "right";
      }
      this.menu[index].menu.push(menu);
    },
    addTitle: function (index, indexCol = -1) {
      let menu = {
        type: "title",
        name: "",
      };
      if (indexCol == 1) {
        menu.col = "left";
      } else {
        menu.col = "right";
      }
      this.menu[index].menu.push(menu);
    },
    addSeparator: function (index, indexCol = -1) {
      let menu = {
        type: "separator",
      };
      if (indexCol == 1) {
        menu.col = "left";
      } else {
        menu.col = "right";
      }
      this.menu[index].menu.push(menu);
    },
    send: function () {
      let obj = {
        mobile: this.mobile,
        menu: this.menu,
        countryId: this.country,
        companyId: this.company
      };
      admin_API
        .post("add-menu", JSON.stringify(obj))
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
    removeFirstElement: function (id) {
      this.menu.splice(id, 1);
    },
    removeSecondElement: function (firstId, secondId) {
      this.menu[firstId].menu.splice(secondId, 1);
    },
    addHrefMobile: function () {
      let menu = {
        type: "href",
        name: "",
        href: "",
      };
      this.menu.push(menu);
    },
    addTitleMobile: function () {
      let menu = {
        type: "title",
        name: "",
      };
      this.menu.push(menu);
    },
    addSeparatorMobile: function () {
      let menu = {
        type: "separator",
      };
      this.menu.push(menu);
    },
  },
};
</script>

<style scoped>
.buttons-add {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  flex-direction: column;
}
.buttons-add button {
  margin: 10px 0px;
}
.absolute__success-btn {
  position: fixed;
  z-index: 1000;
  bottom: 5%;
  right: 5%;
}
.add-menu {
  width: 100%;
  height: 150px;
  border: 2px dashed gray;
  border-radius: 5px;
  display: flex;
  font-size: 40px;
  justify-content: center;
  align-items: center;
  color: gray;
  cursor: pointer;
}
.row {
  margin-top: 25px;
}
input {
  margin-top: 10px;
}
</style>