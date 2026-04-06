import type { LucideIcon } from 'lucide-react';
import { ChevronDown } from 'lucide-react';

interface AccordionSectionProps {
  id: string;
  title: string;
  Icon: LucideIcon;
  isOpen: boolean;
  onToggle: (id: string) => void;
  children: React.ReactNode;
}

const AccordionSection = ({
  id,
  title,
  Icon,
  isOpen,
  onToggle,
  children,
}: AccordionSectionProps) => {
  return (
    <div className="info-accordion__item">
      <button
        className="info-accordion__trigger"
        onClick={() => onToggle(id)}
        aria-expanded={isOpen}
        id={`accordion-trigger-${id}`}
      >
        <span className="info-accordion__trigger-label">
          <Icon size={18} className="info-accordion__icon" />
          <span className="info-accordion__title">{title}</span>
        </span>
        <ChevronDown
          size={20}
          className={`info-accordion__chevron ${isOpen ? 'info-accordion__chevron--open' : ''}`}
        />
      </button>

      <div
        className={`info-accordion__body ${isOpen ? 'info-accordion__body--open' : ''}`}
        role="region"
        aria-labelledby={`accordion-trigger-${id}`}
      >
        <div className="info-accordion__content">{children}</div>
      </div>
    </div>
  );
};

export default AccordionSection;
