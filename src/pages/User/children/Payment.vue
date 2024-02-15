<template>
  <b-form @submit.prevent="saveCard" class="mt-3">
    <div class="toolbox">
      <div class="toolbox-link">
        <router-link to="/user/creditcard"><i class="bx bx-undo"></i></router-link>
      </div>
      <div class="card-container">
        <div class="front" :class="{ turn: turnCard ,add:$route.query.id==-1}">
          <div class="image">
            <img src="./images/chip.png" alt="" />
            <img id="bankCard" :src="whichCard" alt="" />
          </div>
          <div class="card-number-box">
            {{ CreditCard.Number || "**** **** **** ****" }}
          </div>
          <div class="flexbox">
            <div class="box">
              <span>card holder</span>
              <div class="card-holder-name">
                {{ CreditCard.HolderName || "full name" }}
              </div>
            </div>
            <div class="box">
              <span>expires</span>
              <div class="expiration">
                <span>{{ CreditCard.THRU || "mmyy" }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="back" :class="{ turn: turnCard ,add:$route.query.id==-1}">
          <div class="stripe"></div>
          <div class="box">
            <span>CSC</span>
            <div class="csc-box">{{ hiddenCSC || "" }}</div>
            <img :src="whichCard" alt="" />
          </div>
        </div>
      </div>
      <div class="toolbox-switch">
        <label class="switch">
          <input type="checkbox" v-model="setChecked" />
          <span class="slider round"></span>
        </label>
        <span class="me-2"><i class='bx bx-trash me-2' v-show="setChecked && $route.query.id!=-1" @click="deleteCard"></i>Setting</span>
      </div>
    </div>
    <b-form-group id="input-group-1">
      <label for="CardNumber" :class="{ error: checkCard[0].error }"
        >Card Number:</label
      >
      <b-form-input
        id="CardNumber"
        type="text"
        v-model="CreditCard.Number"
        :maxlength="checkCard[0].maxlength"
        placeholder="信用卡號碼"
        :disabled="!setChecked"
        required
      >
      </b-form-input>
    </b-form-group>
    <b-form-group id="input-group-4">
      <label for="HolderName">Holder Name:</label>
      <b-form-input
        id="HolderName"
        type="text"
        v-model="CreditCard.HolderName"
        placeholder="持卡人"
        :disabled="!setChecked"
        maxlength="26"
        required
      >
      </b-form-input>
    </b-form-group>
    <b-container class="p-0">
      <b-form-group id="input-group-2" class="w-50 pe-2">
        <label for="THRU" :class="{ error: checkCard[1].error }">THRU:</label>
        <b-form-input
          id="THRU"
          type="text"
          v-model="CreditCard.THRU"
          placeholder="有效期限(MM/YY)"
          :disabled="!setChecked"
          :maxlength="checkCard[1].maxlength"
          required
        >
        </b-form-input>
      </b-form-group>
      <b-form-group id="input-group-3" class="w-50">
        <label for="CSC" :class="{ error: checkCard[2].error }">CSC:</label>
        <b-form-input
          id="CSC"
          type="password"
          v-model="CreditCard.CSC"
          placeholder="安全碼"
          :disabled="!setChecked"
          :maxlength="checkCard[2].maxlength"
          @focus="turn"
          @blur="turn"
          required
        >
        </b-form-input>
      </b-form-group>
    </b-container>
    <b-form-group id="input-group-5">
      <label for="Address">Address:</label>
      <b-form-input
        id="Address"
        type="text"
        v-model="CreditCard.Address"
        placeholder="帳單地址"
        :disabled="!setChecked"
        required
      >
      </b-form-input>
    </b-form-group>
    <b-form-group id="input-group-6">
      <label for="postal-code" :class="{ error: checkCard[3].error }"
        >Postal Code:</label
      >
      <b-form-input
        id="postal-code"
        type="text"
        v-model="CreditCard.PostalCode"
        placeholder="郵遞區號(3碼)"
        :disabled="!setChecked"
        :maxlength="checkCard[3].maxlength"
        required
      >
      </b-form-input>
    </b-form-group>
    <transition name="btn">
      <button
        type="submit"
        class="btn"
        v-show="setChecked"
        :disabled="isLoading"
      >
        <i class="bx bx-loader-circle" :class="{ active: isLoading }"></i>
        <span class="btn-text" :class="{ active: isLoading }"> Save </span>
      </button>
    </transition>
  </b-form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "CreditCardPayment",
  data() {
    return {
      turnCard: false,
      checkCard: [
        {
          type: "Number",
          error: false,
          maxlength: 19,
        },
        {
          type: "THRU",
          error: false,
          maxlength: 5,
        },
        {
          type: "CSC",
          error: false,
          maxlength: 3,
        },
        {
          type: "PostalCode",
          error: false,
          maxlength: 3,
        },
      ],
      isLoading: false,
      setChecked: false,
      // subCard: true,
      CreditCard: {
        id: 0,
        Number: "",
        THRU: "",
        CSC: "",
        HolderName: "",
        Address: "",
        PostalCode: "",
      },
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
    whichCard() {
      if (this.CreditCard.Number !== "") {
        if (this.CreditCard.Number[0] === "4") {
          return require("./images/visa.png");
        } else if (this.CreditCard.Number[0] === "5") {
          return require("./images/master.png");
        } else if (this.CreditCard.Number[0] === "3") {
          return require("./images/jcb.png");
        } else {
          return require("./images/visa.png");
        }
      } else {
        return require("./images/visa.png");
      }
    },
    hiddenCSC() {
      return this.CreditCard.CSC.replace(/./g, "*");
    },
  },
  watch: {
    "CreditCard.Number": function (val) {
      this.$nextTick(() => {
        this.CreditCard.Number = val
          .substring(0, 19) //限制19碼
          .replace(/\D/g, "") // 只能輸入數字
          .replace(/(\d{4})(?=\d)/g, "$1 "); // 每4格加空格
      });
    },
    "CreditCard.HolderName": function (val) {
      this.$nextTick(() => {
        this.CreditCard.HolderName = val
          .replace(/[^a-zA-Z ]/g, "") // 只能輸入英文和空格
          .replace(/\s+/g, " ") // 移除連續空格
          .toUpperCase() //轉換大寫
          .substring(0, 26); //限制26碼
      });
    },
    "CreditCard.THRU": function (val) {
      this.$nextTick(() => {
        this.CreditCard.THRU = val
          .substring(0, 5) //限制5碼
          .replace(/\D/g, "") // 只能輸入數字
          .replace(/(\d{2})(?=\d)/g, "$1/"); // 每2格加空格
      });
    },
    "CreditCard.CSC": function (val) {
      this.$nextTick(() => {
        this.CreditCard.CSC = val
          .substring(0, 3) //限制3碼
          .replace(/\D/g, ""); // 只能輸入數字
      });
    },
    "CreditCard.PostalCode": function (val) {
      this.$nextTick(() => {
        this.CreditCard.PostalCode = val
          .substring(0, 3) //限制3碼
          .replace(/\D/g, ""); // 只能輸入數字
      });
    },
  },
  methods: {
    ...mapActions(["saveUser","addCard","deleteCard"]),
    deleteCard() {
      //要用異步刪除 不然會碰到抓不到資料一直重新渲染 報錯
      const ID = this.$route.query.id;
      this.deleteCardAsync(ID).then(() => {
          this.$router.replace("/user/creditcard");
          console.log("delete");
      })
        .catch((error) => {
          console.error("Error deleting card:", error);
      });
    },
    deleteCardAsync(ID) {
      return new Promise((resolve, reject) => {
        // 執行異步刪除操作
        // Vuex 中執行異步刪除操作：
        this.$store.dispatch('deleteCard', ID)
          .then(() => {
            resolve(); // 操作成功
          })
          .catch((error) => {
            reject(error); // 操作失敗
          });
      });
    },
    turn() {
      this.turnCard = !this.turnCard;
    },
    saveCard() {
      // const add = this.$route.params.id === -1;
      this.isLoading = true;
      const routeID=this.$route.query.id
      const data = this.CreditCard;
      const check = this.checkCard;
      // 重置所有錯誤標記
      setTimeout(() => {
        for (const key in check) {
          check[key].error = false;
        }
      }, 200);
      // 檢查每個條件
      const conditions = [
        data.Number.length === check[0].maxlength,
        data.THRU.length === check[1].maxlength,
        data.CSC.length === check[2].maxlength,
        data.PostalCode.length === check[3].maxlength,
      ];
      if (conditions.every((condition) => condition)) {
        if(routeID!=-1){
          // 所有條件滿足，儲存並更改卡片
          setTimeout(() => {
          this.saveUser(data);
          this.isLoading = false;
          }, 1000);
          setTimeout(() => {
          this.$router.push("/user/creditcard")
          console.log("submit");
          }, 1500);
        }else{
          // 所有條件滿足，儲存並更改卡片
          setTimeout(() => {
          this.addCard(data);
          this.isLoading = false;
          }, 1000);
          setTimeout(() => {
          this.$router.push("/user/creditcard")
          console.log("submit");
          }, 1500);
        }
      } else {
        // 某些條件不滿足，設置相應的錯誤標記
        conditions.forEach((condition, index) => {
          if (!condition) {
            setTimeout(() => {
              check[index].error = true;
              this.isLoading = false;
            }, 1000);
          }
        });
      }
    },
  },
  beforeMount() {
    let ID = this.$route.query.id;
    if (ID != -1) {
      this.CreditCard = this.getUser.CreditCard[ID];
    } else {
      return;
    }
    // 移除 beforeMount 钩子
    this.$options.beforeMount = null;
  },
  
};
</script>

<style scoped>

.bx.bx-trash{
  color: rgba(205, 133, 63, 0.5);
}
.bx.bx-trash:hover{
  cursor: pointer;
  color: red;
}
.container {
  display: inline-flex;
}
.error {
  color: red;
}
.gender-radio {
  display: inline-flex;
  gap: 1rem;
}
.form-group {
  margin-bottom: 1rem;
  color: rgba(205, 133, 63, 0.5);
}
input {
  transition: all 0.5s ease;
}
input:disabled {
  background-color: rgba(205, 133, 63, 0.1);
}
/* toolbox & card css */
.toolbox {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.toolbox-link{
  width: 101.83px;
  font-size: 1.5rem;
}
.toolbox-switch{
  width: 101.83px;
}
.toolbox-link a {
  color: rgba(205, 133, 63, 0.5);
}
.container .card-container {
  position: relative;
  height: 200px;
  width: 300px;
}
.container .card-container .front {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)),
    url("./images/cardbg.jpg") center/cover;
  border-radius: 30px;
  backface-visibility: hidden;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
  padding: 20px;
  transform: perspective(1000px) rotateY(0deg);
  transition: transform 0.4s ease-out;
}
.container .card-container .front.add{
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)),
    url("./images/addcard.jpg") center/cover;
}
.container .card-container .front.turn {
  transform: perspective(1000px) rotateY(180deg);
}
.container .card-container .front .image {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
}
.container .card-container .front .image img {
  height: 30px;
}
.container .card-container .front .image img#bankCard {
  height: 30px;
  width: 56.6px;
}
.container .card-container .front .card-number-box {
  padding: 20px 0;
  font-size: 22px;
  color: #fff;
}
.container .card-container .front .flexbox {
  display: flex;
}
.container .card-container .front .flexbox .box:nth-child(1) {
  margin-right: auto;
}
.container .card-container .front .flexbox .box {
  font-size: 15px;
  color: #fff;
}
.container .card-container .back {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)),
    url("./images/cardbg.jpg") center/cover;
  border-radius: 30px;
  padding: 20px 0;
  text-align: right;
  backface-visibility: hidden;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
  transform: perspective(1000px) rotateY(180deg);
  transition: transform 0.4s ease-out;
}
.container .card-container .back.add{
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)),
    url("./images/addcard.jpg") center/cover;
}
.container .card-container .back.turn {
  transform: perspective(1000px) rotateY(0deg);
}
.container .card-container .back .stripe {
  background: #000;
  width: 100%;
  margin: 10px 0;
  height: 50px;
}
.container .card-container .back .box {
  padding: 0 20px;
}
.container .card-container .back .box span {
  color: #fff;
  font-size: 12px;
}
.container .card-container .back .box .csc-box {
  height: 30px;
  padding-right: 10px;
  margin-top: 5px;
  color: #333;
  background: #fff;
  border-radius: 5px;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}
.container .card-container .back .box img {
  margin-top: 15px;
  height: 19px;
  width: 36px;
}
.toolbox-switch {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}
.toolbox-switch span {
  color: rgba(205, 133, 63, 0.5);
}
.switch {
  position: relative;
  display: inline-block;
  width: 30px;
  height: 17px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 13px;
  width: 13px;
  left: 1.5px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: rgba(205, 133, 63, 0.9);
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(14px);
  -ms-transform: translateX(14px);
  transform: translateX(14px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
.btn {
  width: 100%;
  height: 45px;
  background: rgba(205, 133, 63, 0.5);
  border: none;
  outline: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1em;
  color: #fff;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
}
.btn:disabled {
  background: rgba(205, 133, 63, 0.5);
  color: #fff;
}
.btn-enter,
.btn-leave-to {
  transform: scaleX(0);
}
.btn-enter-to,
.btn-leave {
  transform: scaleX(1);
}
.btn-enter-active,
.btn-leave-active {
  transition: all 0.5s ease-in;
}
.btn:hover {
  background: rgba(205, 133, 63, 0.9);
  color: #fff;
}
.btn i {
  font-size: 1.5em;
}
.btn-text {
  position: absolute;
  transform: scale(1);
  transition: all 0.5s ease;
}
.btn-text.active {
  transform: scale(0);
}
.bx-loader-circle {
  position: absolute;
  transform: scale(0);
  transition: transform 0.5s ease;
}
.bx-loader-circle.active {
  transform: scale(1);
  transition: transform 0.5s ease;
  animation: animte 1s ease infinite;
  animation-delay: 0.5s;
}
.bx-loader-circle.active::before {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@keyframes animte {
  0% {
    transform: rotate(0turn);
  }
  100% {
    transform: rotate(1turn);
  }
}
</style>
