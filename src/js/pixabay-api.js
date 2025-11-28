import axios from 'axios';

const API_KEY = '53363226-49c521b83e2d6ffa4f69ff166';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(q, page = 1) {
  const params = {
    key: API_KEY,
    q: q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page: page
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching images from Pixabay:", error);
    throw new Error("Failed to fetch images.");
  }
}