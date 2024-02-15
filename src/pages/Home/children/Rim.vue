<template>
  <div>
    <CardContainer :list="rimProducts"/>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "RimCard",
  computed: {
    ...mapState({
      products:(state)=>state.products.products
    }),
    rimProducts(){
      return this.products.filter(product => product.part === "ShockRim" || product.part === "ForkRim");
    }
  },
  
};
</script>

<style>
</style>