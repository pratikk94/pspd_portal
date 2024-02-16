import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, TextField, Button, Grid, Select, MenuItem, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

function App() {
  const [applications, setApplications] = useState([]);
  const [types, setTypes] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
    link: '',
    type_id: ''
  });
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    fetchApplications();
    fetchTypes();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get('http://localhost:3000/applications');
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications: ', error);
    }
  };

  const fetchTypes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/types');
      setTypes(response.data);
    } catch (error) {
      console.error('Error fetching types: ', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('image', formData.image);
      formDataToSend.append('link', formData.link);
      formDataToSend.append('type_id', formData.type_id);

      await axios.post('http://localhost:3000/applications', formDataToSend);

      // Clear form fields after submission
      setFormData({
        name: '',
        description: '',
        image: null,
        link: '',
        type_id: ''
      });

      // Refresh applications list
      fetchApplications();
    } catch (error) {
      console.error('Error submitting application: ', error);
    }
  };

  const handleListItemClick = (application) => {
    setSelectedApplication(application);
  };

  const handleCloseModal = () => {
    setSelectedApplication(null);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Container maxWidth="md">
        <Typography variant="h3" align="center" gutterBottom>Applications</Typography>
        <List>
          {applications.map(application => (
            <ListItem key={application.id} button onClick={() => handleListItemClick(application)}>
              <ListItemAvatar>
                <Avatar alt={application.name} src={`data:image/png;base64,${application.image}`} />
              </ListItemAvatar>
              <ListItemText
                primary={application.name}
                secondary={application.description}
              />
            </ListItem>
          ))}
        </List>

        <Dialog open={Boolean(selectedApplication)} onClose={handleCloseModal}>
          <DialogTitle>{selectedApplication && selectedApplication.name}</DialogTitle>
          <DialogContent>
            <Typography variant="body1" gutterBottom>Description: {selectedApplication && selectedApplication.description}</Typography>
            <Typography variant="body1" gutterBottom>Image: <img src={`data:image/png;base64,${selectedApplication && selectedApplication.image}`} alt="Application" /></Typography>
            <Typography variant="body1" gutterBottom>Type: {selectedApplication && selectedApplication.type_name}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">Close</Button>
          </DialogActions>
        </Dialog>

        <Typography variant="h5" align="center" gutterBottom>Add New Application</Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleInputChange} required /><br /><br />
          <TextField fullWidth label="Description" name="description" value={formData.description} onChange={handleInputChange} required /><br /><br />
          <TextField fullWidth type="file"  name="image" onChange={handleFileChange} required /><br /><br />
          <TextField fullWidth label="Link" name="link" value={formData.link} onChange={handleInputChange} required /><br /><br />
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select name="type_id" value={formData.type_id} onChange={handleInputChange} required>
              <MenuItem value="">Select Type</MenuItem>
              {types.map(type => (
                <MenuItem key={type.type_id} value={type.type_id}>{type.type_name}</MenuItem>
              ))}
            </Select>
          </FormControl><br /><br />
          <Button type="submit" variant="contained" color="primary">Submit</Button>
        </form>
      </Container>
    </div>
  );
}

export default App;
