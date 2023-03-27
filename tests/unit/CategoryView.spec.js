import { mount, flushPromises } from "@vue/test-utils";
import CategoryView from "@/views/CategoryView.vue";
import CardItem from "@/components/molecules/CardItem.vue";
import LoadingSpinner from "@/components/atoms/LoadingSpinner.vue";
import BaseSelect from "@/components/atoms/BaseSelect.vue";
import { getProductsInCategory } from "@/api.js";
import { createStore } from "vuex";

const RouterLinkStub = {
  name: "RouterLink",
  template: "<div><slot /></div>",
};

jest.mock("@/api.js", () => {
  return {
    getProductsInCategory: jest.fn().mockResolvedValue([
      {
        id: "1",
        title: "Product 1",
        price: 50,
        image: "path/to/image1.jpg",
        rating: { rate: 4.5 },
      },
      {
        id: "2",
        title: "Product 2",
        price: 100,
        image: "path/to/image2.jpg",
        rating: { rate: 4.0 },
      },
    ]),
  };
});

describe("CategoryView.vue", () => {
  const store = createStore({
    state: {
      cartItems: [],
      products: [],
      categories: [],
      productsLoaded: false,
    },
    getters: {
      cartItems: (state) => state.cartItems,
    },
    actions: {
      addToCart: () => {},
      removeFromCart: () => {},
      updateCartItemQuantity: () => {},
    },
  });

  it("loads and displays category products correctly", async () => {
    const selectedCategory = "electronics";
    const wrapper = mount(CategoryView, {
      data() {
        return {
          category: selectedCategory,
        };
      },
      global: {
        components: {
          CardItem,
          LoadingSpinner,
          BaseSelect,
          RouterLink: RouterLinkStub,
        },
        plugins: [store],
        mocks: {
          $route: {
            params: {
              selectedCategory,
            },
          },
          $router: {
            push: jest.fn(),
          },
        },
      },
    });

    expect(wrapper.find(".category-title").text()).toContain(
      `${selectedCategory} Products`
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(LoadingSpinner).exists()).toBe(true);

    await flushPromises();

    expect(getProductsInCategory).toHaveBeenCalledTimes(1);
    expect(getProductsInCategory).toHaveBeenCalledWith(selectedCategory);

    const cards = wrapper.findAllComponents(CardItem);
    expect(cards.length).toBe(2);
  });
});
