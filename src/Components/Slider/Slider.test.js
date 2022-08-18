import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { SliderContent } from './SliderContent';
import { SliderNavigation } from './SliderNavigation';
import { Slider } from '.';
import { Server } from '../App';

jest.mock('../App');

const calculators = [
  {
    title: 'Triangle Surface',
    inputs: ['height', 'base'],
    formula: '(H * B) / 2',
  },
  {
    title: 'Square Surface',
    inputs: ['side'],
    formula: 'A * A',
  },
  {
    title: 'Rectangle Surface',
    inputs: ['side 1', 'side 2'],
    formula: 'A * B',
  },
];

describe('SliderContent', () => {
  it('renders calculator and control arrows', () => {
    const {
      container: { firstChild: tree },
    } = render(
      <SliderContent
        activeId={0}
        calculator={calculators[0]}
        length={calculators.length}
      />
    );

    expect(tree).toMatchSnapshot();
  });
});

describe('SliderNavigation', () => {
  const titles = calculators.map(({ title }) => title);

  it('renders titles properly', () => {
    const {
      container: { firstChild: tree },
    } = render(<SliderNavigation titles={titles} />);

    expect(tree).toMatchSnapshot();
  });
});

describe('Slider', () => {
  const setup = () => {
    const {
      container: { firstChild: tree },
      findByDisplayValue,
      findByLabelText,
      findByText,
      getByText,
    } = render(<Slider calculators={calculators} />);

    return { tree, findByDisplayValue, findByLabelText, findByText, getByText };
  };

  it('returns null if no calculator data is provided', () => {
    const {
      container: { firstChild: tree },
    } = render(<Slider />);

    expect(tree).toBeNull();
  });

  it('switches via arrows properly', async () => {
    const { tree, findByText } = setup();

    const prevArrow = tree.querySelector('.content__arrow_prev');
    const nextArrow = tree.querySelector('.content__arrow_next');

    await findByText('TRIANGLE SURFACE');

    fireEvent.click(nextArrow);

    await findByText('SQUARE SURFACE');

    fireEvent.click(nextArrow);

    await findByText('RECTANGLE SURFACE');

    fireEvent.click(nextArrow);

    await findByText('TRIANGLE SURFACE');

    fireEvent.click(nextArrow);
    fireEvent.click(nextArrow);
    fireEvent.click(nextArrow);
    fireEvent.click(nextArrow);

    await findByText('SQUARE SURFACE');

    fireEvent.click(prevArrow);
    fireEvent.click(prevArrow);

    await findByText('RECTANGLE SURFACE');
  });

  it('switches via navigation panel properly', async () => {
    const { findByText, getByText } = setup();

    const switchToTriangleSurfaceButton = getByText('Triangle Surface');
    const switchToSquareSurfaceButton = getByText('Square Surface');
    const switchToRectangleSurfaceButton = getByText('Rectangle Surface');

    fireEvent.click(switchToSquareSurfaceButton);

    await findByText('SQUARE SURFACE');

    fireEvent.click(switchToRectangleSurfaceButton);

    await findByText('RECTANGLE SURFACE');

    fireEvent.click(switchToTriangleSurfaceButton);

    await findByText('Triangle Surface');
  });

  it('remembers last values properly', async () => {
    Server.fetch.mockResolvedValueOnce('25');
    Server.fetch.mockRejectedValueOnce('sus');

    const { tree, findByDisplayValue, findByLabelText, findByText } = setup();
    const nextArrow = tree.querySelector('.content__arrow_next');

    const inputBase = await findByLabelText('BASE');
    const inputHeight = await findByLabelText('HEIGHT');
    const submitButton = tree.querySelector('button[type="submit"]');

    fireEvent.change(inputBase, { target: { value: 10 } });
    fireEvent.change(inputHeight, { target: { value: 5 } });
    fireEvent.click(submitButton);

    await findByText('25');

    fireEvent.click(nextArrow);

    const inputSide = await findByLabelText('SIDE');

    fireEvent.change(inputSide, { target: { value: 'Not a number' } });
    fireEvent.click(submitButton);

    await findByText('ERROR');

    fireEvent.click(nextArrow);
    fireEvent.click(nextArrow);

    await findByText('25');
    await findByDisplayValue('10');
    await findByDisplayValue('5');

    fireEvent.click(nextArrow);

    await findByDisplayValue('Not a number');
    await findByText('ERROR');
  });
});
