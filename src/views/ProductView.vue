<template>
  <div>
    <loading-spinner v-if="!product || !cartInitialized"></loading-spinner>
    <div class="container my-5" v-if="product && cartInitialized">
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
            />
          </div>
          <button class="btn btn-primary" @click="addToCartHandler">
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
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ProductView",
  props: ["id"],
  data() {
    return {
      product: null,
      quantity: 1,
      cartInitialized: false,
    };
  },
  computed: {
    ...mapGetters(["cartItems"]),
    cartItem() {
      if (this.product) {
        return this.cartItems?.find(
          (item) => item.product.id === this.product.id
        );
      }
      return null;
    },
  },

  async mounted() {
    this.loadProduct();
  },

  watch: {
    async id() {
      this.cartInitialized = false;
      await this.loadProduct();
    },
  },

  methods: {
    formatCurrency,
    ...mapActions(["addToCart", "removeFromCart", "updateCartItemQuantity"]),
    async loadProduct() {
      const productId = this.id;
      this.product = await getSingleProduct(productId);
      this.cartInitialized = true;
      if (this.cartItem) {
        this.quantity = this.cartItem.quantity;
      }
    },
    addToCartHandler() {
      const newCartItem = {
        product: { ...this.product },
        quantity: parseInt(this.quantity),
      };

      const cartItemIndex = this.cartItems.findIndex(
        (item) => item.product.id === newCartItem.product.id
      );

      if (cartItemIndex > -1) {
        this.updateCartItemQuantity({
          product: newCartItem.product,
          quantity: newCartItem.quantity,
        });
      } else {
        this.addToCart(newCartItem);
      }
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
