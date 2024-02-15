<template >
  <div>
    <Swiper v-if="$route.path !=='/home/product'"/>
    <b-container>
      <b-card class="cardBg">
        <b-card-header header-tag="nav" v-show="$route.path !=='/home/product'">
          <b-nav card-header tabs justified>
            <b-nav-item
              v-for="tab in tabs"
              :key="tab.id"
              active-class="active"
              :to="tab.path"
            >
              {{ tab.label }}
            </b-nav-item>
          </b-nav>
        </b-card-header>
        <router-view></router-view>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import Swiper from "./Swiper";
export default {
  name: "HomePage",
  data() {
    return {
      tabs: [
        { id: "all", label: "全部商品", path: "/home/allProds" },
        { id: "fork", label: "前避震", path: "/home/fork" },
        { id: "shock", label: "後避震", path: "/home/shock"},
        { id: "rim", label: "鍛造輪框", path: "/home/rim" },
      ],
    };
  },
  components: {
    Swiper,
  },
};
</script>

<style scoped>
.card-header-tabs .nav-link.active {
  color:rgba(205, 133, 63, 0.8);
  background: url("../../assets/rock.jpg");
}
.card-header-tabs .nav-link{
  color: silver;
}
.cardBg {
  background: url("../../assets/rock.jpg");
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.3);
}
.card-header {
  background-color: rgba(205, 133, 63, 0.2);
}

@media(max-width: 560px){
  .nav-link{
  font-size: 12.5px;
  }
}
@media(max-width: 500px){
  .nav-link{
  font-size: 9px;
  }
}
</style>