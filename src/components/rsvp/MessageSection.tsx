interface MessageSectionProps {
    value: string;
    onChange: (value: string) => void;
}

const MessageSection = ({ value, onChange }: MessageSectionProps) => {
    return (
        <div className="form-group">
            <label className="form-label">Wiadomość / Dieta</label>
            <textarea
                rows={3}
                placeholder="Wegetariańskie, bez glutenu..."
                value={value}
                onChange={e => onChange(e.target.value)}
            />
        </div>
    );
};

export default MessageSection;
