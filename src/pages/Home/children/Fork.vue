<template>
  <div>
    <CardContainer :list="forkProducts"/>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ForkCard",
  computed: {
    ...mapState({
      products:(state)=>state.products.products
    }),
    forkProducts(){
      return this.products.filter(product => product.part === "Fork");
    }
  },
  
};
</script>
