<template>
    <CardContainer :list="products"/>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AllProds",
  computed: {
    ...mapState({
      products:(state)=>state.products.products
    }),
  },
  
};
</script>

