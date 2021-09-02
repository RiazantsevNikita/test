<template>
  <transition name="modal-1">
    <div class="modal-mask-1">
      <div class="modalBody">
        <div class="row">
          <div class="close">
            <i class="fas fa-window-close" @click="$emit('close')"></i>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-2"></div>
          <div class="col-lg-6">
            <input class="col-lg-12 form-control" type="text" placeholder="Название" v-model="inheritTitle" />
          </div>
          <div class="col-lg-4"></div>
        </div>
        <div class="row">
          <div class="col-lg-8"></div>
          <div class="col-lg-4 add">
            <button class="btn btn-success" @click="send()">Сохранить</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { admin_API } from "../../components/api/index";

export default {
  name: "ModalCategory",
  props: {
    title: {
      type: String
    },
    id: {
      type: String
    }
  },
  data() {
    return {
      inheritTitle: this.title, 
    };
  },
  methods: {
    send: function() {
      if (this.inheritTitle != "") {
        let obj = {
          name: this.inheritTitle,
          id: this.id
        };
        admin_API
          .post("update-company", JSON.stringify(obj))
          .then(response => {
            if (response.status === 200) {
              alert("Обновлено!");
              this.$emit("close");
            }
          })
          .catch(error => {
            console.log(error);
            alert("Ошибка!");
          });
      }
    }
  },
  watch: {
    title: function(val) {
      this.inheritTitle = val;
    }
  }
};
</script>


<style scoped>
.add {
  margin-bottom: 15px;
}
.close {
  height: 50px;
}
.modal-mask-1 {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modalBody {
  height: max-content;
  width: 40%;
  position: relative;
  background-color: white;
  overflow: hidden;
  border-radius: 10px;
}
.fa-window-close {
  font-size: 50px;
  /* margin-top: 15px; */
  color: red;
  cursor: pointer;
  position: absolute;
  top: -2px;
  right: 0px;
}
input {
  margin-top: 15px;
}
.automatic {
  cursor: pointer;
  font-style: italic;
  font-size: 12px;
}
</style>
