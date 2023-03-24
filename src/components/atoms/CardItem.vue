<template>
  <div class="card">
    <div class="embed-responsive embed-responsive-16by9">
      <img
        class="card-img-top embed-responsive-item"
        :src="item.image"
        :alt="item.title"
        :style="{ height: fixedImageHeight + 'px' }"
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
        <a href="#" class="btn btn-primary ml-auto">Add to cart</a>
      </div>
    </div>
  </div>
</template>
<script>
import formatCurrency from "@/utils/formatCurrency";
import StarRating from "@/components/atoms/StarRating.vue";
export default {
  name: "CardItem",
  props: ["item"],
  data() {
    return {
      fixedImageHeight: 180,
    };
  },
  methods: {
    formatCurrency,
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
}
.card-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.capitalize {
  text-transform: capitalize;
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
