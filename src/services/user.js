import { client, checkError } from './client';

export function getUser() {
  return client.auth.session() && client.auth.session().user.email;
}
export function getUserId() {
  return client.auth.session() && client.auth.session().user.id;
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

//----------------- profile ----------------------

export async function fetchProfileData() {
  const { user } = await client.from('profiles').select('*');

  return checkError(user);
}

export async function insertProfileData() {
  const { user } = await client.insert({ profile_picture, username, bio, favorite_food });

  return checkError(user);
}
