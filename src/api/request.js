//對axios二次封裝
import axios from "axios";
//創建axios實例
//其實request就是axios
const requests = axios.create({
  //配置對象
  //基礎路徑，發請求時，路徑會出現api
  baseURL: `https://api.jsonbin.io/v3/b/${process.env.VUE_APP_API_PRODS_BIN_ID}`,
  //請求超時時間
  timeout: 5000,
});
requests.interceptors.request.use(function (config) {
  // 在發送請求之前添加header
  config.headers['Content-Type']="application/json";
  config.headers['X-Master-Key'] = "$2a$10$gEFoKNtRQWyx2Vzm5FbyR.kA2JCqNEsSOzThL2ki2ervQ8vt14QA6"

  config.headers['X-Bin-Meta'] = process.env.VUE_APP_API_BIN_META;
  return config;
}, function (error) {
  // 對請求錯誤做些甚麼
  return Promise.reject(error);
});
requests.interceptors.response.use(function (res) {
  return res.data;
},function (error) {
  return Promise.reject(error);
});
//對外暴露
export default requests