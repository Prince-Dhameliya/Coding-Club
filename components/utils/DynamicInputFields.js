import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  IconButton,
  Paper,
} from '@mui/material';
import { AddCircleOutline, DeleteOutline } from '@mui/icons-material';

const DynamicInputFields = ({ onFormDataChange }) => {
  const [inputFields, setInputFields] = useState([{member_name: '', member_contact: ''}]);

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ member_name: '', member_contact: ''});
    setInputFields(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    values[index].member_name = event.target.value;
    setInputFields(values);
    onFormDataChange(values);
  };

  const handleChange = (index, event) => {
    const values = [...inputFields];
    values[index].member_contact = event.target.value;
    setInputFields(values);
    onFormDataChange(values);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      {inputFields.map((inputField, index) => (
        <Paper key={index} elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
          <Grid container spacing={2} style={{display: "flex",alignItems: "center"}}>
            <Grid item xs={4}>
              <TextField
                label={`Member ${index + 1} Name`}
                variant="outlined"
                fullWidth
                value={inputField.member_name}
                onChange={(event) => handleInputChange(index, event)}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                label={`Member ${index + 1} Contact`}
                variant="outlined"
                fullWidth
                value={inputField.member_contact}
                onChange={(event) => handleChange(index, event)}
              />
            </Grid>
            
            <Grid item xs={3}>
              <IconButton onClick={() => handleRemoveFields(index)}>
                <DeleteOutline />
              </IconButton>
            </Grid>
          </Grid>
        </Paper>
      ))}
      <Button
        variant="outlined"
        startIcon={<AddCircleOutline />}
        onClick={handleAddFields}
      >
        Add Field
      </Button>
    </form>
  );
};

export default DynamicInputFields;
