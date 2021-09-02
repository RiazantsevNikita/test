<template>
  <div id="page-wrapper">
    <div class="row">
      <div class="col-lg-12">
        <h1 class="page-header">Меню</h1>
      </div>
      <!-- /.col-lg-12 -->
    </div>
    <!-- /.row -->
    <div class="row">
      <div class="col-lg-10"></div>
      <div class="col-lg-2">
        <router-link to="/add-menu">
          <button class="btn btn-success">Добавить</button>
        </router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <span>Все меню</span>
          </div>
          <!-- /.panel-heading -->
          <div class="panel-body">
            <div class="table-responsive">
              <table
                class="table table-striped table-bordered table-hover"
                id="dataTables-example"
              >
                <thead>
                  <tr>
                    <th>Название</th>
                    <th>Страна</th>
                    <th>Компания</th>
                    <th>Моб. версия</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="odd gradeX"
                    v-for="(cat, index) in catalogs"
                    :key="index"
                  >
                    <td>{{ !cat._id ? "Удалено" : cat._id }}</td>
                    <td>
                      {{ cat.country === null ? "Удалено" : cat.country.name }}
                    </td>
                    <td>
                      {{ cat.company === null ? "Удалено" : cat.company.name }}
                    </td>
                    <td>
                      {{cat.mobile === true ? 'Да' : 'Нет'}}
                    </td>
                    <td style="width: 60px">
                      <router-link :to="'/update-menu/' + cat._id">
                        <i class="fas fa-pencil-alt"></i>
                      </router-link>
                      <i class="fas fa-times" @click="deleteObj(cat._id)"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { API } from "../../components/api/index";
import { admin_API } from "../../components/api/index";

export default {
  name: "Objects",
  data() {
    return {
      catalogs: [],
      search: "",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData: function () {
      API.post("get-all-menu").then((response) => {
        this.catalogs = response.data;
      });
    },
    deleteObj: function (id) {
      let obj = {
        id: id,
      };
      let conf = confirm("Удалить запись?");
      if (conf) {
        admin_API
          .post("delete-menu", JSON.stringify(obj))
          .then((response) => {
            if (response.status === 200) {
              alert("Удалено");
              this.getData();
            }
          })
          .catch((error) => {
            console.log(error);
            alert("Ошибка!");
          });
      }
    },
  },
};
</script>

<style scoped>
button {
  margin-bottom: 30px;
}
i {
  margin-right: 5px;
  cursor: pointer;
}
.fa-times {
  font-size: 18px;
}
.title {
  display: flex;
  justify-content: space-between;
}
.fa-pencil-alt {
  color: black;
}
</style>