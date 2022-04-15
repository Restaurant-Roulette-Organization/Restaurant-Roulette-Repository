import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useRestaurantContext } from '../../Context/RestaurantContext';
import { createNote } from '../../services/notes';

export default function Notes({ setSuccess, alias, setNotes }) {
  const { note, setNote, setError } = useRestaurantContext();

  const location = useLocation();

  useEffect(() => {
    setNote('');
  }, [location, setNote]);

  const handleSubmit = async () => {
    try {
      const resp = await createNote(note, alias);
      setSuccess(true);
      setNotes(resp[0]);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="note">
      Notes about this restaurant:
      <div className="note-control">
        <input value={note} name="notes" type="text" onChange={(e) => setNote(e.target.value)} />
      </div>
      <button type="submit" onClick={handleSubmit}>
        submit
      </button>
    </div>
  );
}
