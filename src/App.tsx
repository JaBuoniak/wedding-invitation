import Header from './components/Header';
import InvitationContent from './components/InvitationContent';
import LocationMap from './components/LocationMap';
import RsvpForm from './components/RsvpForm';
import AccommodationDetails from './components/AccommodationDetails';

function App() {

  return (
    <div className="container">
      <Header />
      <main>
        <InvitationContent
          who="Annę Nowak"
          and="Jana Nowaka"
          with="Lilią i Malwiną"
        />
        <LocationMap />
        <AccommodationDetails />
        <RsvpForm
          guestName="Anna Nowak"
          maxAdults={2}
          maxChildren={2}
          maxUnder10={1}
        />
      </main>
      <footer className="section text-sm text-muted">
        <p>&copy; 2025 Anna & Paweł</p>
      </footer>
    </div>
  );
}

export default App;
