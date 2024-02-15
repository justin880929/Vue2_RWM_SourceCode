<template>
<b-container>
  <b-card class="cardBg">
    <div class="cart-null" v-show="PurchaseList.length===0">
      購物車裡沒有東西...來去逛逛
      <i class='bx bxs-plane-alt bx-tada ps-2' @click="shopping"></i>
    </div>
    <div v-show="$route.path=='/purchase'&& PurchaseList.length!==0">
      <div class="purchase-header mb-4">
        <div>商品</div>
        <div>單價</div>
        <div>數量</div>
        <div>總計</div>
      </div>
      <div class="purchase-list" v-for="(list, index) in PurchaseList" :key="index">
        <input type="checkbox" v-model="list.selected" />
        <div>
          {{ list.title }}
        </div>
        <div class="ps-3">
          {{ list.onePrice }}
        </div>
        <div >
          <b-form-spinbutton
            id="amount"
            inline
            v-model="list.amount"
            min="1"
            max="5"
          ></b-form-spinbutton>
        </div>
        <div >
          {{ singleTotal(index) }}
        </div>
        <div >
          <i class="bx bx-trash" v-show="list.selected" @click="deletePurchase(index)"></i>
        </div>
      </div>
      <b-card-footer>
        總金額({{selectedProductCount()}} 個商品):
        <div>{{'$'+totalPrice()}}</div>
        <b-button class="btn" @click="checkout" :disabled="totalPrice()===0">去買單</b-button>
      </b-card-footer>
    </div>
    <router-view></router-view>
  </b-card>
</b-container>
</template>

<script>
import { mapState,mapMutations } from "vuex";
export default {
  name: "PurchasePage",
  computed: {
    ...mapState({
      PurchaseList: (state) => state.User.Purchase,
    }),
  },
  methods: {
    ...mapMutations(["DELETEPURCHASE"]),
    shopping(){
      this.$router.push("/home")
    },
    singleTotal(key) {
      let onePrice = this.PurchaseList[key].onePrice;
      let amount = this.PurchaseList[key].amount;
      return onePrice * amount;
    },
    selectedProductCount() {
      return this.PurchaseList.filter((item) => item.selected).length;
    },
    totalPrice() {
      return this.PurchaseList.reduce((total, item) => {
        if (item.selected) {
          total += item.onePrice * item.amount;
        }
        return total;
      }, 0);
    },
    deletePurchase(index){
      this.DELETEPURCHASE(index);
    },
    selectedProducts() {
      return this.PurchaseList.reduce((indexes, item, index) => {
        if (item.selected) {
          indexes.push(index); // 将满足条件的商品的位置索引添加到数组中
        }
      return indexes;
      }, []);
    },
    checkout(){
      this.$router.push('/purchase/checkout?selected='+this.selectedProducts())
    }
  },
  
};
</script>

<style scoped>
.cardBg {
  background: url("../../assets/rock.jpg");
  width: 100%;
  min-height: 76vh;
  border: 1px solid rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
}
.purchase-header {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  align-items: center;
  gap: 2.3rem;
  min-height: 10vh;
  color: rgba(205, 133, 63, 0.7);
  border-bottom: 2px solid transparent;
  border-image: linear-gradient(
      to right,
      rgba(85, 85, 85, 0.3),
      rgba(205, 133, 63, 0)
    )1;
}
.purchase-list {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
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
.bx.bx-trash:hover {
  cursor: pointer;
  color: red;
}
.card-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: auto;
}
.btn {
  margin-left: 10px;
  background-color: rgba(205, 133, 63, 0.5);
  color: #fff;
}
.btn:hover {
  background-color: rgba(205, 133, 63, 0.7);
  color: #fff;
}
.i-show{
  color: transparent;
}
.cart-null{
  min-height: 70vh;
  font-size: 2rem;
  display: flex;
  color: rgba(205, 133, 63, 0.7);
  align-items: center;
  justify-content: center;
}
.cart-null i:hover{

  cursor: pointer;
  color: rgba(205, 133, 63, 0.9);;
}
</style>