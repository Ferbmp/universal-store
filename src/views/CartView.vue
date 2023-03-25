<template>
  <div class="container mt-4">
    <h1 class="mb-4">Cart</h1>
    <div v-if="cartItems.length === 0" class="alert alert-info">
      Your cart is empty
    </div>
    <div v-else>
      <div class="row">
        <CartItem
          v-for="(item, index) in cartItems"
          :key="index"
          :product="item.product"
          :quantity="item.quantity"
          @update-quantity="updateQuantity"
          @remove="handleRemoveFromCart"
        />
      </div>
      <div class="text-right">
        <h4>Total: {{ formatCurrency(cartTotal) }}</h4>
        <button class="btn btn-success" @click="checkout">Finish order</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CartItem from "@/components/molecules/CartItem.vue";
import formatCurrency from "@/utils/formatCurrency";

export default {
  name: "CartView",
  components: {
    CartItem,
  },
  computed: {
    ...mapGetters(["cartItems", "cartTotal"]),
  },
  methods: {
    formatCurrency,
    ...mapActions(["removeFromCart", "updateCartItemQuantity"]),
    updateQuantity({ product, quantity }) {
      if (quantity < 1) {
        quantity = 1;
      }
      this.updateCartItemQuantity({ product, quantity });
    },
    handleRemoveFromCart(product) {
      this.removeFromCart({ product });
    },
    checkout() {
      alert("There is no handler to do it");
    },
  },
};
</script>
