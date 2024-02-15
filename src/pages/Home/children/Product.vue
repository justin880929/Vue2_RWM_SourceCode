<template>
  <div>
    <div class="prod-PI">
      <!-- 商品圖片 prod-PI => prod-products Information-->
      <img :src="aboutProd.imgUrl" alt="">
      <div class="prod-SelArea">
        <!-- 價錢 規格 加入購物車BTN #hashtag prod-SelArea=>prod-Select Area -->
        <h1>{{aboutProd.title}}</h1>
        <h2>{{"$"+aboutProd.price}}</h2>
        <div class="hashtag">
          <small v-for="(hashtag,index) in aboutProd.hashtags" :key="index">{{"#"+hashtag}}</small>
        </div>
        <b-form @submit.prevent="addCart" class="mt-3">
          <h5>Selection of Color</h5>
          <b-form-group :id="`input-group`+index" v-for="(part,name,index) in parts" :key="index">
            <label :class="{error:error.top}">{{part.title}}</label>
            <b-form-radio-group
              v-model="product.color[name]"
              :options="part.options"
              required
              :name="name+`-radio`"
              class="top-radio"
            ></b-form-radio-group>
          </b-form-group>
          <div class="amount-div">
              <label for="amount" class="me-2">數量:</label>
              <b-form-spinbutton id="amount" inline v-model="product.amount" min="1" max="5"></b-form-spinbutton>
          </div>
          
          <div class="form-footer">
            <b-button
              type="submit"
              :disabled="isBtn"
              variant="outline-secondary"
            >
              <span
                class="add-to-cart"
                :class="{ 'add-to-cart-animation': isBtn }"
                >Add To Cart</span
              >
              <i
                class="bx bxs-cart"
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
    </div>
    <div>
      <!-- 商品詳情 -->
    </div>
  </div>
</template>

<script>
import { mapGetters,mapActions } from "vuex";
export default {
  name: "ProductPage",
  data() {
    return {
      ID:null,
      // color.top:上座,color.cylinder:氣瓶,color.barrel:桶身,color.barrel:桶身,color.bottom:下座
      product:{
        id:"",
        color:{
          top:"",
          cylinder:"",
          barrel:"",
          bottom:""
        },
        amount:1,
      },
      options: [
        { text: "Black", value: "Black" },
        { text: "Silver", value: "Silver" },
        { text: "Ti( 鈦)", value: "Ti" },
      ],
      parts:{
        top:{
          title:"上座:",
          options:[
            { text: "Black", value: "Black" },
            { text: "Silver", value: "Silver" },
            { text: "Ti( 鈦)", value: "Ti" },
          ]
        },
        cylinder:{
          title:"氣瓶:",
          options:[
            { text: "Black", value: "Black" },
            { text: "Silver", value: "Silver" },
            { text: "Ti( 鈦)", value: "Ti" },
          ]
        },
        barrel:{
          title:"桶身:",
          options:[
            { text: "Black", value: "Black" },
            { text: "Silver", value: "Silver" },
            { text: "Ti( 鈦)", value: "Ti" },
          ]
        },
        bottom:{
          title:"下座:",
          options:[
            { text: "Black", value: "Black" },
            { text: "Silver", value: "Silver" },
            { text: "Ti( 鈦)", value: "Ti" },
          ]
        },
      },
      error:{
        top:false,
        cylinder:false,
        barrel:false,
        bottom:false,
      },
      isBtn:false,
    }
  },
  computed: {
    // Q:抓不到資料 猜測生命週期的問題
    // ...mapState({
    //   aboutProd2:(state)=>state.products.products[parseInt(this.$route.query.id, 10)]
    // }),
    ...mapGetters(["getProductById"]),
    aboutProd() {
    // 使用 Vuex getter，撈單獨數據 /this.$route.query.id為字串
    return this.getProductById(parseInt(this.$route.query.id, 10));
    },
  },
  methods: {
    ...mapActions(["addPurchase"]),
    addCart(){
      this.isBtn = true;
      if(this.check(this.product.color)){
        this.addPurchase({
          id:this.aboutProd.id,
          title:this.aboutProd.title,
          amount:this.product.amount,
          selected:false,
          newColor:this.product.color,
          onePrice:this.aboutProd.price,
        })
        setTimeout(() => {
          this.isBtn = false;
        }, 2000);
      }else{
        setTimeout(() => {
          this.isBtn = false;
        }, 2000);
      }
    },
    check(color){
      const Error=this.error
      Object.keys(Error).forEach((part)=>{
        Error[part]=false;
      })
      const conditions = {
        top:color.top !== "",
        cylinder:color.cylinder !== "",
        barrel:color.barrel !== "",
        bottom:color.bottom !== "",
      };
      if(Object.values(conditions).every((condition) => condition)){
        return true;
      }else{
        Object.keys(conditions).forEach((part)=>{
          if(!conditions[part]){
            this.error[part]=true;
          }
        })
        return false;
      }
    }
  },
  created() {
    this.ID=parseInt(this.$route.query.id, 10);
  },
}
</script>

<style scoped>
.prod-PI{
  display: flex;
  border-bottom: 2px solid transparent;
  border-image: linear-gradient(to right, rgba(205, 133, 63, 0.3), rgba(205, 133, 63, 0)) 1;
  padding-bottom: 10px;
  color: rgba(205, 133, 63, 0.5);
}
.prod-PI img{
  width: 45%;
  height: auto;
  max-height: 350px;
  margin-right: 20px;
  border-radius: 10px;
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
.prod-SelArea h2{
  background: linear-gradient(to right,#f2f2f2,rgba(242,242,242,0.2));
  border-radius: 10px;
  color: rgba(255, 166, 0, 0.7);
}
.hashtag{
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem;
  color: silver;
}
.top-radio {
  display: inline-flex;
  width: 100%;
  padding-left: 10px;
  gap: 1rem;
  
}
.error{
  color: red;
}
.amount-div{
  margin-top: 1rem;
  display: flex;
  align-items: center;
}
.form-footer{
  margin-top: 3rem;
  display: flex;
  justify-content: flex-end;

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
i {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
span {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  transition: 500ms ease-in-out transform;
}

.bxs-cart {
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
</style>