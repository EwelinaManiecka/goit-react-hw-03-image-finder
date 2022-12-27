import axios from 'axios';

const KEY = '21857778-e2d5225ad92fd3d3303cce086';
const BASE_URL = 'https://pixabay.com/api/';

async function fetchPictures(query, page) {
  const url = `
    ${BASE_URL}?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12
    `;

  const { data } = await axios.get(url);

  return data;
}

export default fetchPictures;
