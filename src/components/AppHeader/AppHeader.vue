<template>
  <b-container>
    <b-navbar type="light" class="header-class">
      <b-navbar-brand href="#">
        <i
          :class="{
            'bx bx-menu': !isMenuOpen,
            'bx bx-menu-alt-right': isMenuOpen,
          }"
          id="btn"
          @click="toggleMenu"
        ></i>
        RWM
      </b-navbar-brand>
      <!-- <b-navbar-nav>
        <b-nav-item to="/home">商品</b-nav-item>
        <b-nav-item to="/purchase">購物車</b-nav-item>
        <b-nav-item to="/user">會員</b-nav-item>
      </b-navbar-nav> -->
    </b-navbar>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "AppHeader",
  computed: {
    ...mapState(["isMenuOpen"]),
  },
  methods: {
    ...mapActions(["toggleMenu"]),
  },
  
};
</script>

<style scoped>
.container {
  padding: 0;
  margin: 0 !important;
  padding-bottom: 90px;
}
.header-class {
  position: fixed !important;
  height: 90px;
  z-index: 100;
  top: 0;
  width: 100%;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.8)
  ),url("../../assets/rock5.jpg") center/cover;
  opacity: 0.95;
  backdrop-filter: blur(90px);
}
.header-class::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1.5px; /* 調整線條的高度 */
  background: linear-gradient(
    to right,
    rgba(205, 133, 63, 0.3),
    rgba(205, 133, 63, 0)
  ); /* 調整線條的顏色 */
}
</style>