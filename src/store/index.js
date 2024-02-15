//該文件使用於Vuex 中store

//**↓↓注意事項↓↓**
//問題 報錯 調用vue.use(Vuex)要在store之前
//解法↓
//使用Vuex要在store index.js裡引入和使用
//並也要引入Vue
//原因
//因為Vue Cli會先掃描整個程式import語句匯總在最上方 即便把import語句寫在最後一行也沒用
//**↑↑注意事項↑↑**

//--↓↓↓--引入--↓↓↓--//
//引入Vue
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//引入menu.js
import menu from './menu.js'
import products from './products.js'
import order from "./order.js";
//--↑↑↑--引入--↑↑↑--//

//--↓↓↓--使用--↓↓↓--//
Vue.use(Vuex)
//--↑↑↑--使用--↑↑↑--//

//action--用於響應組建中的動作
const actions = {
    toggleMenu({ commit, state }) {
        const newisOpen = !state.isMenuOpen;
        commit('SETMENUOPEN', newisOpen);
    },
    checkIdPw({ commit, state }, UserLgObj) {
        if (state.User.Email !== UserLgObj.Email) {
            return 'emailError';
        } else if (state.User.Pwd !== UserLgObj.Pwd) {
            return 'pwdError';
        } else {
            setTimeout(() => {
                commit('SHOWLGPG', false),
                    commit('SETLOGIN', true)
            }, 1000);
        }
    },
    checkBackstage({commit,state},BackendObj){
        const { account, Pwd } = state.Backstage;
        const check = {
            accountIcon: BackendObj.account === account,
            passwordIcon: BackendObj.Pwd === Pwd
        };
        const checkError = Object.keys(check).filter(key => !check[key]);
        if (checkError.length === 0) {
            setTimeout(() => {
                commit('SHOWLGPG', false),
                commit('SETLOGIN', true),
                commit('SETBACKLOGIN',true)
            }, 1000);
            return true;
        } else {
            return ["error",checkError] ;
        }
    },
    registerUser({ commit }, UserRgObj) {
        console.log("registerUser");
        commit('SETUSER', UserRgObj);
    },
    saveUser({ commit }, UserSvObj) {
        commit('SETUSER', UserSvObj);
    },
    saveNewPwd({ commit }, newPwd) {
        commit('SAVENEWPWD', newPwd);
    },
    addCard({ commit }, UserCard) {
        commit('ADDCARD', UserCard)
    },
    deleteCard({ commit }, UserCardID) {
        commit('DELETECARD', UserCardID)
    },
    addPurchase({ commit }, newPurchaseObj) {
        commit('ADDPURCHASE', newPurchaseObj)
    },
}

//mutations--用於操作數據
const mutations = {
    ACTIVELOADING(state,statusUpdate){
        state.isLoading=statusUpdate;
        setTimeout(() => {
            state.isLoading=false;
        }, 1500);
    },
    SETMENUOPEN(state, newisOpen) {
        state.isMenuOpen = newisOpen;
    },
    SETLOGIN(state, newisLogin) {
        state.isLogin = newisLogin;
    },
    SETBACKLOGIN(state,newisBackLogin){
        state.isBackLogin=newisBackLogin;
    },
    SHOWLGPG(state, newOpLgPg) {
        state.OpLgPg = newOpLgPg;
    },
    SAVENEWPWD(state, newPwd) {
        state.User.Pwd = newPwd;
    },
    SETUSER(state, newUserObj) {
        if (newUserObj.id != -1 && newUserObj.id !== undefined) {
            let arrayID = newUserObj.id;
            Object.keys(newUserObj).forEach((key) => {
                state.User.CreditCard[arrayID][key] = newUserObj[key];
            })
        } else {
            Object.keys(newUserObj).forEach((key) => {
                state.User[key] = newUserObj[key];
            })
        }
    },
    ADDCARD(state, UserCard) {
        UserCard.id = state.User.CreditCard.length;
        state.User.CreditCard.push(UserCard);
    },
    DELETECARD(state, UserCardID) {
        state.User.CreditCard.splice(UserCardID, 1);
        let length = state.User.CreditCard.length;
        for (let i = 0; i < length; i++) {
            state.User.CreditCard[i].id = i;
        }
    },
    ADDPURCHASE(state, newPurchaseObj) {
        state.User.Purchase.unshift(newPurchaseObj)
    },
    DELETEPURCHASE(state, index) {
        state.User.Purchase.splice(index, 1);
    },
    ADDORDER(state, OrderArray) {
        state.User.Order = state.User.Order.concat(OrderArray);
    }
}
//getters--用於獲取數據
const getters = {
    getisLogin: (state) => state.isLogin,
    getisBackLogin: (state) => state.isBackLogin,
    getUser: (state) => state.User,
    getSelectedProducts: (state) => (selected) => {
        const indexes = selected.split(',').map(index => parseInt(index.trim())); // 將字符串拆分成索引數组
        return indexes.map(index => state.User.Purchase[index]);
    },
};
//state--用於存取數據
const state = {
    //控制SideBar Open
    isMenuOpen: false,
    //確認是否Login
    isLogin: false,
    isLoading:false,
    isBackLogin:false,
    OpLgPg: false,//OpLgPg=OpenLoginPage
    User: {
        Name: "Justin",
        Email: "avaricer@gmail.com",
        Pwd: "123456",
        Gender: "",
        MobileBarcode: "",
        CreditCard: [],
        Purchase: [],
        Order: [],
    },
    Backstage:{
        account:"admin",
        Pwd:"admin"
    }
}
//創建並導出Store
const vs = new Vuex.Store({
    actions,
    mutations,
    getters,
    state,
    modules: {
        menu,
        products,
        order
    },
})
console.log(vs);
export default vs;