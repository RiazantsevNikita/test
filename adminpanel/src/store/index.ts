import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    update: false,
    modalData: {}
  },
  mutations: {
    deleteModal: function (state): void { 
      state.modalData = {};
    },
    setCityModal: function (state, data): void {
      state.modalData = {
        "id": data.data.id,
        "name": data.data.name
      };
    },
    setStatusUpdate: function (state, data: boolean): void {
      state.update = data
    },
    setObjModal: function (state, data): void {
      state.modalData = {
        "id": data.data.id,
        "name": data.data.name,
        "city": data.data.city,
        "address": data.data.address
      };
    },
    setFlatModal: function (state, data): void {
      state.modalData = {
        "id": data.data._id,
        "name": data.data.name,
        "city": data.data.city,
        "obj": data.data.obj,
        "price": data.data.price,
        "square": data.data.square,
        "rooms": data.data.rooms,
        "img": data.data.img,
        "typeApart": data.data.typeApart,
        "free": data.data.free,
        "floor": data.data.floor
      };
    },
  },
  actions: {
  },
  modules: {
  }
})



