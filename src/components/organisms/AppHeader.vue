<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <router-link :to="{ name: 'Home' }" class="navbar-brand">
          Universal Store
        </router-link>

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
          <ul class="navbar-nav m-auto">
            <template v-if="categories.length > 0">
              <li
                v-for="(category, index) in categories"
                :key="index"
                class="nav-item"
              >
                <router-link :to="`/category/${category}`" class="nav-link">
                  {{ category }}
                </router-link>
              </li>
            </template>
            <li class="nav-item d-flex" v-else>
              <LoadingSpinner class="header-spinner" />
            </li>
          </ul>
          <div class="navbar-nav">
            <SearchInput
              :searchResults="searchResults"
              @search-input="updateSearchResults"
              @result-clicked="redirectToProduct"
              @close-results="closeSearchResults"
            />
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
import LoadingSpinner from "@/components/atoms/LoadingSpinner.vue";
import SearchInput from "@/components/molecules/SearchInput.vue";

export default {
  name: "AppHeader",

  data() {
    return {
      searchResults: [],
    };
  },
  components: {
    LoadingSpinner,
    SearchInput,
  },
  computed: {
    ...mapState({
      categories: (state) => state.categories,
      products: (state) => state.products,
    }),
    ...mapGetters(["cartQuantity", "productsLoaded"]),
  },
  methods: {
    ...mapActions(["loadCategories", "loadProducts"]),
    redirectToProduct(id) {
      this.searchResults = [];
      this.$router.push({ name: "Product", params: { id: id } });
    },
    updateSearchResults(searchQuery) {
      if (searchQuery === "") {
        this.searchResults = [];
        return;
      }

      this.searchResults = this.products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    },
    closeSearchResults() {
      this.searchResults = [];
    },
  },

  mounted() {
    this.loadCategories();
  },

  watch: {
    $route() {
      this.searchResults = [];

      if (!this.productsLoaded && this.$route.name !== "Home") {
        this.loadProducts();
      }
    },
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

.header-spinner {
  margin: 0;
}

.cart-icon {
  font-size: 1.8rem;
}

.form-inline {
  position: relative;
}

@media (max-width: 960px) {
  .badge-circle {
    left: 18px;
  }
}
</style>
