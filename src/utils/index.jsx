import axios from "axios";

const API_KEY = import.meta.env.VITE_NEWS_API_KEYS;
const baseURL = `https://newsapi.org/v2/top-headlines`;

export const customFetch = async (category = 'Apple', currentPage = 1, country = 'us', pageSize = 10) => {
  const url = `${baseURL}?category=${category}&sortBy=popularity&page=${currentPage}&pageSize=${pageSize}&country=${country}&apiKey=${API_KEY}`;
  const res = await axios.get(url);
  debugger
  return res.data;
};
