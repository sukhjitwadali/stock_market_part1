import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import DataInput from './components/DataInput';
import StockPredictor from './components/StockPredictor';
import StockChart from './components/StockChart';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [stockData, setStockData] = useState([]);
  const [prediction, setPrediction] = useState(null);

  return (
    <Container className="py-4">
      <h2 className="mb-4">Stock Market Predictor (Brain.js)</h2>
      <DataInput onDataLoaded={setStockData} />
      {stockData.length > 0 && (
        <>
          <StockPredictor data={stockData} onPrediction={setPrediction} />
          <StockChart data={stockData} prediction={prediction} />
        </>
      )}
      <footer className="mt-5 text-center text-muted small">
        &copy; {new Date().getFullYear()} Stock Predictor Demo
      </footer>
    </Container>
  );
}

export default App;
