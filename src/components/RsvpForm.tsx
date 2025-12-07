import { useState, useRef, type FormEvent } from 'react';
/* Components */
import ContactSection from './rsvp/ContactSection';
import GuestCountSection from './rsvp/GuestCountSection';
import AccommodationSection from './rsvp/AccommodationSection';
import MessageSection from './rsvp/MessageSection';
import DataProcessingNotice from './rsvp/DataProcessingNotice';
import ContactPhones from './rsvp/ContactPhones';
import AddToCalendar from './rsvp/AddToCalendar';
import DeadlineReminder from './rsvp/DeadlineReminder';
import UsefulInfoSection from './rsvp/UsefulInfoSection';

interface RsvpFormProps {
    guestName?: string;
    maxAdults?: number;
    maxChildren?: number;
    maxUnder10?: number;
    link?: string;
}

const RsvpForm = ({ maxAdults = 2, maxChildren = 0, maxUnder10 = 0, link = window.location.href }: RsvpFormProps) => {
    const [submitted, setSubmitted] = useState(false);
    const [declined, setDeclined] = useState(false);
    const [showDeclineModal, setShowDeclineModal] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const [formState, setFormState] = useState({
        email: '',
        phone: '',
        adults: maxAdults,
        children: maxChildren,
        under10: maxUnder10,
        accommodation: {
            friSat: false,
            satSun: false,
            sunMon: false,
        },
        message: '',
    });

    const updateCount = (field: 'adults' | 'children' | 'under10', delta: number, max: number) => {
        setFormState(prev => {
            const newValue = prev[field] + delta;
            if (newValue < 0 || newValue > max) return prev;
            return { ...prev, [field]: newValue };
        });
    };

    const handleCheckboxChange = (field: keyof typeof formState.accommodation) => {
        setFormState(prev => ({
            ...prev,
            accommodation: {
                ...prev.accommodation,
                [field]: !prev.accommodation[field]
            }
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setSubmitted(true);
        }, 1000);
    };

    const handleDeclineClick = () => {
        if (formRef.current && !formRef.current.checkValidity()) {
            formRef.current.reportValidity();
            return;
        }
        setShowDeclineModal(true);
    };

    const handleConfirmDecline = () => {
        // Phone is already validated before opening modal

        // Set guests to 0 and all accommodation to false
        setFormState(prev => ({
            ...prev,
            adults: 0,
            children: 0,
            under10: 0,
            accommodation: {
                friSat: false,
                satSun: false,
                sunMon: false,
            }
        }));

        setTimeout(() => {
            setSubmitted(true);
            setDeclined(true);
            setShowDeclineModal(false);
        }, 500);
    };

    // Success / Declined View
    if (submitted) {
        return (
            <section className="section">
                <h2 className="text-primary">{declined ? 'Rezygnacja' : 'Dziękujemy!'}</h2>
                <p style={{ maxWidth: '400px', margin: '0 auto 2rem auto' }}>
                    {declined
                        ? 'Przykro nam, że nie będzie nam dane spędzić tego dnia wspólnie. Jeśli coś się zmieni, koniecznie daj nam znać!'
                        : 'Dziękujemy za potwierdzenie! Nie możemy się doczekać!'}
                </p>

                {!declined && (<AddToCalendar />)}
                {declined && (<ContactPhones />)}
            </section>
        );
    }

    return (
        <section className="section mb-4">
            <DeadlineReminder link={link} />


            <form ref={formRef} onSubmit={handleSubmit} className="container" style={{ textAlign: 'left', maxWidth: '500px' }}>

                <ContactSection
                    email={formState.email}
                    phone={formState.phone}
                    onEmailChange={val => setFormState(s => ({ ...s, email: val }))}
                    onPhoneChange={val => setFormState(s => ({ ...s, phone: val }))}
                />

                <GuestCountSection
                    counts={{
                        adults: formState.adults,
                        children: formState.children,
                        under10: formState.under10
                    }}
                    limits={{
                        maxAdults,
                        maxChildren,
                        maxUnder10
                    }}
                    onUpdate={updateCount}
                />

                <AccommodationSection
                    accommodation={formState.accommodation}
                    onChange={handleCheckboxChange}
                />

                <MessageSection
                    value={formState.message}
                    onChange={val => setFormState(s => ({ ...s, message: val }))}
                />

                {/* Actions */}
                <div className="d-flex flex-col gap-2">
                    <button type="submit" className="btn w-full">Potwierdzam obecność</button>
                    <button
                        type="button"
                        onClick={handleDeclineClick}
                        className="btn-text"
                    >
                        Niestety nie, nie będzie mnie
                    </button>
                </div>

                {/* Disclaimer */}
                <div className="mt-2 pt-2 text-muted text-xs border-top" style={{ borderTop: '1px solid #eee' }}>
                    <DataProcessingNotice />
                    <ContactPhones />
                </div>
            </form>

            {/* Decline Modal */}
            {showDeclineModal && (
                <div className="modal-overlay" onClick={() => setShowDeclineModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h3>Rezygnacja</h3>
                        <p className="mb-2">Czy to już pewne, że nie dasz rady?</p>

                        <div className="d-flex justify-end gap-1">
                            <button className="btn btn-outline" onClick={() => setShowDeclineModal(false)}>Anuluj</button>
                            <button className="btn btn-danger" onClick={handleConfirmDecline}>Potwierdź rezygnację</button>
                        </div>
                    </div>
                </div>
            )}

            {!declined && (<UsefulInfoSection />)}
        </section>
    );
};

export default RsvpForm;
