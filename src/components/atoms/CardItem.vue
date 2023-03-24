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
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
</template>
<script>
export default {
  name: "CardItem",
  props: ["item"],
  data() {
    return {
      fixedImageHeight: 180,
    };
  },
};
</script>
<style scoped>
.card-img-top {
  object-fit: contain;
}
.card {
  margin-top: 1rem;
}
.card-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.capitalize {
  text-transform: capitalize;
}

.description-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
