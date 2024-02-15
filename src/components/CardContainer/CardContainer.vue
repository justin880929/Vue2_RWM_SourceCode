<template>
  <b-card-group class="card-group-setting" deck>
      <b-card
        v-for="tab in list"
        :key="tab.Id"
        :img-src="tab.imgUrl"
        img-alt="Image"
        img-height=300px
        img-top
        tag="article"
        class="mt-3 mb-2"
        @click="toProdPage(tab.id)"
      >
        <b-card-title>{{ tab.title }}</b-card-title>
        <b-card-text> {{ tab.about }} </b-card-text>
        <div>
          <small v-for="(hashtag,index) in tab.hashtags" :key="index">
            {{ "#" + hashtag }}
          </small>
        </div>
        <div class="card-footer">
          <h2>{{'$'+tab.price}}</h2>
        </div>
      </b-card>
  </b-card-group>
</template>

<script>
export default {
  name: "CardContainer",
  props:[
    "list"
  ],
  data() {
    return {
      isBtnArray: [],
    };
  },
  methods: {
    btnclick(tabId) {
      this.isBtnArray[tabId].isBtn = true;
      setTimeout(() => {
        this.isBtnArray[tabId].isBtn = false;
      }, 2000);
    },
    toProdPage(ID){
      this.$router.push("/home/product?id="+ID);
    }
  },
  created() {
    // 另一種寫法 比較簡潔
    // this.isBtnArray = this.products.map((tab) => ({
    //   id: tab.id,
    //   isBtn: false,
    // }));
    this.isBtnArray = this.list.map((tab) => {
      return {
        id: tab.id,
        isBtn: false,
      };
    });
  },
};
</script>

<style scoped>

.card-group-setting {
  display: flex;
  flex-wrap: wrap; /* 允许子元素换行 */
  gap: 1rem;
}
.card-footer {
  display: flex;
  justify-content: flex-end;
  background-color: transparent;
  padding: 5px;
}
.card-footer h2{
  margin: 0;
  font-size: 2.5rem;
  color: rgba(255, 166, 0, 0.7);
}
.card-group-setting .card {
  box-sizing: border-box;
  min-width: 32%;
  width: 32%;
  border: 5px double rgba(205, 133, 63, 0.2);
  border-radius: 10px;
  background-color: rgba(205, 133, 63, 0.2);
}
.card-group-setting .card:hover{
  cursor: pointer;
  box-shadow: 0 15px 25px rgba(205, 133, 63, 0.4);
}
@media(max-width: 950px){
  .card-group-setting .card{
    max-width: 50%;
    width: 45%;
    height: 500px;
  }
}
@media(max-width: 720px){
  .card-group-setting .card{
    max-width: 90%;
    width: 90%;
  }
}
</style>