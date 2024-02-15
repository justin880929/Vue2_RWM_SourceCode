<template>
  <div class="sidebar" :class="{ open: isMenuOpen }">
    <ul class="nav-list">
      <li v-for="item in sidebarRoutes" :key="item.id">
        <router-link :to="item.link">
          <i class="bx" :class="item.icon"></i>
          <span class="link_name">{{item.name}}</span>
        </router-link>
        <span class="tooltip">{{item.tooltip}}</span>
      </li>
      <li class="profile" v-if="isBackLogin||isLogin">
        <div class="profile_details">
          <img src="../../assets/duck.gif" alt="profile image" />
          <div class="profile_content">
            <div class="name">{{UserName}}</div>
            <div class="designation">Admin</div>
          </div>
        </div>
        <i class="bx bx-log-out" id="log_out" @click="logOut"></i>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions,mapGetters,mapMutations } from "vuex";
export default {
  name: "AppSideBar",
  computed: {
    ...mapState(["isMenuOpen","isBackLogin","isLogin"]),
    ...mapState({
      UserName:(state)=>state.User.Name
    }),
    ...mapGetters(["getMenuRoutes"]),
    sidebarRoutes(){
      return this.getMenuRoutes(this.isBackLogin)
    }
  },
  methods: {
    ...mapActions(["toggleMenu"]),
    ...mapMutations(["SETLOGIN","SETBACKLOGIN"]),
    logOut(){
      this.SETLOGIN(false);
      this.SETBACKLOGIN(false)
    }
  },
  mounted () {
  
  },
};

</script>

<style scoped>
/*
search=ctrl+f 
{ 
  sidebar backgroud :search{.sidebar}
  item backgroud  :search{.sidebar li a }
}

*/
* {
  padding: 0%;
  margin: 0%;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

body {
  min-height: 100vh;
}

.sidebar {
  min-height: 100vh;
  width: 78px;
  padding: 6px 14px;
  background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.8)
    ),
    url("../../assets/rock5.jpg") center/cover;
  opacity: 0.95;
  transition: all 0.5s ease;
  position: fixed;
  top: 90px;
  left: 0;
}

.sidebar.open {
  width: 250px;
}

.sidebar i {
  color: black;
  height: 60px;
  line-height: 60px;
  min-width: 50px;
  font-size: 25px;
  text-align: center;
}

.sidebar .nav-list {
  margin-top: 20px;
  height: 100%;
}

.sidebar li {
  position: relative;
  margin: 8px 0;
  list-style: none;
}

.sidebar li .tooltip {
  position: absolute;
  top: -20px;
  left: calc(100% + 15px);
  z-index: 3;
  background-color: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  padding: 6px 14px;
  font-size: 15px;
  font-weight: 400;
  border-radius: 5px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
}

.sidebar li:hover .tooltip {
  opacity: 1;
  pointer-events: auto;
  transition: all 0.4s ease;
  top: 50%;
  transform: translateY(-50%);
}

.sidebar.open li .tooltip {
  display: none;
}

.sidebar input {
  font-size: 15px;
  color: #000;
  font-weight: 400;
  outline: none;
  height: 35px;
  width: 35px;
  border: none;
  border-radius: 5px;
  background: url("../../assets/rock3.jpg") center/cover;
  transition: all 0.5s ease;
}

.sidebar input::placeholder {
  color: #000;
}

.sidebar.open input {
  width: 100%;
  padding: 0 20px 0 50px;
}
.sidebar li a {
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  text-decoration: none;
  background: url("../../assets/rock3.jpg") center/cover;
  position: relative;
  transition: all 0.5s ease;
  z-index: 12;
}

.sidebar li a::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  transform: scaleX(0);
  background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.8)
    ),
    url("../../assets/rock4.jpg") center/cover;
  border-radius: 5px;
  transition: transform 0.3s ease-in-out;
  transform-origin: left;
  z-index: -2;
}

.sidebar li a:hover::after {
  transform: scaleX(1);
  color: #004f83;
}

.sidebar li a .link_name {
  color: black;
  font-size: 15px;
  font-weight: 400;
  white-space: nowrap;
  pointer-events: auto;
  transition: all 0.4s ease;
  pointer-events: none;
  opacity: 0;
}

.sidebar li a:hover .link_name,
.sidebar li a:hover i {
  transition: all 0.5s ease;
  color: #fff;
}

.sidebar.open li a .link_name {
  opacity: 1;
  pointer-events: auto;
}

.sidebar li i {
  height: 35px;
  line-height: 35px;
  font-size: 18px;
  border-radius: 5px;
}

.sidebar li.profile {
  position: fixed;
  height: 60px;
  width: 78px;
  left: 0;
  bottom: -8px;
  padding: 10px 14px;
  overflow: hidden;
  transition: all 0.5s ease;
}

.sidebar.open li.profile {
  width: 250px;
}

.sidebar .profile .profile_details {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}

.sidebar li img {
  height: 45px;
  width: 45px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 10px;
}

.sidebar li.profile .name,
.sidebar li.profile .designation {
  font-size: 15px;
  font-weight: 400;
  color: #fff;
  white-space: nowrap;
}

.sidebar li.profile .designation {
  font-size: 12px;
}

.sidebar .profile #log_out {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.8)
    ),
    url("../../assets/rock4.jpg") center/cover;
  width: 100%;
  height: 60px;
  line-height: 60px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.5s ease;
}

.sidebar.open .profile #log_out {
  width: 50px;
  background: none;
}

.home-section {
  position: relative;
  background-color: silver;
  min-height: 100vh;
  top: 0;
  left: 78px;
  width: calc(100% - 78px);
  transition: all 0.5s ease;
  z-index: 2;
}

.home-section .text {
  display: inline-block;
  color: #004f83;
  font-size: 25px;
  font-weight: 500;
  margin: 18px;
}

.sidebar.open ~ .home-section {
  left: 250px;
  width: calc(100% - 250px);
}

</style>>


