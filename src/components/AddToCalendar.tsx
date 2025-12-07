import { Calendar } from 'lucide-react';

const AddToCalendar = () => {
    // Example Google Calendar Link (needs real dates)
    const googleLink = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Ślub+Anny+i+Jana&dates=20250707T140000Z/20250708T020000Z&details=Zapraszamy+na+nasz+ślub!&location=Warszawa";

    return (
        <section className="section" style={{ backgroundColor: 'var(--color-secondary)' }}>
            <Calendar size={32} style={{ marginBottom: '1rem', color: 'var(--color-primary)' }} />
            <h2>Dodaj do kalendarza</h2>
            <p style={{ marginBottom: '1.5rem' }}>Nie zapomnij o naszej dacie!</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '300px', margin: '0 auto' }}>
                <a href={googleLink} target="_blank" rel="noopener noreferrer" className="btn">
                    Google Calendar
                </a>
                <button className="btn btn-secondary" onClick={() => alert('Pobieranie pliku .ics...')}>
                    Apple / Outlook (.ics)
                </button>
            </div>
        </section>
    );
};

export default AddToCalendar;
