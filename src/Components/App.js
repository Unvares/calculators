import React, { useState, useEffect } from 'react';
import { Slider } from './Slider';
import { MockServer } from '../../server/MockServer.js';

const Server = new MockServer();

const App = () => {
  const [calculators, setCalculators] = useState([]);

  useEffect(() => {
    const request = JSON.stringify({ method: 'GET', path: '' });

    Server.fetch(request)
      .then((response) => JSON.parse(response))
      .then((calculators) => setCalculators(calculators))
      .catch((message) => {
        throw Error(message);
      });
  }, []);

  return <Slider calculators={calculators} />;
};

export { App, Server };
