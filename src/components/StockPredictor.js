import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NeuralNetwork } from 'brain.js';

function StockPredictor({ data, onPrediction }) {
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    if (!data || data.length < 2) return;
    // Prepare data for Brain.js
    const normalized = normalizeData(data);
    const trainingData = normalized.map((item, i, arr) => {
      if (i === arr.length - 1) return null;
      return {
        input: [arr[i].price],
        output: [arr[i + 1].price],
      };
    }).filter(Boolean);

    const net = new NeuralNetwork({ hiddenLayers: [5, 3] });
    net.train(trainingData, { log: false });

    // Predict next price
    const last = normalized[normalized.length - 1];
    const output = net.run([last.price]);
    const denormalized = denormalizePrice(output[0], data);
    setPrediction(denormalized);
    if (onPrediction) onPrediction(denormalized);
  }, [data, onPrediction]);

  function normalizeData(data) {
    // Normalize prices to 0-1
    const min = Math.min(...data.map(d => d.price));
    const max = Math.max(...data.map(d => d.price));
    return data.map(d => ({ ...d, price: (d.price - min) / (max - min) }));
  }
  function denormalizePrice(norm, data) {
    const min = Math.min(...data.map(d => d.price));
    const max = Math.max(...data.map(d => d.price));
    return Math.round(norm * (max - min) + min);
  }

  return (
    <div className="mb-3">
      <h5>Predicted Next Price: {prediction !== null ? `$${prediction}` : 'N/A'}</h5>
    </div>
  );
}

StockPredictor.propTypes = {
  data: PropTypes.array.isRequired,
  onPrediction: PropTypes.func,
};

export default StockPredictor; 