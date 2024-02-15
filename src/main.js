//--↓↓↓--引入--↓↓↓--//
//引入Vue
import Vue from 'vue'

//引入App
import App from './App.vue'

//引入Router
import router from '@/router'

//引入Vuex store ***注意引用和使用Vuex的執行順序 看 @/store/index.js***
import store from './store'

//引入SideBarMenu
import VueSidebarMenuAkahon from 'vue-sidebar-menu-akahon'

//引入vue-loading-overlay@^3.0 
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
//引入BootstapVue
import { BContainer } from 'bootstrap-vue'
import { BNav } from 'bootstrap-vue'
import { BNavItem } from 'bootstrap-vue'
import { BForm } from 'bootstrap-vue'
import {LinkPlugin ,NavbarPlugin ,LayoutPlugin ,CardPlugin,FormGroupPlugin,FormRadioPlugin} from 'bootstrap-vue'
import {FormSpinbuttonPlugin,FormInputPlugin,FormSelectPlugin,IconsPlugin,ButtonPlugin,CarouselPlugin} from 'bootstrap-vue'
//引入BootstapVue 全部樣式
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//引入通用組件
import AppFooter from "./components/AppFooter/AppFooter.vue";
import AppHeader from "./components/AppHeader/AppHeader.vue";
import AppSideBar from "./components/AppSideBar/AppSideBar.vue";
import AppLogin from "./components/AppLogin"
import CardContainer from "./components/CardContainer/CardContainer.vue";

//--↑↑↑--引入--↑↑↑--//

//關閉Vue生產提示
Vue.config.productionTip = false

//--↓↓↓--使用--↓↓↓--//
Vue.component(AppFooter.name,AppFooter);
Vue.component(AppHeader.name,AppHeader);
Vue.component(AppSideBar.name,AppSideBar);
Vue.component(AppLogin.name,AppLogin);
Vue.component(CardContainer.name,CardContainer);
Vue.component('loading-overlay',Loading);
Vue.component('b-container', BContainer)
Vue.component('b-nav', BNav)
Vue.component('b-nav-item', BNavItem)
Vue.component('b-form', BForm)
//使用插件
Vue.use(LinkPlugin)
Vue.use(NavbarPlugin)
Vue.use(LayoutPlugin)
Vue.use(FormGroupPlugin)
Vue.use(FormRadioPlugin)
Vue.use(CardPlugin)
Vue.use(FormSpinbuttonPlugin)
Vue.use(FormInputPlugin)
Vue.use(FormSelectPlugin)
Vue.use(IconsPlugin)
Vue.use(ButtonPlugin)
Vue.use(CarouselPlugin)
Vue.use(VueSidebarMenuAkahon)

//--↑↑↑--使用--↑↑↑--//
const V=new Vue({
  // beforeCreate(){
  // if(store.state.isMenuOpen==true||store.state.isMenuOpen==false)
  //   document.body.style.paddingLeft='78px';
  // },
  // mounted () {
  //   const tooltips = document.querySelectorAll('.tooltip');
  //   tooltips.forEach(tooltip => {
  //   tooltip.style.top = '-20px';
  //   });
  // },
  render: h => h(App),
  router,
  store
}).$mount('#app')
console.log(V)