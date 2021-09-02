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
        <button class="btn btn-success" @click="modalAdd = true">
          Добавить
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div class="panel panel-default">
          <div class="panel-heading">Все категории</div>
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
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="odd gradeX"
                    v-for="(company, index) in data"
                    :key="index"
                  >
                    <td class="title">
                      <span>{{ company.name }}</span>
                      <span>
                        <i
                          class="fas fa-pencil-alt"
                          @click="edit(company.name, company._id)"
                        ></i>
                        <i
                          class="fas fa-times"
                          @click="deleteCat(company._id)"
                        ></i>
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
    <Modal v-show="modal" @close="close()" :title="modalTitle" :id="modalId" />
    <ModalAdd v-show="modalAdd" @close="closeAdd()" />
  </div>
</template>

<script>
import ModalAdd from "./ModalAdd.vue";
import Modal from "./Modal.vue";
import { API } from "../../components/api/index";
import { admin_API } from "../../components/api/index";

//govno

export default {
  name: "Category",
  components: {
    ModalAdd,
    Modal,
  },
  data() {
    return {
      modal: false,
      modalAdd: false,
      modalTitle: "",
      modalId: "",
      data: {},
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData: function () {
      API.post("get-all-companies").then((response) => {
        this.data = response.data;
      });
    },
    edit: function (title, id) {
      this.modalTitle = title;
      this.modalId = id;
      this.modal = true;
      this.getData();
    },
    close: function () {
      this.modalTitle = "";
      this.modalId = "";
      this.modal = false;
      this.getData();
    },
    closeAdd: function () {
      this.modalTitle = "";
      this.modalAdd = false;
      this.getData();
    },
    deleteCat: function (id) {
      let obj = {
        id: id,
      };
      let conf = confirm("Удалить запись?");
      if (conf) {
        admin_API
          .post("delete-company", JSON.stringify(obj))
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
</style>