import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import Header from './components/Header';
import InvitationContent from './components/InvitationContent';
import LocationMap from './components/LocationMap';
import RsvpForm from './components/RsvpForm';
import AccommodationDetails from './components/AccommodationDetails';
import WaveDecoration from './components/decorations/WaveDecoration';
import YachtDecoration from './components/decorations/YachtDecoration';

// Typy zgodne z bazą danych
type Invitation = {
  slug: string;
  guest_who: string;
  guest_and: string | null;
  guest_with: string | null;
  max_adults: number;
  max_children: number;
  max_under10: number;
  max_under2: number;
};

function App() {
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInvitation = async () => {
      // Pobieramy slug z parametru URL ?id=...
      const params = new URLSearchParams(window.location.search);
      const slug = params.get('id');

      if (!slug) {
        setError('Brak kodu zaproszenia w adresie strony.');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('invitations')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        console.error('Error fetching invitation:', error);
        setError('Nie znaleziono zaproszenia o podanym kodzie.');
      } else {
        setInvitation(data);
      }
      setLoading(false);
    };

    fetchInvitation();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Ładowanie zaproszenia...</div>;
  }

  if (error || !invitation) {
    return (
      <div className="container text-center p-4" style={{ marginTop: '2rem' }}>
        <h2 className="text-primary mb-2">Ups!</h2>
        <p>{error || 'Wystąpił nieoczekiwany błąd.'}</p>
        <p className="text-muted text-sm mt-2">Sprawdź czy adres strony jest poprawny.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <Header />

      <main>
        <InvitationContent
          who={invitation.guest_who}
          and={invitation.guest_and}
          with={invitation.guest_with}
        />

        <WaveDecoration />

        <LocationMap />

        <WaveDecoration />

        <AccommodationDetails />

        <WaveDecoration />

        <RsvpForm
          slug={invitation.slug}
          maxAdults={invitation.max_adults}
          maxChildren={invitation.max_children}
          maxUnder10={invitation.max_under10}
          maxUnder2={invitation.max_under2}
        />
      </main>

      <footer className="text-center text-sm text-muted">
        <div className="mb-3">
          <YachtDecoration />
          <p>&copy; 2025 Anna & Paweł</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
