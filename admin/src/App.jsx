import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Pagination,
  Button,
  Modal,
  Box,
  TextField,
  MenuItem,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ApplicationsList = () => {
  const [applications, setApplications] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [types, setTypes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [newApplication, setNewApplication] = useState({
    name: "",
    desc: "",
    link: "",
    image: "",
    type_id: "",
  });
  const fetchApplications = async (currentPage) => {
    try {
      // Update the API URL to your endpoint
      const response = await axios.get(
        `http://localhost:3000/applications?page=${currentPage}&limit=9`
      );
      console.log(
        `http://localhost:3000/applications?page=${currentPage}&limit=9`
      );
      setApplications(response.data.applications);
      console.log(response.data.applications);
      // Calculate total pages based on the totalCount returned by your API
      const totalCount = response.data.totalCount;
      setTotalPages(Math.ceil(totalCount / 9));
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    }
  };

  useEffect(() => {
    fetchApplications(page);
    const fetchTypes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/types");
        setTypes(response.data);
      } catch (error) {
        console.error("Failed to fetch types:", error);
      }
    };

    fetchTypes();
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewApplication({ ...newApplication, [name]: value });
  };

  const handleSubmitNewApplication = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newApplication.name);
    formData.append("description", newApplication.desc);
    formData.append("link", newApplication.link);
    formData.append("type_id", newApplication.type_id);
    formData.append("image", newApplication.image); // Assuming 'image' is the file

    try {
      // Adjust the URL to your upload endpoint
      const response = await axios.post(
        "http://localhost:3000/applications",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle the response, e.g., by updating the UI or notifying the user
      handleCloseModal();
      // Optionally, fetch the updated list of applications
    } catch (error) {
      console.error("Failed to upload file:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Applications
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleOpenModal}
      >
        Add Application
      </Button>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={modalStyle}
          component="form"
          onSubmit={handleSubmitNewApplication}
        >
          <Typography variant="h6" marginBottom={2}>
            Add New Application
          </Typography>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={newApplication.name}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            name="desc"
            value={newApplication.desc}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            type="file"
            onChange={(e) =>
              setNewApplication({ ...newApplication, image: e.target.files[0] })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Link"
            name="link"
            value={newApplication.link}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Type"
            select
            name="type_id"
            value={newApplication.type_id}
            onChange={handleInputChange}
            margin="normal"
          >
            {types.map((type) => (
              <MenuItem key={type.type_id} value={type.type_id}>
                {type.type_name}
              </MenuItem>
            ))}
          </TextField>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Modal>

      <Grid container spacing={2}>
        {applications.map((application) => (
          <Grid item xs={12} sm={6} md={4} key={application.id}>
            <Card style={{ height: 200 }}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {application.name}
                </Typography>
                <Typography color="textSecondary">
                  {application.description}
                </Typography>
                {/* Display more details as needed */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: "20px", justifyContent: "center", display: "flex" }}
      />
    </Container>
  );
};

export default ApplicationsList;
