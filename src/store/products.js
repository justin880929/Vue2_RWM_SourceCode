//Products 配置
import { reqProducts } from '@/api/index';
const actions = {
  async getProductsJSONBIN({commit}){
    let result=await reqProducts();
    commit('SAVEPRODUCTS',result)
  },
};

const mutations = {
  SAVEPRODUCTS(state,result){
    state.products=result;
  }
};
const getters = {
  getProductById: (state) => (id) => {
    // 在這裡根據 ID 獲取數據的邏輯
    // 例如，如果 products 是一個數組，可以使用 Array.find 方法：
    return state.products.find(item => item.id === id);
  },
};

const state = {
  products: [],
};

export default {
  state,
  mutations,
  actions,
  getters,
}