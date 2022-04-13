import { getFavorites } from './favorites';

export async function fetchRestaurants(search = '', lat = '', long = '') {
  const params = new URLSearchParams();
  params.set('search', search);
  params.set('latitude', lat);
  params.set('longitude', long);
  const resp = await fetch(`/.netlify/functions/fetch-yelp?${params.toString()}`, {
    headers: { Accept: 'application/json' },
  });

  const { businesses } = await resp.json();
  const favorites = await getFavorites();
  const mutated = businesses.map((business) => {
    for (const favorite of favorites) {
      if (favorite.restaurant_alias === business.alias) return { ...business, checked: true };
    }
    return { ...business, checked: false };
  });
  return mutated;
}

export async function fetchRestaurantZip(zip = '97034', search = '') {
  const params = new URLSearchParams();
  params.set('zip', zip);
  params.set('search', search);
  const resp = await fetch(`/.netlify/functions/fetch-zip?${params.toString()}`, {
    headers: { Accept: 'application/json' },
  });

  const { businesses } = await resp.json();
  const favorites = await getFavorites();
  const mutated = businesses.map((business) => {
    for (const favorite of favorites) {
      if (favorite.restaurant_alias === business.alias) return { ...business, checked: true };
    }
    return { ...business, checked: false };
  });
  return mutated;
}
