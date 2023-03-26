<template>
  <div class="spinner-container">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingSpinner",
};
</script>

<style>
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10rem;
}
</style>
