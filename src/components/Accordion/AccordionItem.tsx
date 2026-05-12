import type { ReactNode } from 'react';

type AccordionItemProps = {
  title: string;
  children: ReactNode;
  index?: number;
  isExpanded?: boolean;
  isDisabled?: boolean;
  onToggle?: () => void; // optional, - parent injects it
};

export function AccordionItem({
  title,
  children,
  index = 0,
  isExpanded = false,
  isDisabled = false,
  onToggle,
}: AccordionItemProps) {

// Link button & panel - accessibility using matching IDs
  const buttonId = `accordion-button-${index}`;
  const panelId = `accordion-panel-${index}`;

  return (
    <div className="accordion-item" data-state={isExpanded ? 'open' : 'closed'}>
      <h3 className="accordion-heading">
        <button
          id={buttonId}
          type="button"
          aria-expanded={isExpanded}
          aria-controls={panelId}
          disabled={isDisabled}
          onClick={isDisabled ? undefined : onToggle}
          >

          <span>{title}</span>

          <span aria-hidden="true" className="accordion-icon">
            {isExpanded ? '▲' : '▼'}
          </span>

        </button>
      </h3>

      
          {isExpanded && (
        <div
          id={panelId}
          role="region"
          className="accordion-panel"
          aria-labelledby={buttonId}
        >
          {children}
        </div>
      )}
    </div>
  );
}