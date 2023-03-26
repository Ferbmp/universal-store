<template>
  <div id="app">
    <app-header></app-header>
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import AppHeader from "@/components/organisms/AppHeader.vue";

export default {
  name: "App",
  components: {
    AppHeader,
  },
};
</script>
<style></style>
