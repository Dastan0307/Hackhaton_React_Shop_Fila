import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContextProvider';

//Материалы mui
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const RigistrationPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { register } = useAuth();

    function handleRegister() {
        register(username, password);
    };

    // mui
    const [values, setValues] = React.useState({
      password: '',
      showPassword: false
    });
  
    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  
    const handleClickShowPassword = () => {
      setValues({
        ...values,
        showPassword: !values.showPassword,
      });
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

  return (
    <div className='user'>
    <Box className='userIn'
        component="form"
        // Сдесь можно добавить стили
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <Typography gutterBottom variant="h5" component="div" className='loginName'>Register Form</Typography>
          <TextField id="username" label="Username" variant="outlined" onChange={e => setUsername(e.target.value)} />
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" onChange={e => setPassword(e.target.value)}>
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Button variant="contained" disableElevation onClick={handleRegister}>Register</Button>
      </Box>
  </div>
  )
}

export default RigistrationPage;