import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CategoryView from "../views/CategoryView.vue";
import ProductView from "../views/ProductView.vue";
import CartView from "@/views/CartView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/category/:selectedCategory",
    name: "Category",
    component: CategoryView,
  },
  {
    path: "/products/:id",
    name: "Product",
    component: ProductView,
    props: true,
  },
  {
    path: "/cart",
    name: "Cart",
    component: CartView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
<script></script>;
export default router;
