import { client, checkError } from './client';

export function getUser() {
  return client.auth.session() && client.auth.session().user.email;
}
export async function signUpUser(email, password) {
  const { user } = await client.auth.signUp({ email, password });

  return user;
}

export async function signInUser(email, password) {
  const { user } = await client.auth.signIn({ email, password });
  return user;
}

export async function logout() {
  const resp = await client.auth.signOut();
  return checkError(resp);
}

//----------------- like feature ----------------------

export async function createFavorite(id) {
  const resp = await client.from('Favorites').insert({ user_id: getUser().id, restraunt_id });
}
