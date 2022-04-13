import { useState } from 'react';

export default function Notes() {
  const [note, setNote] = useState('');

  //   const handleSubmit = async () => {

  //   };

  return (
    <div className="note">
      Notes about this restaurant:
      <div className="note-control">
        <input value={note} name="notes" type="text" onChange={(e) => setNote(e.target.value)} />
      </div>
      <button type="submit">submit</button>
    </div>
  );
}
