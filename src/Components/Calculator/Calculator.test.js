import React from 'react';
import { fireEvent, render, act } from '@testing-library/react';
import { CalculatorTitle } from './CalculatorTitle';
import { CalculatorForm } from './CalculatorForm';
import { CalculatorInfo } from './CalculatorInfo';
import { Calculator } from './';
import { Server } from '../App';

jest.mock('../App');

describe('CalculatorTitle', () => {
  it('renders "Triangle Surface" title', () => {
    const {
      container: { firstChild: tree },
    } = render(<CalculatorTitle>Triangle Surface</CalculatorTitle>);
    expect(tree).toMatchSnapshot();
  });
});

describe('CalculatorForm', () => {
  const setup = () => {
    const inputs = ['height', 'base'];
    const {
      container: { firstChild: tree },
      getByLabelText,
    } = render(
      <CalculatorForm inputs={inputs} activeId={null} setLastResponses={null} />
    );

    return { tree, getByLabelText };
  };

  it('renders height and base input fields', () => {
    const { tree } = setup();
    expect(tree).toMatchSnapshot();
  });

  it('types 5 and 10 into height and base input fields', () => {
    const { tree, getByLabelText } = setup();
    const inputHeight = getByLabelText('HEIGHT');
    const inputBase = getByLabelText('BASE');

    fireEvent.change(inputHeight, { target: { value: 5 } });
    fireEvent.change(inputBase, { target: { value: 10 } });

    expect(inputHeight.value).toEqual('5');
    expect(inputBase.value).toEqual('10');
    expect(tree).toMatchSnapshot();
  });
});

describe('CalculatorInfo', () => {
  it('renders (H * B) / 2 formula', () => {
    const formula = '(H * B) / 2';
    const {
      container: { firstChild: tree },
    } = render(<CalculatorInfo formula={formula} />);

    expect(tree).toMatchSnapshot();
  });

  it('renders with processing status', () => {
    const {
      container: { firstChild: tree },
    } = render(
      <CalculatorInfo
        lastResponse={{ status: 'processing', value: 'processing...' }}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders with error status', () => {
    const {
      container: { firstChild: tree },
    } = render(
      <CalculatorInfo lastResponse={{ status: 'error', value: 'error' }} />
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders with fulfilled status', () => {
    const {
      container: { firstChild: tree },
    } = render(
      <CalculatorInfo lastResponse={{ status: 'fulfilled', value: '25' }} />
    );
    expect(tree).toMatchSnapshot();
  });
});

describe('Calculator', () => {
  const calculator = {
    title: 'Triangle Surface',
    inputs: ['height', 'base'],
    formula: '(H * B) / 2',
  };

  it('renders "Triangle Surface" with height and base inputs and "(H * B) / 2" formula', () => {
    const {
      container: { firstChild: tree },
    } = render(<Calculator activeId={0} calculator={calculator} />);

    expect(tree).toMatchSnapshot();
  });

  it('returns 25 on form submit with 5 and 10 as input values', async () => {
    Server.fetch = jest.fn(() => Promise.resolve('25'));
    const {
      container: { firstChild: tree },
      getByLabelText,
      findByText,
    } = render(<Calculator activeId={0} calculator={calculator} />);
    const inputHeight = getByLabelText('HEIGHT');
    const inputBase = getByLabelText('BASE');
    const submitButton = tree.querySelector('button[type="submit"]');

    fireEvent.change(inputHeight, { target: { value: 5 } });
    fireEvent.change(inputBase, { target: { value: 10 } });

    fireEvent.click(submitButton);

    expect(tree).toMatchSnapshot();

    await findByText('25');

    expect(tree).toMatchSnapshot();
  });
});
