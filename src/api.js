import axios from "axios";

const baseUrl = "https://fakestoreapi.com";

export const getCategories = async () => {
  const response = await axios.get(`${baseUrl}/products/categories`);
  return response.data;
};

export const getProducts = async () => {
  const response = await axios.get(`${baseUrl}/products`);
  return response.data;
};
