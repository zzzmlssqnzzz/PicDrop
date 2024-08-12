import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

const LanguageSwitch = styled(Switch)(({ theme }) => ({
    width: 60,
    height: 32,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#4B56D0',
      width: 30,
      height: 30,
      '&::before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));

export default function CustomizedSwitches() {
  const {i18n} = useTranslation();
  const toggleLanguage = () => {
      console.log("Toggle")
      const newLanguage = i18n.language === 'en' ? 'fr' : 'en';
      console.log(newLanguage)
      i18n.changeLanguage(newLanguage);
    };

  return (
    <FormGroup>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>Fr</Typography>
        <LanguageSwitch onChange={toggleLanguage} defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
        <Typography>En</Typography>
      </Stack>
    </FormGroup>
  );
}