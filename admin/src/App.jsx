import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  return (
    <div>
      <h1>Applications</h1>
      <ul>
        {applications.map(application => (
          <li key={application.id}>
            <p>Name: {application.name}</p>
            <p>Description: {application.description}</p>
            <img src={`data:image/png;base64,${application.image}`} alt="Application" />
            <p>Link: {application.link}</p>
            <p>Type: {application.type_name}</p>
          </li>
        ))}
      </ul>
      <h2>Add New Application</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" required /><br />
        <input type="text" name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" required /><br />
        <input type="file" name="image" onChange={handleFileChange} required /><br />
        <input type="text" name="link" value={formData.link} onChange={handleInputChange} placeholder="Link" required /><br />
        <select name="type_id" value={formData.type_id} onChange={handleInputChange} required>
          <option value="">Select Type</option>
          {types.map(type => (
            <option key={type.type_id} value={type.type_id}>{type.type_name}</option>
          ))}
        </select><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
