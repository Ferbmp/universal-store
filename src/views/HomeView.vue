<template>
  <div class="home">
    <HomeBanner />
    <div v-if="!productsLoaded">
      <LoadingSpinner />
    </div>
    <div class="container" v-else>
      <div class="row">
        <div
          v-for="product in products"
          :key="product.id"
          class="col-xl-4 col-md-6 col-12 d-flex justify-content-center align-items-center"
        >
          <CardItem :item="addRatingToProduct(product)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardItem from "@/components/molecules/CardItem.vue";
import HomeBanner from "@/components/molecules/HomeBanner.vue";
import LoadingSpinner from "@/components/atoms/LoadingSpinner.vue";
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
    addRatingToProduct(product) {
      if (!product.rating) {
        product.rating = { rate: 0 };
      }
      return product;
    },
  },
  components: {
    CardItem,
    HomeBanner,
    LoadingSpinner,
  },
};
</script>

<style></style>
