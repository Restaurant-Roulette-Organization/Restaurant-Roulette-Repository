import { getFavorites } from './favorites';

export async function fetchRestaurants(search = '', lat = '', long = '') {
  const params = new URLSearchParams();
  console.log(lat, long, 'string');
  params.set('search', search);
  // params.set('location', zip);
  params.set('latitude', lat);
  params.set('longitude', long);
  const resp = await fetch(`/.netlify/functions/fetch-yelp?${params.toString()}`, {
    headers: { Accept: 'application/json' },
  });
  console.log('resp', resp);

  const { businesses } = await resp.json();
  const favorites = await getFavorites();
  const mutated = businesses.map((business) => {
    for (const favorite of favorites) {
      if (favorite.restaurant_alias === business.alias) return { ...business, checked: true };
    }
    return business;
  });
  return mutated;
}
