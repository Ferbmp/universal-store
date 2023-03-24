<template>
  <div class="star-rating">
    <i
      v-for="index in maxStars"
      :key="index"
      :class="['bi bi-star-fill', { active: index <= rating }]"
    ></i>
  </div>
</template>

<script>
export default {
  name: "StarRating",
  props: {
    rating: {
      type: Number,
      default: 0,
    },
    maxStars: {
      type: Number,
      default: 5,
    },
  },
};
</script>

<style scoped>
.star-rating {
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
}

.bi-star-fill.active {
  color: gold;
}
</style>
