import SeagullDecoration from "./decorations/SeagullDecoration";

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
            <p className="mb-05">
                z radością zapraszają
            </p>

            <div className="mt-2 mb-2 text-center text-serif text-2xl" style={{ position: 'relative' }}>
                <SeagullDecoration
                    variant="sitting1"
                    width="60px"
                    style={{ position: 'absolute', right: '10px', top: '-50px' }}
                    flip
                />
                <p className="text-lg mt-05">Sz.P. </p>

                <p>{who}</p>

                {and && (
                    <>
                        <p className="text-lg" style={{ marginTop: '-0.5rem', marginBottom: '-0.7rem' }}>i</p>
                        <p>{and}</p>
                    </>
                )}

                {withChildren && (
                    <>
                        <p className="text-lg mt-05">wraz z</p>
                        <p className="text-2xl">{withChildren}</p>
                    </>
                )}
            </div>

            <p className="mb-1">
                na uroczystość zaślubin, która odbędzie się
            </p>

            <p className="text-lg font-semibold text-primary">
                13 czerwca 2026 roku
            </p>
            <p className="text-primary">o godzinie 15:00</p>
        </section>
    );
};

export default InvitationContent;
