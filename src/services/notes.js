import { client, checkError } from './client';
import { getUserId } from './user';

export async function fetchNote(alias) {
  const resp = await client.from('notes').select().match({ alias });

  console.log('notes are here', resp);
  return checkError(resp);
}

export async function createNote(note, alias) {
  const resp = await client.from('notes').insert({ note, alias, user_id: getUserId() });
  return checkError(resp);
}
export async function updateNote() {
  const resp = await client.from('notes').update();
  return checkError(resp);
}
// create an updateNote function
