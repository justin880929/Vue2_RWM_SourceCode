<!-- eslint-disable vue/multi-word-component-names -->
<template>
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
      <div class="tool"><i class='bx bx-revision ' :class="{'bx-spin':refresh}" @click="orderRefresh"></i></div>
      <div class="order-list mb-4" v-for="(order,index) in Orders" :key="index" >
      <div class="order-status">
        待出貨
      </div>
      <div class="order-details">
        <div class="detail-prod">
          <div class="list">Product Selected:</div>
          <div class="list">{{order?.prod.title}}</div>
          <div class="list">{{'數量:'+order?.prod.amount}}</div>
          <div class="list">{{'金額:$'+order?.prod.amount*order?.prod.onePrice}}</div>
          <div class="list">出貨時間:2024/2/30</div>
        </div>
        <div class="detail-prod">
          <div class="list">Color Selected:</div>
          <div v-for="(value,key) in order.prod.newColor" :key="key" class="list">{{key}}:{{value}}</div>
        </div>
        <div class="detail-prod">
          <div class="list">Recipient:</div>
          <div v-for="(value,key) in order.recipient" :key="key" class="list">{{key}}:{{value}}</div>
        </div>
      </div>
    </div>
  </b-card>
</template>

<script>
import { mapGetters,mapState } from "vuex";
export default {
  name: "BackstagePage",
  data() {
    return {
      refresh:false,
      tabs: [
        { id: "order", label: "訂單",path:"/backstage"},
      ],
      testOrder:[
        {
            prod: {
                id: 2,
                title: "Test",
                amount: 4,
                selected: true,
                newColor: {
                    top: "test",
                    cylinder: "test",
                    barrel: "test",
                    bottom: "test"
                },
                onePrice: 20000
            },
            recipient: {
                Name: "Test",
                Address: "456",
                Payment: "COD",
                Invoice: "Uniform"
            }
        }
      ]
    }
  },
  computed: {
    ...mapGetters(["getBackOrders"]),
    ...mapState({
      UserOrder: (state) => state.User.Order,
    }),
    Orders(){
      return this.getBackOrders
    }
  },
  methods: {
    orderRefresh() {
      this.refresh=true; 
      if(this.UserOrder.length==0){
        this.$store.dispatch("putUserOrder",JSON.stringify(this.testOrder));
      }else{
        this.$store.dispatch("putUserOrder",JSON.stringify(this.UserOrder));
      }
      setTimeout(() => {
        this.refresh=false;
      }, 2000);
    }
  },
  mounted () {
    this.$store.dispatch("getOrderJSONBIN");
    console.log();
  },
}
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
.tool{
  display: flex;
  flex-direction: row-reverse;
  color:rgba(205, 133, 63, 0.5);
  font-size: 1.5rem;
  cursor: pointer;
}
.tool i:hover{
  color:rgba(205, 133, 63, 0.8);
}
.order-list {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  min-height: 10vh;
  color: rgba(205, 133, 63, 0.7);
  border-bottom: 2px solid transparent;
  border-image: linear-gradient(
      to right,
      rgba(205, 133, 63, 0.3),
      rgba(205, 133, 63, 0)
    )
    1;
}
.order-status{
  width: 10%;
  padding-right: 20px;
  border-right: 2px solid transparent;
  border-image: linear-gradient(
      to bottom,
      rgba(205, 133, 63, 0.3),
      rgba(205, 133, 63, 0)
    )
    1;
}
.order-details{
  width: 90%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
}
.detail-prod{
  width: 90%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
}
.list{
  width: 20%;
}
.bx-spin{
  animation: spin 1s linear infinite;
}
@media(max-width: 780px){
  .order-list{
    font-size: 12px;
  }
}
@media(max-width: 570px){
  .order-list{
    font-size: 11px;
  }
}
@media(max-width: 550px){
  .order-list{
    font-size: 7.5px;
  }
}
@media(max-width: 500px){
  .order-list{
    font-size: 10px;
  }
}
</style>