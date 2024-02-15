<template>
  <div class="checkout-area">
    <div class="list-area" >
      <div class="list-header">
        <h3>Checkout List</h3>
      </div>
      <div class="list" v-for="(tab,index) in checkoutProds" :key="index">
        <span >
          {{tab?.title}}
        </span>
        <span>
          {{'數量:'+ tab?.amount}}
        </span>
        <h2>
          {{'$'+tab?.onePrice*tab?.amount}}
        </h2>
      </div>
    </div>
    <b-form @submit.prevent="save" class="prod-SelArea">
      <b-form-group id="input-group-1" label="Recipient Name:" label-for="name">
        <b-form-input
          id="name"
          type="text"
          v-model="Recipient.Name"
          required
        >
        </b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="Recipient Address:" label-for="address">
        <b-form-input
          id="address"
          type="text"
          v-model="Recipient.Address"
          placeholder='填寫收件地址'
          required
        >
        </b-form-input>
      </b-form-group>
      <b-form-group id="invoice-group-3" label="Payment:" >
        <b-form-radio-group
          id="payment-group-3"
          :options="Payment"
          v-model="Recipient.Payment"
          name="payment-radio"
          class="radio"
          required
        ></b-form-radio-group>
      </b-form-group>
      <b-form-select v-if="Recipient.Payment=='CreditCard'" v-model="CreditCard" :options="CreditCardOptions" required>
        <template #first>
        <b-form-select-option :value="null" disabled>Please select a credit card</b-form-select-option>
        </template >
      </b-form-select>
      <b-form-group id="invoice-group-4" label="Invoice:">
        <b-form-radio-group
          id="invoice-group-4"
          :options="Invoice"
          v-model="Recipient.Invoice"
          name="invoice-radio"
          class="radio"
          required
        ></b-form-radio-group>
      </b-form-group>
      <b-form-group v-if="Recipient.Invoice=='Cloud'" id="input-group-1" label="MobileBarcode:" label-for="MobileBarcode">
        <b-form-input
          id="MobileBarcode"
          type="text"
          placeholder='填寫手機載具:/EX6AMPLE'
          v-model="MobileBarcode"
          required
        >
        </b-form-input>
      </b-form-group>
      <div class="form-footer">
        <div class="pe-2">
          <span>總付款金額:</span>
          <h2>{{'$'+totalPrice}}</h2>
        </div>
        <b-button
          type="submit"
          :disabled="isBtn"
          variant="outline-secondary"
        >
          <span
            class="add-to-cart"
            :class="{ 'add-to-cart-animation': isBtn }"
            >Checkout</span
          >
          <i
            class="bx bxs-truck"
            :class="{ 'cart-animation': isBtn }"
          ></i>
          <i
            class="bx bxs-shopping-bag"
            :class="{ 'bag-animation': isBtn }"
          ></i>
        </b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import { mapGetters,mapState,mapMutations } from "vuex";
export default {
  name:"CheckoutPage",
  data() {
    return {
      isBtn:false,
      Recipient:{
        Name:"",
        Address:"",
        Payment:"COD",
        Invoice:"Uniform",
      },
      MobileBarcode:"",
      CreditCard:null,
      Payment: [
        { text: "COD( 貨到付款)", value: "COD" },
        { text: "CreditCard", value: "CreditCard" },
      ],
      CreditCardOptions:[],
      Invoice: [
        { text: "Uniform", value: "Uniform" },
        { text: "Cloud", value: "Cloud" },
      ],
      Order:[],
    }
  },
  computed: {
    ...mapState(["User"]),
    ...mapGetters(["getSelectedProducts"]),
    checkoutProds(){
      return this.getSelectedProducts(this.$route.query.selected)
    },
    totalPrice(){
      let totalPrice=0;
      for(let i=0;i<this.checkoutProds.length;i++){
          totalPrice+= this.checkoutProds[i].amount * this.checkoutProds[i].onePrice
        }
      return totalPrice;
      }
  },
  methods: {
    ...mapMutations(["ADDORDER","DELETEPURCHASE"]),
    save() {
      this.isBtn = true;
      if(this.Recipient.Payment == "CreditCard"){
        this.Recipient.CreditCard=this.CreditCard
      }
      if(this.Recipient.Invoice =="Cloud"){
        this.Recipient.MobileBarcode=this.MobileBarcode;
      }
      this.Order = this.Order.concat(this.checkoutProds.map(prods => {
            return {
            prod: prods,
            recipient: this.Recipient,
            };
        }));
      this.ADDORDER(this.Order);
      const deleteCheckoutProds =this.$route.query.selected;
      const deleteArray =deleteCheckoutProds.split(',').map(Number).reverse();
      console.log(deleteArray);
      setTimeout(() => {
        this.isBtn = false;
        this.$router.push("/user/order").then(() => {
          deleteArray.forEach((index) => {
            this.DELETEPURCHASE(index);
          });
        });
      }, 2000);
    }
  },
  created () {
    this.Recipient.Name=this.User.Name;
    this.MobileBarcode=this.User.MobileBarcode;
    this.User.CreditCard.forEach(card => {
      this.CreditCardOptions.push({
          text: card.Number,
          value: card.id
        });
    });
  },
  
}
</script>

<style scoped>
.checkout-area{
  display: flex;
  border-bottom: 2px solid transparent;
  border-image: linear-gradient(to right, rgba(205, 133, 63, 0.3), rgba(205, 133, 63, 0)) 1;
  padding-bottom: 10px;
  color: rgba(205, 133, 63, 0.5);
}
.prod-SelArea {
  width: 55%;
  padding-left: 20px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  border-left: 2px solid transparent;
  border-image: linear-gradient(to bottom, rgba(205, 133, 63, 0.3), rgba(205, 133, 63, 0)) 1;
}
.list-area{
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-height: 76vh;
  min-width: 45%;
}
.list-header{
  display: flex;
  justify-content: space-around;
  border-bottom: 2px solid transparent;
  border-image: linear-gradient(
      to right,
      rgba(85, 85, 85, 0.3),
      rgba(205, 133, 63, 0)
    )1;
}
.list{
  display: flex;
  justify-content: space-around;
  border-bottom: 2px solid transparent;
  border-image: linear-gradient(to right, rgba(205, 133, 63, 0.3), rgba(205, 133, 63, 0)) 1;
}
.list h2{
  font-size: 1.5rem;
  color: rgba(255, 166, 0, 0.7);
}
.radio {
  display: inline-flex;
  gap: 1rem;
}
.custom-select{
  border-color: #dee2e6;
}
.form-footer{
  margin-top: 3rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: linear-gradient(to right,#f2f2f2,rgba(242,242,242,0.2));
  border-radius: 10px;
}
.form-footer .pe-2{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 1.5rem;
  color: rgba(255, 166, 0, 0.7);
}
/* cart-btn */
button {
  background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.8)
    ),
    url("../../../assets/rock3.jpg") center/cover;
  border: 1px solid black;
  font-size: 1.1rem;
  border-radius: 50rem;
  cursor: pointer;
  width: 100px;
  height: 45px;
  overflow: hidden;
  position: relative;
  outline: none;
}
button:disabled {
  color: #000;
}
button:hover {
  color: silver;
}
button i {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
button span {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  transition: 500ms ease-in-out transform;
}

.bxs-truck {
  transform: translate(-800%, -50%);
  animation-delay: 200ms;
}
.bxs-shopping-bag {
  transform: translate(-50%, -400%);
  font-size: 0.5rem;
}

.add-to-cart-animation {
  transform: translate(-50%, -50%) scale(0);
}

@keyframes cart {
  0% {
    transform: translate(-800%, -50%);
  }
  30% {
    transform: translate(-50%, -50%);
  }
  70% {
    transform: translate(-50%, -50%);
  }
  100% {
    transform: translate(105px, -50%);
  }
}

@keyframes bag {
  0% {
    transform: translate(-50%, -400%);
    opacity: 1;
  }
  20% {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
  30% {
    transform: translate(-50%, -50%);
    opacity: 0;
  }
  100% {
    transform: translate(-50%, -50%);
    opacity: 0;
  }
}
.cart-animation {
  animation: cart 2000ms ease-in-out forwards;
}

.bag-animation {
  animation: bag 2000ms 700ms ease-in-out forwards;
}
@media(max-width: 780px){
  .checkout-area{
    flex-wrap: wrap;
  }
  .list-area{
    width: 100%;
    min-height: 40%;
  }
  .prod-SelArea{
    width: 100%;
  }
}
@media(max-width: 500px){
  .checkout-area{
    flex-wrap: wrap;
  }
  .list-area{
    width: 100%;
    min-height: auto;
  }
  .prod-SelArea{
    width: 100%;
  }
}
</style>