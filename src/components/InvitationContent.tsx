

const InvitationContent = () => {
    return (
        <section className="section">
            <p style={{ marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>
                Mamy zaszczyt zaprosić
            </p>

            <div style={{ margin: '2rem 0', fontFamily: 'var(--font-serif)', fontSize: '1.5rem' }}>
                <p>Sz. P. Annę Nowak</p>
                <p>Jana Nowaka</p>
                <p style={{ fontSize: '1.2rem', marginTop: '0.5rem' }}>wraz z dziećmi</p>
                <p style={{ fontSize: '1.2rem' }}>Lilią i Malwiną</p>
            </div>

            <p style={{ marginBottom: '1rem' }}>
                na uroczystość zaślubin, która odbędzie się
            </p>

            <p style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-primary)' }}>
                dnia 7 lipca 2025 roku
            </p>
            <p>o godzinie 16:00</p>
        </section>
    );
};

export default InvitationContent;
