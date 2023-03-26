<template>
  <router-link
    :to="{ name: 'Product', params: { id: item.id } }"
    class="router-link"
  >
    <div class="card">
      <div class="embed-responsive embed-responsive-16by9">
        <img
          class="card-img-top embed-responsive-item"
          :src="item.image"
          :alt="item.title"
        />
      </div>

      <div class="card-body">
        <h5 class="card-title capitalize">{{ item.title }}</h5>
        <p class="card-text description-ellipsis">
          {{ item?.description }}
        </p>

        <StarRating :rating="item.rating.rate" />
        <div class="d-flex align-items-center">
          <p class="item-price">{{ formatCurrency(item.price) }}</p>
          <button
            class="btn btn-primary ml-auto"
            @click.prevent="addToCart(item)"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import { useStore } from "vuex";
import formatCurrency from "@/utils/formatCurrency";
import StarRating from "@/components/atoms/StarRating.vue";

export default {
  name: "CardItem",
  props: ["item"],
  data() {
    return {
      fixedImageHeight: 120,
    };
  },
  methods: {
    formatCurrency,
  },
  setup() {
    const store = useStore();
    const addToCart = (product) => {
      store.dispatch("addToCart", { product, quantity: 1 });

      console.table(store.state.cartItems);
    };
    return { addToCart };
  },
  components: {
    StarRating,
  },
};
</script>

<style scoped>
.card-img-top {
  object-fit: contain;
}
.card {
  margin-top: 1rem;
  padding: 0.5rem;
  max-width: 320px;
  max-height: 340px;
  border-radius: 12px;
  transition: box-shadow 0.5s ease-out;
}
.embed-responsive {
  margin-top: 0.5rem;
}

.card:hover {
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.3);
}
.card-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.capitalize {
  text-transform: capitalize;
}

.router-link {
  text-decoration: none;
  text-transform: none;
  color: unset;
  margin: 0;
  padding: 0;
}

.item-price {
  margin: 0;
}

.description-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
