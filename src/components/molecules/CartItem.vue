<template>
  <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
    <div class="card h-100">
      <router-link
        :to="{ name: 'Product', params: { id: product.id } }"
        class="router-link"
      >
        <img
          :src="product.image"
          class="card-img-top product-image"
          :alt="product.title"
        />
      </router-link>

      <div class="card-body">
        <h5 class="card-title">{{ product.title }}</h5>
        <p class="card-text">{{ formatCurrency(product.price) }}</p>

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">Quantity</span>
          </div>
          <input
            type="number"
            min="1"
            :value="quantity"
            class="form-control"
            @input="onQuantityInput"
          />
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <button
            class="btn btn-danger"
            @click.prevent="$emit('remove', { product })"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import formatCurrency from "@/utils/formatCurrency";

export default {
  name: "CartItem",
  props: {
    product: {
      type: Object,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  methods: {
    formatCurrency,
    onQuantityInput(event) {
      this.updateQuantity(event.target.value);
    },
    updateQuantity(value) {
      if (value < 1) {
        value = 1;
      }
      const newValue = parseInt(value, 10);
      this.$emit("update-quantity", {
        product: this.product,
        quantity: newValue,
      });
    },
  },
};
</script>

<style>
.product-image {
  object-fit: contain;
  height: 150px;
  margin-top: 0.5rem;
}

.card {
  height: 100%;
  max-height: 380px;
  border-radius: 16px;
  transition: box-shadow 0.2s;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.card-title {
  max-height: 48px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
