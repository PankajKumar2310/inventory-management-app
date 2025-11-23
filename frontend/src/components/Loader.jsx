import React from 'react';
import './../styles/loader.scss';

export default function Loader() {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>Loading products...</p>
    </div>
  );
}