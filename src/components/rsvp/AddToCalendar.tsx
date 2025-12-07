import { Calendar } from 'lucide-react';

const AddToCalendar = () => {

    const description = `Wesele i nocleg: <a href='https://pieknybrzeg.pl/'>Ośrodek wypoczynkowy "Piękny Brzeg"</a> nad Jeziorem Święcajty. Węgorzewo, ul. Leśna 18`;
    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Ślub+Ani+i+Pawła&dates=20260613T130000Z/20260614T020000Z&details=${encodeURIComponent(description)}&location=Kościół+św.+Kazimierza+Królewicza,+Giżycko`;

    return (
        <section className="section bg-secondary">
            <Calendar size={32} className="mb-1 text-primary" />
            <h2>Nie zapomnij o naszej dacie!</h2>
            <p className="mb-2">Dodaj do kalendarza</p>

            <div className="d-flex flex-col gap-1 mx-auto" style={{ maxWidth: '300px' }}>
                <a href={googleUrl} target="_blank" rel="noopener noreferrer" className="btn">
                    Google Calendar
                </a>
                <a href="/event.ics" download="slub-ani-i-pawla.ics" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
                    Apple / Outlook (.ics)
                </a>
            </div>
        </section>
    );
};

export default AddToCalendar;
