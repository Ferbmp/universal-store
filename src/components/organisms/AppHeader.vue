<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="#">Your Logo</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mr-auto">
            <li
              v-for="(category, index) in categories"
              :key="index"
              class="nav-item"
            >
              <a class="nav-link" :href="'#' + category">{{ category }}</a>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0 mx-auto">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search products"
              aria-label="Search"
            />
          </form>
          <div class="navbar-nav">
            <a class="nav-item nav-link" href="#">
              <i class="bi bi-cart"></i>
            </a>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { getCategories } from "@/api.js";

export default {
  name: "AppHeader",
  data() {
    return {
      categories: [],
    };
  },
  methods: {
    async loadCategories() {
      try {
        const categories = await getCategories();
        this.categories = categories;
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    },
  },
  mounted() {
    this.loadCategories();
  },
};
</script>
<style>
.nav-item {
  text-transform: capitalize;
}
</style>
