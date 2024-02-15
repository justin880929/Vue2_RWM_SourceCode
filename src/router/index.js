//配置Router
import Vue from "vue";
import VueRouter from "vue-router";
//使用插件
Vue.use(VueRouter);
//引入Router組件
import Home from '@/pages/Home/Home.vue'
import AllProds  from "@/pages/Home/children/AllProds.vue"
import Product from "@/pages/Home/children/Product.vue";
import Fork  from "@/pages/Home/children/Fork.vue"
import Shock  from "@/pages/Home/children/Shock.vue"
import Rim  from "@/pages/Home/children/Rim.vue"
import Backstage from '@/pages/Backstage/Backstage.vue'
import Purchase from '@/pages/Purchase/Purchase.vue'
import Checkout from '@/pages/Purchase/children/Checkout.vue'
import User from '@/pages/User/User.vue'
import Account from '@/pages/User/children/Account.vue'
import CreditCard from '@/pages/User/children/CreditCard.vue'
import Payment from '@/pages/User/children/Payment.vue'
import Password from '@/pages/User/children/Password.vue'
import Order from '@/pages/User/children/Order.vue'
//引入Vuex state
import store from "@/store";

//配置Router
const router = new VueRouter({
    //配置router
    routes: [
        {
            path: '*',
            redirect: "/home"
        },
        {
            path: "/home",
            component: Home,
            redirect:"/home/allProds",
            children:[
                {
                    path:"allProds",
                    component:AllProds,
                },
                {
                    path:"product",
                    component:Product,
                },
                {
                    path:"fork",
                    component:Fork,
                },
                {
                    path:"shock",
                    component:Shock,
                },
                {
                    path:"rim",
                    component:Rim,
                }
            ]
        },
        {
            path: "/backstage",
            component: Backstage,
            meta: { isAuth: true }
        },
        {
            path: "/purchase",
            component: Purchase,
            meta: { isAuth: true },
            children:[
                {
                    path:'checkout',
                    component:Checkout,
                }
            ]
        },
        {
            path: "/user",
            component: User,
            redirect: "/user/account",
            meta: { isAuth: true },
            children:[
                {
                    path:"account",
                    component:Account,
                    meta: { isAuth: true },
                },
                {
                    path:"creditcard",
                    component:CreditCard,
                    meta: { isAuth: true },
                    children:[
                        {
                            path:"payment",
                            component:Payment,
                            meta: { isAuth: true },
                        }
                    ]
                },
                {
                    path:"password",
                    component:Password,
                    meta: { isAuth: true },
                },
                {
                    path:"order",
                    component:Order,
                    meta: { isAuth: true },
                }
            ]
        },
    ]
})
router.beforeEach((to, from, next) => {
    if (to.meta.isAuth) {
        if (store.getters.getisLogin ||store.getters.getisBackLogin) {
            store.commit('ACTIVELOADING', true);
            next();
        } else {
            store.commit('SHOWLGPG', true);
        }
    } else {
        store.commit('ACTIVELOADING', true);
        next()
    }
})

export default router