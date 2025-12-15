import { Calendar } from 'lucide-react';

import SeagullDecoration from '../decorations/SeagullDecoration';

interface DeadlineReminderProps {
    link: string;
}

const DeadlineReminder = ({ link }: DeadlineReminderProps) => {
    return (
        <>
            <h2>Potwierdzenie przybycia</h2>
            <p className="mb-3">Prosimy o potwierdzenie do 1 marca 2026 roku</p>

            <div className="mb-3 text-center" style={{ marginTop: '-1rem' }}>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <SeagullDecoration
                        variant="flying1"
                        width="50px"
                        style={{ position: 'absolute', left: '-55px', top: '-15px' }}
                    />
                    <a
                        href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Potwierdzenie+obecności+na+ślubie+Ani+i+Pawła&dates=20260301T090000Z/20260301T100000Z&details=${encodeURIComponent(`Ostateczny termin potwierdzenia przybycia!\nLink do zaproszenia: ${link}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary"
                        style={{ textDecoration: 'underline', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                        <Calendar size={16} />
                        Ustaw przypomnienie w kalendarzu
                    </a>
                </div>
            </div>
        </>
    );
};

export default DeadlineReminder;
