import { Children, cloneElement, isValidElement, useState } from 'react';
import type { ReactNode } from 'react';

type AccordionProps = {
  children: ReactNode;
  shouldAllowMultipleExpanded?: boolean;
  defaultExpandedIndexes?: number[];
};

type AccordionItemInjectedProps = {
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
};

export function Accordion({
  children,
  shouldAllowMultipleExpanded = true,
  defaultExpandedIndexes,
}: AccordionProps) {

  // track - which panels are currently expanded
  const [expandedIndexes, setExpandedIndexes] = useState<number[]>(
    defaultExpandedIndexes || []
  );

  // toggle - based on expansion mode
  const handleToggle = (index: number) => {
    setExpandedIndexes((currentIndexes) => {
      const isExpanded = currentIndexes.includes(index);

      if (shouldAllowMultipleExpanded) {
        return isExpanded
          ? currentIndexes.filter((item) => item !== index)
          : [...currentIndexes, index];
      }

      return isExpanded ? [] : [index];
    });
  };

  return (
    <div>
      {Children.map(children, (child, index) => {
        if (!isValidElement<AccordionItemInjectedProps>(child)) return child;

        return cloneElement(child, {
          index,
          isExpanded: expandedIndexes.includes(index),
          onToggle: () => handleToggle(index),
        });
      })}
    </div>
  );
}