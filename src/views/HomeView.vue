<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div
          v-for="product in products"
          :key="product.id"
          class="col-xl-4 col-md-6 col-12"
        >
          <CardItem :item="product" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CardItem from "@/components/molecules/CardItem.vue";
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  name: "HomeView",
  computed: {
    ...mapState({
      products: (state) => state.products,
    }),

    ...mapGetters(["productsLoaded"]),
  },
  created() {
    if (!this.productsLoaded) {
      this.loadProducts();
    }
  },
  methods: {
    ...mapActions(["loadProducts"]),
  },
  components: {
    CardItem,
  },
};
</script>
<style></style>
