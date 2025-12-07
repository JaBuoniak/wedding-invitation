import { useState, type FormEvent } from 'react';

const RsvpForm = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setSubmitted(true);
        }, 1000);
    };

    if (submitted) {
        return (
            <section className="section">
                <h2 style={{ color: 'var(--color-primary)' }}>Dziękujemy!</h2>
                <p>Twoje zgłoszenie zostało przyjęte.</p>
            </section>
        );
    }

    return (
        <section className="section" style={{ paddingBottom: '4rem' }}>
            <h2>Potwierdzenie przybycia</h2>
            <p style={{ marginBottom: '2rem' }}>Prosimy o potwierdzenie do 1 czerwca 2025</p>

            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'left' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Imię i Nazwisko</label>
                    <input type="text" required placeholder="np. Jan Nowak" />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Liczba osób</label>
                    <select>
                        <option value="1">1 osoba</option>
                        <option value="2">2 osoby</option>
                        <option value="3">3 osoby</option>
                        <option value="4">4 osoby</option>
                        <option value="5">5 osób</option>
                    </select>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Rezerwacja noclegu</label>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center' }}>
                            <input type="radio" name="nocleg" value="tak" style={{ width: 'auto', marginRight: '0.5rem' }} /> Tak
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center' }}>
                            <input type="radio" name="nocleg" value="nie" defaultChecked style={{ width: 'auto', marginRight: '0.5rem' }} /> Nie
                        </label>
                    </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Wiadomość / Dieta</label>
                    <textarea rows={3} placeholder="Wegetariańskie, bez glutenu..." />
                </div>

                <button type="submit" className="btn" style={{ width: '100%' }}>Potwierdź obecność</button>
            </form>
        </section>
    );
};

export default RsvpForm;
