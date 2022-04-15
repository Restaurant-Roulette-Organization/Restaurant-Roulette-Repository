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
  const resp = await client.from('profiles').select('*');
  console.log(resp);
  return checkError(resp);
}

export async function insertProfileData(userName, id) {
  const user = await client.from('profiles').insert({ userName, id });

  return checkError(user);
}

export async function updateProfileData(userName, profile_picture, bio, favorite_food) {
  const user = await client
    .from('profiles')
    .update({ profile_picture, userName, bio, favorite_food })
    .match({ id: getUserId() });

  return checkError(user);
}
