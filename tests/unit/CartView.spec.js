import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import CartView from "@/views/CartView.vue";

import CartItem from "@/components/molecules/CartItem.vue";

const RouterLinkStub = {
  name: "RouterLink",
  template: "<div><slot /></div>",
};

describe("CartView", () => {
  let actions;
  let getters;
  let store;

  beforeEach(() => {
    actions = {
      removeFromCart: jest.fn(),
      updateCartItemQuantity: jest.fn(),
    };
    getters = {
      cartItems: () => [
        { product: { id: 1, name: "Product 1", price: 10 }, quantity: 2 },
        { product: { id: 2, name: "Product 2", price: 20 }, quantity: 1 },
      ],
      cartTotal: () => 40,
    };
    store = createStore({
      actions,
      getters,
    });
  });

  it("displays cart items correctly", () => {
    const wrapper = mount(CartView, {
      global: { plugins: [store] },
      components: { RouterLink: RouterLinkStub },
    });
    const cartItemWrappers = wrapper.findAllComponents(CartItem);
    expect(cartItemWrappers.length).toBe(2);
    expect(cartItemWrappers.at(0).props("product")).toEqual({
      id: 1,
      name: "Product 1",
      price: 10,
    });
    expect(cartItemWrappers.at(0).props("quantity")).toBe(2);
    expect(cartItemWrappers.at(1).props("product")).toEqual({
      id: 2,
      name: "Product 2",
      price: 20,
    });
    expect(cartItemWrappers.at(1).props("quantity")).toBe(1);
  });

  it("displays cart total correctly", () => {
    const wrapper = mount(CartView, { global: { plugins: [store] } });
    expect(wrapper.text()).toContain("$40.00");
  });

  it("calls updateCartItemQuantity method when update-quantity event is emitted", () => {
    const wrapper = mount(CartView, { global: { plugins: [store] } });

    const cartItemWrapper = wrapper.findComponent(CartItem);
    cartItemWrapper.vm.$emit("update-quantity", {
      product: { id: 1, name: "Product 1", price: 10 },
      quantity: 3,
    });
    expect(actions.updateCartItemQuantity).toHaveBeenCalledWith(
      expect.any(Object),
      { product: { id: 1, name: "Product 1", price: 10 }, quantity: 3 }
    );
  });
});
