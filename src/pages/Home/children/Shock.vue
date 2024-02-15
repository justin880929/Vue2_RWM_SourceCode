<template>
  <div>
    <CardContainer :list="shockProducts"/>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ShockCard",
  computed: {
    ...mapState({
      products:(state)=>state.products.products
    }),
    shockProducts(){
      return this.products.filter(product => product.part === "Shock");
    }
  },
  
};
</script>

<style>
</style>