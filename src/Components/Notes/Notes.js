import { useState } from 'react';

export default function Notes() {
  const [note, setNote] = useState('');

  return (
    <div className="note">
      <div className="note-control">
        <input value={note} name="notes" type="text" onChange={(e) => setNote(e.target.value)} />
      </div>
    </div>
  );
}
