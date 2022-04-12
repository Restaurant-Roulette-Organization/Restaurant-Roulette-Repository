import { client } from './client';

export const createFavorite = async (fav) => await client.from('favorites').insert(fav);
