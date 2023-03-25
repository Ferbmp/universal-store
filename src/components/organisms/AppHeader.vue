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
              <router-link :to="`/category/${category}`" class="nav-link">
                {{ category }}
              </router-link>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0 mx-auto position-relative">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search products"
              aria-label="Search"
              v-model="searchQuery"
              @input="searchProducts"
            />
            <div
              class="search-results-container border mt-2"
              v-if="searchResults.length > 0"
            >
              <router-link
                v-for="(result, index) in searchResults"
                :key="index"
                :to="{ name: 'ProductView', params: { id: result.id } }"
                class="search-result-item"
              >
                {{ result.title }}
              </router-link>
            </div>
          </form>
          <div class="navbar-nav">
            <router-link to="/cart" class="nav-item nav-link">
              <i class="bi bi-cart cart-icon"></i>
              <span class="badge badge-primary badge-circle">{{
                cartQuantity
              }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { getCategories, getProducts } from "@/api.js";
import { mapGetters } from "vuex";

export default {
  name: "AppHeader",
  data() {
    return {
      categories: [],
      searchQuery: "",
      searchResults: [],
      products: [],
    };
  },
  computed: {
    ...mapGetters(["cartQuantity"]),
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
    async loadProducts() {
      try {
        const products = await getProducts();
        this.products = products;
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    },
    searchProducts() {
      if (this.searchQuery.trim() === "") {
        this.searchResults = [];
        return;
      }

      this.searchResults = this.products.filter((product) =>
        product.title
          .toLowerCase()
          .includes(this.searchQuery.trim().toLowerCase())
      );
    },
  },
  mounted() {
    this.loadCategories();
    this.loadProducts();
  },
};
</script>

<style>
.nav-item {
  text-transform: capitalize;
}
.nav-link {
  position: relative;
}
.badge-circle {
  position: absolute;
  left: 24px;
  border-radius: 50%;
  padding: 0.3rem 0.3rem;
}
.cart-icon {
  font-size: 1.8rem;
}

.search-results-container {
  background-color: white;
  max-height: 200px;
  overflow-y: auto;
  width: 100%;
  z-index: 1000;
}

.search-result-item {
  display: block;
  padding: 8px;
  text-decoration: none;
  color: black;
}

.search-result-item:hover {
  background-color: #f8f9fa;
  text-decoration: none;
}
</style>
