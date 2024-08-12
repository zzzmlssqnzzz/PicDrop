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
import LanguageSwitch from './components/LanguageSwitch';
import MaterialUiSwitch from './components/MaterialUiSwitch'
import { useTranslation } from 'react-i18next';


function App() {
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(true);
  const {t} = useTranslation();
  const fileInputRef = useRef(null); 

  console.log(navigator.language)

  const formatFileSize = (size) => {
    return (size / (1024 * 1024)).toFixed(2);
  };

  const handleDrop = (event) => {
    event.preventDefault();
     let files = event.type === 'drop' ? event.dataTransfer.files : event.target.files;

    const file = files[0];
    const converted_size = formatFileSize(file.size);
    console.log(file.type)

    if (files.length > 1) {
      setError(t('warnings.two_uploads_warning'));
      setImage(null);
      setOpen(true);
    }
    else if (file && !file.type.startsWith('image/')) {
      setError( t('warnings.type_warning'));
      setImage(null);
      setOpen(true);
    }
    else if (converted_size > 10){
      setError( t('warnings.size_warning'));
      setImage(null);
      setOpen(true);
    }
    else {
      setImage(file);
      setError('');
      setOpen(true);
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

  return (
    <div className="App">
      <div className="switch-container">
      <div className="lang-switch">
         <LanguageSwitch/>
      </div>
      <div className="theme-switch">
         <MaterialUiSwitch/>
         </div>
      </div>
      <h1>{ t("welcome")}
      <span className='picDrop'>
        { t("picdrop")}
        </span>
      </h1>
       <Box sx={{ width: '65%', margin:'auto'}}>
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
            <img src={URL.createObjectURL(image)} alt={image.name} className="upload"/>
            <div>
              <div className='info-icon'>
                 <InfoTwoToneIcon 
                 fontSize='large'
                 sx={{ stroke: "#4B56D0", strokeWidth: 1 }}
              className="info-details"/>
              </div>
              <Tooltip anchorSelect='.info-details'place='top' className='tooltip'>
                 <div className="image-details">
                <p><strong>{ t('image_data.information')}</strong></p>
                <p>{ t('image_data.name')}: {image.name}</p>
                <p>{ t('image_data.format')}: {image.type.split("/")[1].toUpperCase()}</p>
                <p>{ t('image_data.size')}: {formatFileSize(image.size)} MB</p>
              </div>
              </Tooltip>
            </div>
            <div className="reset-button"> 
              <ReplayTwoToneIcon
              fontSize='large'
            data-tooltip-id="reset-tooltip" 
            data-tooltip-content={t("reset")} 
            data-tooltip-place="top" 
            sx={{ stroke: "#4B56D0", strokeWidth: 1 }}
            onClick={handleReset}/>
            </div>
             <Tooltip id="reset-tooltip"/>
          </div>
         
        ) : (
          <div className='upload-placeholder'>
            <img src={picdrop_icon} alt="PicDrop Icon" className="picdrop-icon"/>
            <p><span>{ t("placeholder")} </span><span onClick={handleBrowse} className="browse-link"><strong>{ t("browse")}</strong></span></p>
            <p>{ t("valid_type")}</p>
          </div> 
        )}
      </div>
    </div>
  );
}

export default App;
