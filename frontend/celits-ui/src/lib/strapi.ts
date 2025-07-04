import axios from 'axios';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export async function fetchStrapiCollection(collection: string, locale: string = 'en') {
  const res = await axios.get(`${STRAPI_URL}/api/${collection}`, {
    params: { locale, populate: '*' },
  });
  return res.data.data;
}

export async function fetchStrapiSingle(collection: string, id: string, locale: string = 'en') {
  const res = await axios.get(`${STRAPI_URL}/api/${collection}/${id}`, {
    params: { locale, populate: '*' },
  });
  return res.data.data;
} 