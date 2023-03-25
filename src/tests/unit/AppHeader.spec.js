import { shallowMount } from "@vue/test-utils";
import AppHeader from "../../components/organisms/AppHeader.vue";
import { describe, expect, it, beforeEach, jest } from "@jest/globals";
describe("AppHeader.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(AppHeader, {
      global: {
        components: {},
        mocks: {
          $router: {
            push: jest.fn(),
          },
          $route: {},
        },
        stubs: ["router-link"],
      },
    });
  });

  it("renders the component", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders the logo", () => {
    const logo = wrapper.find(".navbar-brand");
    expect(logo.text()).toBe("Universal Store");
  });

  it("renders the search input", () => {
    const searchInput = wrapper.find(".search-input");
    expect(searchInput.exists()).toBe(true);
  });

  it("renders the cart icon", () => {
    const cartIcon = wrapper.find(".cart-icon");
    expect(cartIcon.exists()).toBe(true);
  });

  it("calls searchProducts on search input change", async () => {
    const searchInput = wrapper.find(".search-input");
    const searchProductsSpy = jest.spyOn(wrapper.vm, "searchProducts");

    await searchInput.setValue("product");
    expect(searchProductsSpy).toHaveBeenCalled();
  });

  it("displays search results when search input is changed", async () => {
    wrapper.setData({
      products: [
        { id: 1, title: "Product 1" },
        { id: 2, title: "Product 2" },
      ],
    });

    const searchInput = wrapper.find(".search-input");
    await searchInput.setValue("product");

    const searchResults = wrapper.findAll(".list-group-item");
    expect(searchResults.length).toBe(2);
  });

  it("calls redirectToProduct when a search result is clicked", async () => {
    wrapper.setData({
      products: [
        { id: 1, title: "Product 1" },
        { id: 2, title: "Product 2" },
      ],
    });

    const searchInput = wrapper.find(".search-input");
    await searchInput.setValue("product");

    const searchResults = wrapper.findAll(".list-group-item");
    const firstResult = searchResults.at(0);
    const redirectToProductSpy = jest.spyOn(wrapper.vm, "redirectToProduct");

    await firstResult.trigger("click");
    expect(redirectToProductSpy).toHaveBeenCalled();
  });
});
