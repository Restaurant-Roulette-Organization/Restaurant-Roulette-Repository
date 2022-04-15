import { checkError, client } from './client';

export const createFavorite = async (restaurant_alias, user_id) =>
  await client.from('favorites').insert({ restaurant_alias, user_id });

export const deleteFavorite = async (restaurant_alias, user_id) =>
  await client.from('favorites').delete().match({ restaurant_alias, user_id });

export const getFavorites = async () => {
  const data = await client.from('favorites').select();
  return checkError(data);
};
export async function fetchFavorites() {
  const resp = await client.from('favorites').select('restaurant_alias');

  return checkError(resp);
}
