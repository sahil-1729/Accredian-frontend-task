import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const BasicSelect = ({fieldName,item1,item2,item3}) => {
    const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, maxWidth : "100%"}}>
      <FormControl required variant='outlined' fullWidth>
        <InputLabel id="demo-simple-select-label">{fieldName}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label={fieldName}
          onChange={handleChange}
        >
          <MenuItem value={10}>{item1}</MenuItem>
          <MenuItem value={20}>{item2}</MenuItem>
          <MenuItem value={30}>{item3}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
export default BasicSelect