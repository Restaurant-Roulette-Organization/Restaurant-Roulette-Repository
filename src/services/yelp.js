import { getFavorites } from './favorites';

export async function fetchRestaurants(zip = '97034', search = '') {
  const params = new URLSearchParams();
  params.set('zip', zip);
  params.set('search', search);
  const resp = await fetch(`/.netlify/functions/fetch-yelp?${params.toString()}`, {
    headers: { Accept: 'application/json' },
  });

  const { businesses } = await resp.json();
  const favs = await getFavorites();
  const aliases = favs.map(({ restaurant_alias }) => restaurant_alias);
  const mutated = businesses.map((business) => {
    for (const alias of aliases) {
      if (alias === business.alias) return { ...business, checked: true };
    }
    return business;
  });
  return mutated;
}
