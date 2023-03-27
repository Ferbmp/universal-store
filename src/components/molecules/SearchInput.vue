<template>
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
      @input="debounceSearchProducts"
    />
    <div v-if="searchResults.length" ref="searchResults" class="search-results">
      <ul class="list-group">
        <li
          v-for="(result, index) in searchResults"
          :key="index"
          class="list-group-item"
          @click="onResultClick(result.id)"
        >
          <img :src="result.image" :alt="result.title" class="result-image" />

          <p>
            {{ result.title }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchInput",

  props: {
    searchResults: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    $route() {
      this.searchQuery = "";
    },
  },
  data() {
    return {
      searchQuery: "",
      debounceTimer: null,
    };
  },

  methods: {
    onResultClick(id) {
      this.$emit("result-clicked", id);
    },

    debounceSearchProducts() {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.$emit("search-input", this.searchQuery.trim());
      }, 400);
    },

    closeSearchResults(event) {
      if (
        this.$refs.searchWrapper &&
        !this.$refs.searchWrapper.contains(event.target)
      ) {
        this.$emit("close-results");
      }
    },
  },

  mounted() {
    document.addEventListener("click", this.closeSearchResults);
  },

  beforeUnmount() {
    document.removeEventListener("click", this.closeSearchResults);
  },
};
</script>

<style scoped>
.search-wrapper {
  position: relative;
  min-width: 460px;
  width: 100%;

  height: 50px;
}

@media (max-width: 960px) {
  .search-wrapper {
    width: 100%;
  }
}
.search-results {
  position: absolute;
  background-color: white;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  width: 100%;
  z-index: 1000;
  top: 44px;
  max-height: 440px;
  box-sizing: border-box;
  overflow-y: auto;
}

.search-results::-webkit-scrollbar {
  width: 8px;
  background-color: #f5f5f5;
}

.search-results::-webkit-scrollbar-thumb {
  background-color: #c1c1c1;
  border-radius: 4px;
}

.search-results::-webkit-scrollbar-track {
  background-color: #f5f5f5;
  border-radius: 4px;
}

.list-group-item {
  cursor: pointer;

  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.result-image {
  widows: 100%;
  max-width: 50px;
  margin-right: 1rem;
}
.list-group-item:hover {
  background-color: #f8f9fa;
}
</style>
