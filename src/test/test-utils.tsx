import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';


// helper fun -  for userEvent with render in tests
export function renderWithUser(ui: ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(ui),
  };
}