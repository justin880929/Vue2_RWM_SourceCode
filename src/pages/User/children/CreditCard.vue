<template>
  <div>
    <b-container v-show="$route.path == '/user/creditcard'">
      <router-link to="/user/creditcard/payment?id=-1">
        <div class="card-container">
          <div class="front add">
            <div class="image">
              <img src="./images/chip.png" alt="" />
              <img id="bankCard" src="./images/visa.png" alt="" />
            </div>
            <div class="card-number-box">
              Add Credit Card++
            </div>
            <div class="flexbox">
              <div class="box">
                <span>card holder</span>
                <div class="card-holder-name">
                  full name
                </div>
              </div>
              <div class="box">
                <span>expires</span>
                <div class="expiration">
                  <span>mmyy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </router-link>
      <router-link
        :to="`/user/creditcard/payment?id=${card.id}`"
        v-for="card in CreditCard"
        :key="card.id"
      >
        <div class="card-container">
          <div class="front" :class="{add:card.id===-1}">
            <div class="image">
              <img src="./images/chip.png" alt="" />
              <img id="bankCard" :src="require(`${whichCard(card)}`)" alt="" />
              <!-- 只能用methods -->
            </div>
            <div class="card-number-box">
              {{ card.Number || "**** **** **** ****" }}
            </div>
            <div class="flexbox">
              <div class="box">
                <span>card holder</span>
                <div class="card-holder-name">
                  {{ card.HolderName || "full name" }}
                </div>
              </div>
              <div class="box">
                <span>expires</span>
                <div class="expiration">
                  <span>{{ card.THRU || "mmyy" }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </router-link>
    </b-container>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "UserCreditCard",
  computed: {
    ...mapGetters(["getUser"]),
    CreditCard() {
      return this.getUser.CreditCard;
    },
  },
  methods: {
    whichCard(card) {
      if (card.id == -1) {
        return "./images/visa.png";
      } else {
        const number = card.Number[0];
        const cardImages = {
          4: "./images/visa.png",
          5: "./images/master.png",
          3: "./images/jcb.png",
        };
        return cardImages[number] || "./images/visa.png";
      }
    },
  },
  
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0;
  padding-top: 10px;
}
a {
  text-decoration: none;
}

.container .card-container {
  position: relative;
  height: 200px;
  width: 293px;
}
.container .card-container .front {
  position: static;
  height: 100%;
  width: 100%;
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
.container .card-container .front:hover {
  box-shadow: 0 15px 25px rgba(149, 35, 166, 0.4);
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
</style>

