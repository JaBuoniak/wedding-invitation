import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { supabase } from '../../supabaseClient';

interface Guest {
  id: number;
  name: string;
  table_number: number;
}

const SeatSearchSection = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [search, setSearch] = useState('');
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const { data, error } = await supabase
          .from('guests')
          .select('id, name, table_number')
          .order('name');

        if (error) throw error;
        setGuests(data || []);
      } catch (err) {
        console.error('Error fetching guests:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGuests();
  }, []);

  const normalize = (text: string) =>
    text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();

  const filteredGuests = search.length >= 2
    ? guests.filter(g => normalize(g.name).includes(normalize(search)))
    : [];

  const handleSelect = (guest: Guest) => {
    setSelectedGuest(guest);
    setSearch('');
  };

  if (isLoading) return null;

  return (
    <section className="info-seat-search">
      <div className="info-seat-search__header">
        <h2 className="info-seat-search__title">
          <Search size={22} className="info-seat-search__title-icon" />
          Znajdź swoje miejsce
        </h2>
      </div>

      <div className="info-seat-search__search-container">
        <div className="info-seat-search__input-wrapper">
          <input
            type="text"
            className="info-seat-search__input"
            placeholder="Podaj imię lub nazwisko..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedGuest(null);
            }}
          />
        </div>

        {search.length >= 2 && filteredGuests.length > 0 && !selectedGuest && (
          <div className="info-seat-search__results">
            {filteredGuests.map((guest) => (
              <button
                key={guest.id}
                className="info-seat-search__result-item"
                onClick={() => handleSelect(guest)}
              >
                {guest.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {search.length >= 2 && filteredGuests.length === 0 && !selectedGuest && (
        <div className="info-seat-search__no-results">
          Nie znaleźliśmy Twojego nazwiska na liście. Spróbuj wpisać samo nazwisko.
        </div>
      )}

      {selectedGuest && (
        <div className="info-seat-search__result-card">
          <div className="info-seat-search__result-card-content">
            <span className="info-seat-search__guest-name-badge">{selectedGuest.name}</span>
            <p className="info-seat-search__result-text">
              Zajmij swoje miejsce przy <strong>stole nr {selectedGuest.table_number}</strong>
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default SeatSearchSection;
