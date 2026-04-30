import { render, screen } from '@testing-library/react';
import { Accordion, AccordionItem } from './index';
import { renderWithUser } from '../../test/test-utils';

const accordionComponent = (
  <Accordion>
    <AccordionItem title="Panel one">Content for panel one</AccordionItem>
    <AccordionItem title="Panel two">Content for panel two</AccordionItem>
    <AccordionItem title="Panel three">Content for panel three</AccordionItem>
  </Accordion>
);

const singleExpandedAccordionComponent = (
  <Accordion shouldAllowMultipleExpanded={false}>
    <AccordionItem title="Panel one">Content for panel one</AccordionItem>
    <AccordionItem title="Panel two">Content for panel two</AccordionItem>
    <AccordionItem title="Panel three">Content for panel three</AccordionItem>
  </Accordion>
);

describe('Accordion', () => {
  test('renders accordion with multiple panels', () => {
    render(accordionComponent);

    const buttons = screen.getAllByRole('button');

    expect(buttons).toHaveLength(3);
    expect(screen.queryByText('Content for panel one')).toBeNull();
    expect(screen.queryByText('Content for panel two')).toBeNull();
    expect(screen.queryByText('Content for panel three')).toBeNull();
  });

  test('shows content for the clicked panel and hides the rest', async () => {
    const { user } = renderWithUser(accordionComponent);

    const buttons = screen.getAllByRole('button');

    await user.click(buttons[1]);

    expect(screen.getByText('Content for panel two')).toBeVisible();
    expect(screen.queryByText('Content for panel one')).toBeNull();
    expect(screen.queryByText('Content for panel three')).toBeNull();
  });

  test('hides content when an expanded panel is clicked again', async () => {
    const { user } = renderWithUser(accordionComponent);

    const buttons = screen.getAllByRole('button');

    await user.click(buttons[2]);

    expect(screen.getByText('Content for panel three')).toBeVisible();

    await user.click(buttons[2]);

    expect(screen.queryByText('Content for panel three')).toBeNull();
  });

  test('can expand multiple panels at the same time by default', async () => {
    const { user } = renderWithUser(accordionComponent);

    const buttons = screen.getAllByRole('button');

    await user.click(buttons[0]);
    await user.click(buttons[2]);

    expect(screen.getByText('Content for panel one')).toBeVisible();
    expect(screen.queryByText('Content for panel two')).toBeNull();
    expect(screen.getByText('Content for panel three')).toBeVisible();
  });

  describe('when shouldAllowMultipleExpanded is false', () => {
    test('only one panel is visible at a time', async () => {
      const { user } = renderWithUser(singleExpandedAccordionComponent);

      const buttons = screen.getAllByRole('button');

      await user.click(buttons[0]);

      expect(screen.getByText('Content for panel one')).toBeVisible();

      await user.click(buttons[2]);

      expect(screen.getByText('Content for panel three')).toBeVisible();
      expect(screen.queryByText('Content for panel one')).toBeNull();
    });
  });

  describe('accessibility', () => {
    test('each button has aria-controls pointing to its content region', () => {
      render(accordionComponent);

      const buttons = screen.getAllByRole('button');

      buttons.forEach((button) => {
        const controlsId = button.getAttribute('aria-controls');

        expect(controlsId).toBeTruthy();
        expect(document.getElementById(controlsId!)).toBeInTheDocument();
      });
    });

    test('content regions have aria-labelledby pointing back to their header', () => {
      render(accordionComponent);

      const regions = screen.getAllByRole('region', { hidden: true });

      regions.forEach((region) => {
        const labelledBy = region.getAttribute('aria-labelledby');

        expect(labelledBy).toBeTruthy();
        expect(document.getElementById(labelledBy!)).toBeInTheDocument();
      });
    });
  });
});