<template>
  <div class="card" style="">
    <div class="embed-responsive embed-responsive-16by9">
      <img
        class="card-img-top embed-responsive-item"
        :src="item.image"
        alt="Card image cap"
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
};
</script>
<style scoped>
.card-img-top {
  object-fit: cover;
}
.card {
  margin-top: 1rem;
}

.capitalize {
  text-transform: capitalize;
}

.description-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 80px;
}
</style>
