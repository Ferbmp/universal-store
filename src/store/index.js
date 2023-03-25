import { createStore } from "vuex";

function saveToLocalStorage(cartItems) {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function loadFromLocalStorage() {
  const storedCartItems = localStorage.getItem("cartItems");
  return storedCartItems ? JSON.parse(storedCartItems) : [];
}

export default createStore({
  state() {
    return {
      cartItems: loadFromLocalStorage(),
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
      saveToLocalStorage(state.cartItems);
    },
    removeFromCart(state, payload) {
      if (payload && payload.product) {
        state.cartItems = state.cartItems.filter(
          (item) => item.product && item.product.id !== payload.product.id
        );
        saveToLocalStorage(state.cartItems);
      }
    },
    updateCartItemQuantity(state, payload) {
      const cartItem = state.cartItems.find(
        (item) => item.product.id === payload.product.id
      );
      if (cartItem) {
        cartItem.quantity = payload.quantity;
      }
      saveToLocalStorage(state.cartItems);
    },
  },
  actions: {
    addToCart({ commit }, payload) {
      commit("addToCart", payload);
    },
    removeFromCart({ commit }, payload) {
      const product = payload["product"];
      if (payload && product) {
        commit("removeFromCart", product);
      }
    },
    updateCartItemQuantity({ commit }, payload) {
      commit("updateCartItemQuantity", payload);
    },
  },
  getters: {
    cartItems(state) {
      return state.cartItems;
    },
    cartTotal(state) {
      return state.cartItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
    },
    cartQuantity(state) {
      return state.cartItems.length;
    },
  },
});
