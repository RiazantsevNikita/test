<template>
  <div class="row">
    <div class="col-lg-2"></div>
    <div class="col-lg-6">
      <h1>Авторизация</h1>
      <input type="text" placeholder="login" v-model="login" />
      <br />
      <input type="password" placeholder="password" v-model="pass" />
      <br />
      <button @click="Auth()">Войти</button>
    </div>
    <div class="col-lg-4"></div>
  </div>
</template>

<script>
import { API } from "./api/index";

export default {
  name: "Auth",
  data() {
    return {
      login: "",
      pass: ""
    };
  },
  methods: {
    Auth: function() {
      let obj = {
        login: this.login,
        pass: this.pass
      };
      API.post("admin/authorization", JSON.stringify(obj))
        .then(response => {
          if (response.status == 216) {
            alert("Неверный логин или пароль!");
          } else {
              localStorage.token = response.data.token;
            location.reload();
          }
        })
        .catch(error => {
          console.log(error);
          alert("Ошибка! См. консоль");
        });
    }
  }
};
</script>

<style scoped>
input {
  margin: 10px;
}
</style>
