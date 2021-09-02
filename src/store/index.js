import { Store } from 'vuex';
import * as mutations from './mutations';
import * as getters from './getters';
import * as actions from './actions';

const createStore = (state) => {
    return new Store({
        state,
        mutations,
        getters,
        actions
    });
};

export default createStore;