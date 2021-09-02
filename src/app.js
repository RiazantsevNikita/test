import Vue from 'vue';
import Vuex from 'vuex';
import Meta from 'vue-meta'
import App from './App.vue';
import VueScreen from 'vue-screen';
import {createRouter} from './router';
import createStore from './store';
import { sync } from 'vuex-router-sync';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGlobeEurope, faAngleDown, faExpand, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)
Vue.use(Vuex);
Vue.use(Meta, {
    ssrAppId: 1 // https://vue-meta.nuxtjs.org/guide/caveats.html#duplicated-tags-after-hydration-with-ssr
});
Vue.use(VueScreen);

library.add(faGlobeEurope)
library.add(faAngleDown)
library.add(faExpand)
library.add(faTimes)
Vue.component('font-awesome-icon', FontAwesomeIcon)

export const createApp = (context) =>  {
    const router = createRouter();
    const store = createStore(context.state);

    sync(store, router)

    const app = new Vue({
        store,
        router,
        render: h => h(App),
    });

    return {app, router, store};
};
