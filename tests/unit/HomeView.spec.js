import { mount } from "@vue/test-utils";
import HomeView from "@/views/HomeView.vue";
import CardItem from "@/components/molecules/CardItem.vue";
import HomeBanner from "@/components/molecules/HomeBanner.vue";
import LoadingSpinner from "@/components/atoms/LoadingSpinner.vue";
import Vuex from "vuex";

describe("HomeView", () => {
  let wrapper;

  const products = [
    {
      id: 1,
      title: "Product 1",
      price: 10,
    },
    {
      id: 2,
      title: "Product 2",
      price: 20,
    },
  ];

  const store = new Vuex.Store({
    state: {
      products: [],
    },
    getters: {
      productsLoaded: (state) => state.products.length > 0,
    },
    actions: {
      loadProducts: jest.fn(),
    },
  });

  beforeEach(() => {
    store.state.products = products;

    wrapper = mount(HomeView, {
      global: {
        plugins: [store],
        components: {
          CardItem,
          HomeBanner,
          LoadingSpinner,
        },
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("displays home banner", () => {
    expect(wrapper.findComponent(HomeBanner).exists()).toBe(true);
  });

  it("displays loading spinner when products are not loaded", async () => {
    store.state.products = [];

    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(LoadingSpinner).exists()).toBe(true);
  });

  it("displays products when products are loaded", async () => {
    expect(wrapper.find(".col-xl-4.col-md-6.col-12").exists()).toBe(true);
    expect(wrapper.findAllComponents(CardItem).length).toBe(products.length);
  });
});
