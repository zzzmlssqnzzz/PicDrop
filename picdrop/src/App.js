import React, { useState, useRef } from 'react';
import './App.css';
import picdrop_icon from './icons/picdrop_icon.png'
import { Tooltip } from 'react-tooltip'
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close'; 
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import ReplayTwoToneIcon from '@mui/icons-material/ReplayTwoTone';

function App() {
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(true);
  const fileInputRef = useRef(null); 

  const handleDrop = (event) => {
    event.preventDefault();
     let files = event.type === 'drop' ? event.dataTransfer.files : event.target.files;

    if (files.length > 1) {
      setError('Please upload only one file at a time.');
      setImage(null);
      return;
    }

    const file = files[0];
    const converted_size = formatFileSize(file.size);

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

  const handleBrowse = () => {
    fileInputRef.current.click(); 
  }

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
        <input
        type="file"
        style={{ display: 'none' }} 
        ref={fileInputRef} 
        onChange={handleDrop} 
        accept="image/*"
        />
        {image ? (
          <div className="image-preview">
            <img src={URL.createObjectURL(image)} alt="Preview" className="upload"/>
            <div>
              <div className='info-icon'>
                 <InfoTwoToneIcon 
                 fontSize='medium'
                 sx={{ stroke: "#4B56D0", strokeWidth: 1 }}
              className="info-details"/>
              </div>
              <Tooltip anchorSelect='.info-details'place='top' className='tooltip'>
                 <div className="image-details">
                <p><strong>Information</strong></p>
                <p>Name: {image.name}</p>
                <p>Format: {image.type.split("/")[1].toUpperCase()}</p>
                <p>Size: {formatFileSize(image.size)} MB</p>
              </div>
              </Tooltip>
            </div>
            <div className="reset-button"> 
              <ReplayTwoToneIcon
            data-tooltip-id="reset-tooltip" 
            data-tooltip-content="Reset" 
            data-tooltip-place="top" 
            sx={{ stroke: "#4B56D0", strokeWidth: 1 }}
            onClick={handleReset}/>
            </div>
             <Tooltip id="reset-tooltip"/>
          </div>
         
        ) : (
          <div className='upload-placeholder'>
            <img src={picdrop_icon} alt="PicDrop Icon" className="picdrop-icon"/>
            <p><span>Drag and drop an image here or </span><span onClick={handleBrowse} className="browse-link"><strong>Browse</strong></span></p>
            <p>Supports JPG, PNG, GIF, WEBP, TIFF or BMP</p>
          </div> 
        )}
      </div>
    </div>
  );
}

export default App;
