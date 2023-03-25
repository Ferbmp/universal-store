import axios from "axios";

const baseUrl = "https://fakestoreapi.com";

export const getCategories = async () => {
  const response = await axios.get(`${baseUrl}/products/categories`);
  return response.data;
};

export const getProductsInCategory = async (category) => {
  const response = await axios.get(`${baseUrl}/products/category/${category}`);
  return response.data;
};

export const getProducts = async () => {
  const response = await axios.get(`${baseUrl}/products`);
  return response.data;
};

export const getSingleProduct = async (id) => {
  const response = await axios.get(`${baseUrl}/products/${id}`);
  return response.data;
};
