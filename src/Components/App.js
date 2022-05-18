import React, { useState, useEffect } from 'react';
import { Slider } from './Slider';
import { mockServer } from '../../server/mockServer.js';

const Server = new mockServer();

const App = () => {
  const [calculators, setCalculators] = useState([]);

  useEffect(() => {
    const request = JSON.stringify({ method: 'GET', path: '' });

    Server.fetch(request)
      .then((response) => JSON.parse(response))
      .then(({ calculators }) => setCalculators(calculators))
      .catch((message) => {
        throw Error(message);
      });
  }, []);

  return <Slider calculators={calculators} />;
};

export { App };
