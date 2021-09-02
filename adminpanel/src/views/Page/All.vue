<template>
  <div id="page-wrapper">
    <div class="row">
      <div class="col-lg-12">
        <h1 class="page-header">Все страницы</h1>
      </div>
      <!-- /.col-lg-12 -->
    </div>
    <!-- /.row -->
    <div class="row">
      <div class="col-lg-10"></div>
      <div class="col-lg-2">
        <router-link to="/add-page">
          <button class="btn btn-success">Добавить</button>
        </router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div class="panel panel-default">
          <div class="panel-body">
            <div class="table-responsive">
              <table class="table table-striped table-bordered table-hover" id="dataTables-example">
                <thead>
                  <tr>
                    <th>Название</th>
                    <th>Каталог</th>
                    <th>Страна</th>
                    <th>Компания</th>
                    <th>Ссылка</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="odd gradeX" v-for="page in data" :key="page._id">
                    <td>{{page.title}}</td>
                    <td>{{(page.catalog === null) ? "Удалено" : page.catalog.name}}</td>
                    <td>{{(page.country === null) ? "Удалено" : page.country.name}}</td>
                    <td>{{(page.company === null) ? "Удалено" : page.company.name}}</td>
                    <td>{{page.href}}</td>
                    <td>
                      <router-link :to="'/update-page/' + page._id">
                        <i class="fas fa-pencil-alt"></i>
                      </router-link>
                      <i class="fas fa-times" @click="deleteObj(page._id)"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- /.table-responsive -->
          </div>
          <!-- /.panel-body -->
        </div>
        <!-- /.panel -->
      </div>
      <!-- /.col-lg-12 -->
    </div>
    <!-- /.row -->
  </div>
  <!-- /#page-wrapper -->
</template>

<script>
import { API } from "../../components/api/index";
import { admin_API } from "../../components/api/index";

export default {
  name: "All_Pages",
  data() {
    return {
      data: {},
      href: "/page/update/"
    };
  },
  mounted() {
    API.post("get-all-pages").then(response => (this.data = response.data));
  },
  methods: {
    deleteObj: function(id) {
      let obj = {
        id: id
      };
      admin_API
        .post("delete-page", JSON.stringify(obj))
        .then(response => {
          if (response.status === 200) {
            alert("Удалено");
            location.reload();
          }
        })
        .catch(error => {
          console.log(error);
          alert("Ошибка!");
        });
    }
  }
};
</script>

<style scoped>
.btn-success {
  margin: 15px;
}
</style>