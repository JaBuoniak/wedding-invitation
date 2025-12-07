

const Hero = () => {
    return (
        <header className="section" style={{ paddingBottom: '1rem' }}>
            <div style={{
                width: '100%',
                height: '300px',
                backgroundColor: '#e0e0e0',
                borderRadius: 'var(--border-radius)',
                marginBottom: '2rem',
                backgroundImage: 'url(https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}></div>

            <h1>Anna & Jan</h1>
            <p style={{
                fontSize: '1.2rem',
                fontStyle: 'italic',
                marginTop: '0.5rem',
                color: 'var(--color-primary)'
            }}>07.07.2025</p>
        </header>
    );
};

export default Hero;
