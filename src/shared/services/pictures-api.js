import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    per_page: 12,
    key: '31912005-8d974e59264dcf44d8770ddf1',
    image_type: 'photo',
    orientation: 'horizontal',
  },
});

export const searchPictures = async (q, page = 1) => {
  const { data } = await instance.get('/', {
    params: {
      q,
      page,
    },
  });
  return data;
};
