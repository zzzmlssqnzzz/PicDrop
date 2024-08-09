import React, { useState } from 'react';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setError('');
    } else {
      setError('Unsupported file format. Please upload an image.');
      setImage(null);
    }
  };

  const handleReset = () => {
    setImage(null);
    setError('');
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const formatFileSize = (size) => {
    return (size / (1024 * 1024)).toFixed(2); // Convert size to MB and round to 2 decimal places
  };

  return (
    <div className="App">
      <h1>Welcome to PicDrop</h1>
      <div 
        className="drop-area" 
        onDrop={handleDrop} 
        onDragOver={handleDragOver}
      >
        {image ? (
          <div className="image-preview">
            <img src={URL.createObjectURL(image)} alt="Preview" />
            <div className="image-details">
              <p><strong>Name:</strong> {image.name}</p>
              <p><strong>Format:</strong> {image.type}</p>
              <p><strong>Size:</strong> {formatFileSize(image.size)} MB</p>
            </div>
            <button onClick={handleReset}>Reset</button>
          </div>
        ) : (
          <p>Drag and drop an image here, or click to upload.</p>
        )}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default App;
