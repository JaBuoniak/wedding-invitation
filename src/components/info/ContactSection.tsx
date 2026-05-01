import type { WeddingPhase } from './weddingPhase';

interface Contact {
  name: string;
  role: string;
  phone: string;
  display: string;
}

const CONTACTS_BEFORE: Contact[] = [
  { name: 'Ania', role: 'Panna Młoda', phone: '+48504094280', display: '504 094 280' },
  { name: 'Paweł', role: 'Pan Młody', phone: '+48600228402', display: '600 228 402' },
  { name: 'Piękny Brzeg', role: 'Recepcja', phone: '+48570955544', display: '570 955 544' }
];

const CONTACTS_DURING: Contact[] = [
  { name: 'Krzysiek', role: 'Świadek', phone: '+48737458879', display: '737 458 879' },
  { name: 'Renia', role: 'Świadkowa', phone: '+48880422968', display: '880 422 968' },
  { name: 'Piękny Brzeg', role: 'Recepcja', phone: '+48570955544', display: '570 955 544' }
];

const CONTACTS_AFTER: Contact[] = [
  { name: 'Ania', role: 'Żona', phone: '+48504094280', display: '504 094 280' },
  { name: 'Paweł', role: 'Mąż', phone: '+48600228402', display: '600 228 402' }
];

interface ContactSectionProps {
  phase: WeddingPhase;
}

const ContactSection = ({ phase }: ContactSectionProps) => {
  const contacts =
    phase === 'during' ? CONTACTS_DURING :
    phase === 'after' ? CONTACTS_AFTER :
    CONTACTS_BEFORE;

  return (
    <div className="info-contact__items">
      {contacts.map((contact) => (
        <div className="info-contact__item" key={contact.phone}>
          <div>
            <p className="info-contact__person">{contact.name}</p>
            <p className="info-contact__role">{contact.role}</p>
          </div>
          <a
            id={`btn-call-${contact.name.toLowerCase().replace(/\s/g, '-')}`}
            href={`tel:${contact.phone}`}
            className="info-contact__phone-btn"
          >
            {contact.display}
          </a>
        </div>
      ))}
    </div>
  );
};

export default ContactSection;
