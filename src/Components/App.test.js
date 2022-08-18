import React from 'react';
import { render } from '@testing-library/react';
import { App, Server } from './App';

jest.mock('../../server/MockServer');

const calculators = [
  {
    title: 'Triangle Surface',
    inputs: ['height', 'base'],
    formula: '(H * B) / 2',
  },
];

describe('App', () => {
  it('renders properly', async () => {
    Server.fetch.mockResolvedValue(JSON.stringify(calculators));

    const { findByText } = await render(<App />);

    await findByText('TRIANGLE SURFACE');
  });
});
