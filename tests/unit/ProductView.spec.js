import { mount, flushPromises } from "@vue/test-utils";
import axios from "axios";
import ProductView from "@/views/ProductView.vue";
import LoadingSpinner from "@/components/atoms/LoadingSpinner.vue";
import formatCurrency from "@/utils/formatCurrency";

import { createStore } from "vuex";

const apiBaseUrl = "https://fakestoreapi.com";

const productId = "1";
const mockProduct = {
  id: productId,
  title: "Product Title",
  description: "Product Description",
  price: 100,
  image: "path/to/image.jpg",
};

jest.spyOn(axios, "get").mockResolvedValue({ data: mockProduct });

describe("ProductView.vue", () => {
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

  it("loads product data and displays it correctly", async () => {
    const wrapper = mount(ProductView, {
      props: { id: productId },
      global: {
        plugins: [store],
      },
    });
    expect(wrapper.findComponent(LoadingSpinner).exists()).toBe(true);

    await flushPromises();

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      `${apiBaseUrl}/products/${productId}`
    );

    const productTitle = wrapper.find(".h2");
    expect(productTitle.text()).toContain(mockProduct.title);

    const productDescription = wrapper.find("p.mb-4");
    expect(productDescription.text()).toContain(mockProduct.description);

    const productImage = wrapper.find("img");
    expect(productImage.attributes("src")).toBe(mockProduct.image);
    expect(productImage.attributes("alt")).toBe(mockProduct.title);

    const productPrice = wrapper.find("h2");
    expect(productPrice.text()).toContain(formatCurrency(mockProduct.price));
  });
});
