import imageHeader from '../assets/photo/header/07.jpg';

const Header = () => {
    return (
        <header className="section" style={{ paddingBottom: '1rem' }}>
            <div style={{
                width: '100%',
                height: '400px',
                backgroundColor: '#e0e0e0',
                borderRadius: 'var(--border-radius)',
                marginBottom: '2rem',
                backgroundImage: `url(${imageHeader})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}></div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1fr)', // minmax(0, 1fr) prevents overflow on small screens
                gap: '1rem',
                alignItems: 'center',
                width: '100%',
                maxWidth: '100%' // Ensure container doesn't overflow
            }}>
                {/* Left Column */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <h1 style={{ margin: 0, fontSize: '3.5rem', lineHeight: '1.2' }}>Ania</h1>
                    <p style={{
                        margin: 0,
                        fontSize: '1.2rem',
                        fontStyle: 'italic',
                        color: 'var(--color-primary)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>Imbiorkiewicz</p>
                </div>

                {/* Middle Column */}
                <div style={{ fontSize: '3.5rem', fontFamily: 'var(--font-serif)', color: 'var(--color-primary)' }}>
                    &
                </div>

                {/* Right Column */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <h1 style={{ margin: 0, fontSize: '3.5rem', lineHeight: '1.2' }}>Paweł</h1>
                    <p style={{
                        margin: 0,
                        fontSize: '1.2rem',
                        fontStyle: 'italic',
                        color: 'var(--color-primary)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>Jabłoński</p>
                </div>
            </div>
        </header>
    );
};

export default Header;
