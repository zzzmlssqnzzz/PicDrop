import React, { useState } from 'react';
import './App.css';
import picdrop_icon from './icons/picdrop_icon.png'
import info_details from './icons/info-details_icon.png'
import reset_icon from './icons/reset_icon.png'
import { Tooltip } from 'react-tooltip'

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
    return (size / (1024 * 1024)).toFixed(2);
  };

  return (
    <div className="App">
      <h1>Welcome to <span className='picDrop'>PicDrop</span></h1>
      <div 
        className="drop-area" 
        onDrop={handleDrop} 
        onDragOver={handleDragOver}
      >
        {image ? (
          <div className="image-preview">
            <img src={URL.createObjectURL(image)} alt="Preview" className="upload"/>
            <div>
              <img 
              src={info_details} 
              alt="info-details" 
              className="info-details"/>
              <Tooltip anchorSelect='.info-details'place='top' className='tooltip'>
                 <div className="image-details">
                <p><strong>Name:</strong> {image.name}</p>
                <p><strong>Format:</strong> {image.type}</p>
                <p><strong>Size:</strong> {formatFileSize(image.size)} MB</p>
              </div>
              </Tooltip>
            </div>
            <img src={reset_icon} alt="Reset" className="reset-button" onClick={handleReset}/>
          </div>
        ) : (
          <div className='upload-placeholder'>
            <img src={picdrop_icon} alt="PicDrop Icon" className="picdrop-icon"/>
            <p>Drag and drop an image here.</p>
          </div> 
        )}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default App;
