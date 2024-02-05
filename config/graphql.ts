import { $api } from './api.js';

export const getQuery = async (query: string) => {
  try {
    const response = await $api.post('', { query });
    return response.data.data.getTokenEvents.items;
  } catch (error) {}
};
