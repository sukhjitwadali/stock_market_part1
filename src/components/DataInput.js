import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import sampleData from '../data/sampleStockData.json';

function DataInput({ onDataLoaded }) {
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      let data;
      try {
        if (file.name.endsWith('.json')) {
          data = JSON.parse(event.target.result);
        } else if (file.name.endsWith('.csv')) {
          data = csvToJson(event.target.result);
        }
        onDataLoaded(data);
      } catch (err) {
        alert('Invalid file format.');
      }
    };
    reader.readAsText(file);
  };

  const handleSampleLoad = () => {
    onDataLoaded(sampleData);
  };

  function csvToJson(csv) {
    const lines = csv.trim().split('\n');
    const headers = lines[0].split(',');
    return lines.slice(1).map(line => {
      const values = line.split(',');
      return headers.reduce((obj, header, i) => {
        obj[header.trim()] = isNaN(values[i]) ? values[i].trim() : Number(values[i]);
        return obj;
      }, {});
    });
  }

  return (
    <div className="mb-3">
      <Button variant="primary" onClick={handleSampleLoad} className="me-2">Load Sample Data</Button>
      <input
        type="file"
        accept=".json,.csv"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'inline-block', width: 'auto' }}
      />
    </div>
  );
}

DataInput.propTypes = {
  onDataLoaded: PropTypes.func.isRequired,
};

export default DataInput; 