//Order 配置
import { reqOrder,putOrder } from '@/api/index';
const actions = {
  async getOrderJSONBIN({ commit }) {
    let result = await reqOrder();
    commit('SAVEORDERBYBACKSTAGE', result)
  },
  async putUserOrder({commit},data){
    await putOrder(data);
    let result = await reqOrder();
    commit('SAVEORDERBYBACKSTAGE', result)
  }
};

const mutations = {
  SAVEORDERBYBACKSTAGE(state, result) {
    state.backOrders = result;
  }
};
const getters = {
  getBackOrders:(state)=>state.backOrders
};

const state = {
  backOrders: [],
};

export default {
  state,
  mutations,
  actions,
  getters,
}