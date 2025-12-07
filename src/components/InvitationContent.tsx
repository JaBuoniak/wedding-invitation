type GuestProps = {
    who: string;
    and?: string | null;
    with?: string | null;
};

// Default props for development/preview
const defaultGuest: GuestProps = {
    who: "Annę Nowak",
    and: "Jana Nowaka",
    with: "Lilią i Malwiną"
};

const InvitationContent = ({ who, and, with: withChildren }: GuestProps = defaultGuest) => {
    return (
        <section className="section">
            <p style={{ marginBottom: '0.5rem' }}>
                mają zaszczyt zaprosić
            </p>

            <div style={{ margin: '2rem 0', fontFamily: 'var(--font-serif)', fontSize: '2rem' }}>
                <p style={{ fontSize: '1.2rem', marginTop: '0.5rem' }}>Sz.P. </p>

                <p>{who}</p>

                {and && (
                    <>
                        <p style={{ fontSize: '1.2rem', marginTop: '-0.5rem', marginBottom: '-0.7rem' }}>i</p>
                        <p>{and}</p>
                    </>
                )}

                {withChildren && (
                    <>
                        <p style={{ fontSize: '1.2rem', marginTop: '0.5rem' }}>wraz z</p>
                        <p style={{ fontSize: '2rem' }}>{withChildren}</p>
                    </>
                )}
            </div>

            <p style={{ marginBottom: '1rem' }}>
                na uroczystość zaślubin, która odbędzie się
            </p>

            <p style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-primary)' }}>
                13 czerwca 2026 roku
            </p>
            <p style={{ color: 'var(--color-primary)' }}>o godzinie 15:00</p>
        </section>
    );
};

export default InvitationContent;
