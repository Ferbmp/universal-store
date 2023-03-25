import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      cartItems: [],
    };
  },
  mutations: {
    addToCart(state, payload) {
      const cartItem = state.cartItems.find(
        (item) => item.product.id === payload.product.id
      );
      if (cartItem) {
        cartItem.quantity += payload.quantity;
      } else {
        state.cartItems.push(payload);
      }
    },
    removeFromCart(state, payload) {
      state.cartItems = state.cartItems.filter(
        (item) => item.product.id !== payload.product.id
      );
    },
  },
  actions: {
    addToCart({ commit }, payload) {
      commit("addToCart", payload);
    },
    removeFromCart({ commit }, payload) {
      commit("removeFromCart", payload);
    },
  },
  getters: {
    cartTotal(state) {
      return state.cartItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
    },
    cartQuantity(state) {
      return state.cartItems.reduce((total, item) => total + item.quantity, 0);
    },
  },
});
