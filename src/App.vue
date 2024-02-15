<template>
  <div class="allSetting">
    <loading-overlay :active="isLoading"/>
    <AppHeader />
    <AppSideBar />
    <!--Router組件-->
    <div class="paddingControl" >
      <router-view></router-view>
      <LoginPage/>
      <AppFooter />
    </div>
  </div>
</template>

<script>

import { mapState } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapState(["isLoading"]),
  },
  mounted () {
    this.$store.dispatch("getProductsJSONBIN");
  },
};
</script>

<style >
@import url("https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300&display=swap");
@import url("https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css");
* {
  font-family: "Caveat", "Noto Sans TC", cursive !important;
}
body {
  background: url("./assets/rock.jpg");
  z-index: 0;
  min-height: 100vh;
}
.paddingControl {
  min-height: 100vh;
  position: sticky;
  padding-left: 78px;
  transition: all 0.5s ease;
}
.open{
  padding-left: 250px ;
}
</style>
