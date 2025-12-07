interface ContactSectionProps {
    email: string;
    phone: string;
    onEmailChange: (value: string) => void;
    onPhoneChange: (value: string) => void;
}

const ContactSection = ({ email, phone, onEmailChange, onPhoneChange }: ContactSectionProps) => {
    return (
        <div className="form-group">
            <div className="mb-2">
                <label className="form-label">Email</label>
                <input
                    type="email"
                    required
                    placeholder="jan@example.com"
                    value={email}
                    onChange={e => onEmailChange(e.target.value)}
                />
            </div>
            <div className="mb-2">
                <label className="form-label">Telefon</label>
                <input
                    type="tel"
                    required
                    placeholder="+48 123 456 789"
                    value={phone}
                    onChange={e => onPhoneChange(e.target.value)}
                />
            </div>
        </div>
    );
};

export default ContactSection;
