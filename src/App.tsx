import Header from './components/Header';
import InvitationContent from './components/InvitationContent';
import LocationMap from './components/LocationMap';
import RsvpForm from './components/RsvpForm';
import AccommodationDetails from './components/AccommodationDetails';
import WaveDecoration from './components/decorations/WaveDecoration';
import YachtDecoration from './components/decorations/YachtDecoration';


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
        <WaveDecoration />
        <LocationMap />
        <WaveDecoration />
        <AccommodationDetails />
        <WaveDecoration />
        <RsvpForm
          guestName="Anna Nowak"
          maxAdults={2}
          maxChildren={2}
          maxUnder10={1}
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
