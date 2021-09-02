<template>
  <div id="page-wrapper">
    <div class="row">
      <div class="col-lg-12">
        <h1 class="page-header">Страны</h1>
      </div>
      <!-- /.col-lg-12 -->
    </div>
    <!-- /.row -->
    <div class="row">
      <div class="col-lg-10"></div>
      <div class="col-lg-2">
        <button @click="modalAdd = true" class="btn btn-success">Добавить</button>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div class="panel panel-default">
          <div class="panel-heading">Все категории</div>
          <!-- /.panel-heading -->
          <div class="panel-body">
            <div class="table-responsive">
              <table class="table table-striped table-bordered table-hover" id="dataTables-example">
                <thead>
                  <tr>
                    <th>Название</th>
                    <th>Код</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="odd gradeX" v-for="(country, index) in data" :key="index">
                    <td>
                      <span>{{country.name}}</span>
                    </td>
                    <td>
                      <span>{{country.code}}</span>
                    </td>
                    <td style="width: 60px;">
                      <span>
                        <i class="fas fa-pencil-alt" @click="edit(country.name, country.code, country._id)"></i>
                        <i class="fas fa-times" @click="deleteCat(country._id)"></i>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal v-show="modal" @close="close()" :title="modalTitle" :id="modalId" :code="modalCode"/>
    <ModalAdd v-show="modalAdd" @close="closeAdd()"/>
  </div>
</template>

<script>
import ModalAdd from "./ModalAdd.vue";
import Modal from "./Modal.vue";
import { API } from "../../components/api/index";
import { admin_API } from "../../components/api/index";

export default {
  name: "Category",
  components: {
    ModalAdd,
    Modal
  },
  data() {
    return {
      modal: false,
      modalAdd: false,
      modalTitle: "",
      modalCode: "",
      modalId: "",
      data: {}
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData: function() {
      API.post("get-all-contries")
        .then(response => {
          this.data = response.data;
        });
    },
    edit: function(title, code, id) {
      this.modalTitle = title;
      this.modalCode = code;
      this.modalId = id;
      this.modal = true;
    },
    close: function() {
      this.modalTitle = "";
      this.modalCode = "";
      this.modalId = "";
      this.modal = false;
      this.getData();
    },
    closeAdd: function() {
      this.modalTitle = "";
      this.modalCode = "";
      this.modalAdd = false;
      this.getData();
    },
    deleteCat: function(id) {
      let obj = {
        id: id
      }
      let conf = confirm("Удалить запись?");
      if (conf) {
        admin_API
            .post("delete-country", JSON.stringify(obj))
            .then(response => {
              if (response.status === 200) {
                alert("Удалено");
                this.getData();
              }
            })
            .catch(error => {
              console.log(error);
              alert("Ошибка!");
            });
      }
    }
  }
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
</style>