//這裡做API統一管理
//JSONBIN 只提供GET,PUT,DELETE功能;DELETE只能刪除整個資料無法單獨刪除個別資料
import requests from "./request";
import orderRequests from "./order";
export const reqOrder=()=>orderRequests({url:`https://api.jsonbin.io/v3/b/${process.env.VUE_APP_API_ORDER_BIN_ID}`,method:'get'});
export const reqProducts=()=>requests({url:`https://api.jsonbin.io/v3/b/${process.env.VUE_APP_API_PRODS_BIN_ID}`,method:'get'});
export const putOrder=(newdata)=>orderRequests({
    url:`https://api.jsonbin.io/v3/b/${process.env.VUE_APP_API_ORDER_BIN_ID}`,
    method:'put',
    data:newdata
});
