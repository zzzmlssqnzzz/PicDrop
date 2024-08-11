import React, { useState } from 'react';
import './App.css';
import picdrop_icon from './icons/picdrop_icon.png'
import info_details from './icons/info-details_icon.png'
import reset_icon from './icons/reset_icon.png'
import { Tooltip } from 'react-tooltip'
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close'

function App() {
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(true);

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    const converted_size = formatFileSize(file.size)
    console.log(converted_size)
    if (converted_size > 25){
      setError('Files larger than 25 MB are currently not supported. Please compress your file.');
      setImage(null);
    }
    else if(file && file.type.startsWith('image/')) {
      setImage(file);
      console.log(file.size)
      setError('');
    } 
    else {
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
       <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        {error? <Alert severity='warning'
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
            <CloseIcon fontSize="inherit" />
            </IconButton>
          }>
          {error}
        </Alert> : <></>}
      </Collapse>
      </Box>
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
                <p><strong>Information</strong></p>
                <p>Name: {image.name}</p>
                <p>Format: {image.type.split("/")[1].toUpperCase()}</p>
                <p>Size: {formatFileSize(image.size)} MB</p>
              </div>
              </Tooltip>
            </div>
            <img src={reset_icon} alt="Reset" 
            className="reset-button" 
            data-tooltip-id="reset-tooltip" 
            data-tooltip-content="Reset" 
            data-tooltip-place="top" 
            onClick={handleReset}/>
             <Tooltip id="reset-tooltip"/>
          </div>
         
        ) : (
          <div className='upload-placeholder'>
            <img src={picdrop_icon} alt="PicDrop Icon" className="picdrop-icon"/>
            <p><span>Drag and drop an image here or </span><span>browse</span></p>
            <p>Supports JPG, PNG, GIF, WEBP, TIFF or BMP</p>
          </div> 
        )}
      </div>
    </div>
  );
}

export default App;
