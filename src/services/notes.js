import { client, checkError } from './client';
import { getUserId } from './user';

export async function createNote(note, alias) {
  const resp = await client.from('notes').insert({ note, alias, user_id: getUserId() });
  return checkError(resp);
}

// create an updateNote function 