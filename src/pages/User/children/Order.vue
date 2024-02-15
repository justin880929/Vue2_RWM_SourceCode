<template>
  <div>
    <div class="order-null mb-4" v-show="Orders.length===0">No orders</div>
    <div class="order-list mb-4" v-for="(order,index) in Orders" :key="index" >
      <div class="order-status">
        待出貨
      </div>
      <div class="order-details">
        <div>{{order?.prod.title}}</div>
        <div>{{'數量:'+order?.prod.amount}}</div>
        <div>{{'金額:$'+order?.prod.amount*order?.prod.onePrice}}</div>
        <div>出貨時間:2024/2/30</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name:"UserOrder",
  computed: {
    ...mapState(["User"]),
    Orders(){
      return this.User.Order
    }
  },
  
}
</script>

<style scoped>
.order-null{
  font-size: 2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
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
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
}
@media(max-width: 780px){
  .order-list{
    font-size: 15px;
  }
}
@media(max-width: 500px){
  .order-list{
    font-size: 10px;
  }
}
</style>