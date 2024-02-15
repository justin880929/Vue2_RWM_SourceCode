<template>
  <b-container>
    <b-card class="cardBg">
      <b-card-header header-tag="nav">
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
</template>

<script>

export default {
  name: "UserPage",
  data() {
    return {
      tabs: [
        { id: "account", label: "會員",path:"/user/account"},
        { id: "credit-card", label: "信用卡",path:"/user/creditcard" },
        { id: "password", label: "密碼",path:"/user/password"},
        { id: "order", label: "訂單",path:"/user/order"}
      ],
      options: [
        { text: "Man", value: "Man" },
        { text: "Female", value: "Female" },
        { text: "Other", value: "Other" },
      ],
    };
  },
  
};
</script>

<style scoped>
.card-header-tabs .nav-link{
  color: silver;
}
.card-header-tabs .nav-link.active {
  color:rgba(205, 133, 63, 0.8);
  background: url("../../assets/rock.jpg");
}
.cardBg {
  background: url("../../assets/rock.jpg");
  width: 100%;
  min-height: 76vh;
  border: 1px solid rgba(0, 0, 0, 0.3);
}
.card-header {
  background-color: rgba(205, 133, 63, 0.2);
}
</style>