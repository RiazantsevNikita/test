<template>
  <div id="page-wrapper">
    <div class="row">
      <div class="col-lg-12">
        <h1 class="page-header">Главная</h1>
      </div>
      <!-- /.col-lg-12 -->
    </div>
    <!-- /.row -->
    <div class="row">
      <div class="col-lg-3 col-md-6">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <div class="row">
              <div class="col-xs-3">
                <i class="fa fa-comments fa-5x"></i>
              </div>
              <div class="col-xs-9 text-right">
                <div class="huge">26</div>
                <div>New Comments!</div>
              </div>
            </div>
          </div>
          <a href="#">
            <div class="panel-footer">
              <span class="pull-left">View Details</span>
              <span class="pull-right">
                <i class="fa fa-arrow-circle-right"></i>
              </span>
              <div class="clearfix"></div>
            </div>
          </a>
        </div>
      </div>
      <div class="col-lg-3 col-md-6">
        <div class="panel panel-green">
          <div class="panel-heading">
            <div class="row">
              <div class="col-xs-3">
                <i class="fa fa-tasks fa-5x"></i>
              </div>
              <div class="col-xs-9 text-right">
                <div class="huge">12</div>
                <div>New Tasks!</div>
              </div>
            </div>
          </div>
          <a href="#">
            <div class="panel-footer">
              <span class="pull-left">View Details</span>
              <span class="pull-right">
                <i class="fa fa-arrow-circle-right"></i>
              </span>
              <div class="clearfix"></div>
            </div>
          </a>
        </div>
      </div>
    </div>
    <!-- /.row -->
    <div class="row">
      <div class="col-lg-12 update_list">
        
      </div>
    </div>
  </div>
</template>

<script>
// import { API } from "../../api/index";

export default {
  name: "AdminMain",
  // mounted() {
  //   API.post("getApartmentsForCount").then(response => {
  //     this.data = response.data;
  //     this.filter();
  //   });
  // },
  data() {
    return {
      data: [],
      filter_data1: [],
      filter_data2: [],
    };
  },
  methods: {
    filter: function () {
      this.filter_data1 = this.data.filter((item) => {
        if (item.img == "" && item.ObjectStatus == true) {
          return true;
        }
        return false;
      });
      this.filter_data2 = this.data.filter((item) => {
        if (item.img == "" && item.ObjectStatus == false) {
          return true;
        }
        return false;
      });
    },
  },
};
</script>
