import { client, checkError } from './client';

export async function createNote(note) {
  const resp = await client.from('favorites').insert(note);
  return checkError(resp);
}