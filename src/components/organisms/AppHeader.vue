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
          <div
            ref="searchWrapper"
            class="d-flex flex-grow-1 align-items-center search-wrapper"
          >
            <input
              ref="searchInput"
              v-model="searchQuery"
              class="form-control flex-grow-1 search-input"
              type="search"
              placeholder="Search products"
              aria-label="Search"
              @input="searchProducts"
            />
            <div
              v-if="searchResults.length"
              ref="searchResults"
              class="search-results"
            >
              <ul class="list-group">
                <li
                  v-for="(result, index) in searchResults"
                  :key="index"
                  class="list-group-item"
                  @click="redirectToProduct(result.id)"
                >
                  {{ result.title }}
                </li>
              </ul>
            </div>
          </div>
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
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "AppHeader",

  data() {
    return {
      searchQuery: "",
      searchResults: [],
    };
  },
  computed: {
    ...mapState({
      categories: (state) => state.categories,
      products: (state) => state.products,
    }),
    ...mapGetters(["cartQuantity", "productsLoaded"]),
  },
  methods: {
    ...mapActions(["loadCategories"]),
    redirectToProduct(id) {
      this.$router.push({ name: "ProductView", params: { id: id } });
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
    closeSearchResults(event) {
      if (
        this.$refs.searchWrapper &&
        !this.$refs.searchWrapper.contains(event.target)
      ) {
        this.searchResults = [];
      }
    },
  },

  mounted() {
    document.addEventListener("click", this.closeSearchResults);
    this.loadCategories();
  },

  beforeUnmount() {
    document.removeEventListener("click", this.closeSearchResults);
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
  width: 24px;
  border-radius: 50%;
  height: 24px;
  text-align: center;
  justify-content: center;
  align-items: center;
  display: flex;
  top: 4px;
}
.cart-icon {
  font-size: 1.8rem;
}

.form-inline {
  position: relative;
}
.search-wrapper {
  position: relative;
}
.search-results {
  position: absolute;
  background-color: white;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  margin-top: 0.5rem;
  width: 100%;
  z-index: 1000;
  top: 30px;
  max-height: 440px;
  overflow-y: auto;
}
.list-group-item {
  cursor: pointer;
}
.list-group-item:hover {
  background-color: #f8f9fa;
}
</style>
