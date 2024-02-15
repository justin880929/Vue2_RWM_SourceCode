//SideBarMenu 配置
const actions ={

};

const mutations={

};
const getters ={
    getMenuTitle:(state)=> state.MenuTitle,
    getMenuIcon:(state)=> state.MenuIcon,
    getMenuRoutes: (state) => (isBackLogin) => {
        if(isBackLogin){
            return state.BackRoutes;
        }else{
            return state.MenuRoutes;
        }
    },
    getBgColor: (state) => state.BgColor,
    // 優化 getMenuSettings:(state)=>state,
    //固定帶state參數 可以寫成以下代碼
    // getMenuItems(state){
    //     return state.menu
    // },
};

const state = {
    MenuTitle:"選單",
    BgColor:"rgba(192,192,192,0.33)",
    MenuIcon:"bxl-vuejs",
    MenuRoutes: [
        {
            link: '/home',
            name: 'Home',
            tooltip: '首頁',
            icon: 'bx-home-alt',
        },
        {
            link: '/purchase',
            name: 'Purchase',
            tooltip: '購物車',
            icon: 'bx-cart-alt',
        },
        {
            link: '/user',
            name: 'User',
            tooltip: '會員',
            icon: 'bx-user',
        },
    ],
    BackRoutes: [
        {
            link: '/home',
            name: 'Home',
            tooltip: '首頁',
            icon: 'bx-home-alt',
        },
        {
            link: '/backstage',
            name: 'Backstage',
            tooltip: '後台',
            icon: 'bx-file',
        },
    ],
};

export default{
    state,
    mutations,
    actions,
    getters,
}