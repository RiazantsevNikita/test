<template>
  <div class="navbar-default sidebar" role="navigation">
    <div class="sidebar-nav navbar-collapse">
      <ul class="nav" id="side-menu">
        <li>
          <router-link to="/menu">
            <i class="fas fa-bars"></i> Меню
          </router-link>
        </li>
        <li>
          <router-link to="/update-slider">
            <i class="fab fa-slideshare"></i> Слайдер
          </router-link>
        </li>
        <li>
          <router-link to="/countries">
            <i class="fas fa-globe"></i> Страны
          </router-link>
        </li>
        <li>
          <router-link to="/companies">
            <i class="far fa-building"></i> Компании
          </router-link>
        </li>
        <li>
          <router-link to="/catalogs">
            <i class="fas fa-book-open"></i> Каталоги
          </router-link>
        </li>
        <li>
          <router-link to="/pages">
            <i class="far fa-file"></i> Страницы
          </router-link>
        </li>
        <!-- <li>
          <a href="#" @click.stop.prevent="charts = !charts">
            <i class="fa fa-bar-chart-o fa-fw"></i> Основное
            <span class="fa arrow"></span>
          </a>
          <ul class="nav nav-second-level" v-show="charts">
            <li>
              <router-link to="/main/header">Шапка сайта</router-link>
            </li>
            <li>
              <router-link to="/main/footer">Подвал сайта</router-link>
            </li>
            <li>
              <router-link to="/main/main-page">Главная страница</router-link>
            </li>
          </ul>
        </li> -->
      </ul>
    </div>
    <!-- /.sidebar-collapse -->
  </div>
  <!-- /.navbar-static-side -->
</template>

<script>
export default {
  name: "SidebarAdmin",
  data() {
    return {
      seo: false,
      charts: false,
      UI: false,
      SLD: false,
      TLD: false,
      SampleP: false,
      dropdownObject: false,
      rent: false,
      news: false,
      vacancies: false,
    };
  },
};
</script>

<style scoped>
.input-group-btn {
  position: absolute;
  z-index: 10;
  font-size: 0;
  white-space: nowrap;
  right: 1px;
  width: fit-content;
}
.input-group {
  border-radius: 4px;
}
li {
  width: 100%;
}
</style>
