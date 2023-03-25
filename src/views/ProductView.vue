<template>
  <div>
    <loading-spinner v-if="!product"></loading-spinner>
    <div class="container my-5" v-if="product">
      <div class="row">
        <div class="col-md-6">
          <img
            :src="product.image"
            :alt="product.title"
            class="img-fluid rounded"
          />
        </div>
        <div class="col-md-6">
          <h1 class="h2">{{ product.title }}</h1>
          <p class="mb-4">{{ product.description }}</p>
          <h2>{{ formatCurrency(product.price) }}</h2>
          <div class="input-group mb-3">
            <label class="input-group-text" for="quantity-input"
              >Quantity</label
            >
            <input
              type="number"
              class="form-control"
              id="quantity-input"
              v-model="quantity"
              min="1"
              max="10"
            />
          </div>
          <button class="btn btn-primary" @click="addToCart">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSingleProduct } from "@/api.js";
import formatCurrency from "@/utils/formatCurrency";
import LoadingSpinner from "@/components/atoms/LoadingSpinner.vue";

export default {
  name: "ProductView",
  data() {
    return {
      product: null,
      quantity: 1,
    };
  },
  async mounted() {
    const productId = this.$route.params.id;
    this.product = await getSingleProduct(productId);
  },
  methods: {
    formatCurrency,
    addToCart() {
      // Add the product to the cart with the selected quantity
      // You can implement this logic in a Vuex store or any other state management solution of your choice
      console.log(`Added ${this.quantity} ${this.product.title} to cart`);
    },
  },
  components: {
    LoadingSpinner,
  },
};
</script>

<style scoped>
img {
  max-height: 400px;
}
</style>
