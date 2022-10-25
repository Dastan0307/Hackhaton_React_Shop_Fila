import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useProducts } from '../../contexts/ProductContextProvider';

export default function ControlledRadioButtonsGroup() {
  const { fetchByParams } = useProducts();


  return (
    <FormControl>
      <RadioGroup
        sx={{width: 1500, display: 'flex', justifyContent: 'end'}}
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        defaultValue='all'
        onChange={(e) => fetchByParams("type", e.target.value) }
      >
        <FormControlLabel value="all" control={<Radio />} label="All"  />
        <FormControlLabel value="sneaker" control={<Radio />} label="Sneakers" />
        <FormControlLabel value="shirt" control={<Radio />} label="T-Shirt" />
        <FormControlLabel value="pant" control={<Radio />} label="Pants" />
      </RadioGroup>
    </FormControl>
  );
}