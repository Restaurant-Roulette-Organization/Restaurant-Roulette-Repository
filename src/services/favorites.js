import { client } from './client';

export const createFavorite = async (restaurant_alias, user_id) =>
  await client.from('favorites').insert({ restaurant_alias, user_id });

export const deleteFavorite = async (restaurant_alias, user_id) =>
  await client.from('favorites').delete().match({ restaurant_alias, user_id });
