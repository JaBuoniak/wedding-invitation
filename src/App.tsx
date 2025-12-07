import Header from './components/Header';
import InvitationContent from './components/InvitationContent';
import LocationMap from './components/LocationMap';
import AddToCalendar from './components/AddToCalendar';
import RsvpForm from './components/RsvpForm';

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
        <AddToCalendar />
        <RsvpForm />
      </main>
      <footer className="section" style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
        <p>&copy; 2025 Anna & Paweł</p>
      </footer>
    </div>
  );
}

export default App;
