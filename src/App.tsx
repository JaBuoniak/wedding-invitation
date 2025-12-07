
import Hero from './components/Hero';
import InvitationContent from './components/InvitationContent';
import LocationMap from './components/LocationMap';
import AddToCalendar from './components/AddToCalendar';
import RsvpForm from './components/RsvpForm';

function App() {
  return (
    <div className="container">
      <Hero />
      <main>
        <InvitationContent />
        <LocationMap />
        <AddToCalendar />
        <RsvpForm />
      </main>
      <footer className="section" style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
        <p>&copy; 2025 Anna & Jan</p>
      </footer>
    </div>
  );
}

export default App;
