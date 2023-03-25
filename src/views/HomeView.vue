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
import { getProducts } from "@/api.js";
import CardItem from "@/components/molecules/CardItem.vue";

export default {
  name: "HomeView",
  data() {
    return {
      products: [],
    };
  },
  methods: {
    async loadProducts() {
      try {
        const products = await getProducts();
        this.products = products;
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    },
  },
  mounted() {
    this.loadProducts();
  },
  components: {
    CardItem,
  },
};
</script>
<style></style>
