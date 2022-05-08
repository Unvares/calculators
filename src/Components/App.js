import React from 'react';
import Slider from './Slider/';

const calculators = [
  {
    name: 'Triangle Surface',
    inputs: ['height', 'base'],
    formula: '(H * B) / 2',
    lastResponse: {
      value: null,
      status: null,
    },
  },
  {
    name: 'Circle Diameter',
    inputs: ['radius'],
    formula: '2R',
    lastResponse: {
      value: null,
      status: null,
    },
  },
];

const App = () => <Slider calculators={calculators} />;

export default App;
