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
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [newApplication, setNewApplication] = useState({
    name: "",
    description: "",
    link: "",
    image: "",
    type_id: "",
  });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentApplication, setCurrentApplication] = useState(null);
  const fetchApplications = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/applications?page=${page}&limit=9&search=${searchTerm}`
      );
      setApplications(response.data || []);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    }
  };

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/types");
        setTypes(response.data);
      } catch (error) {
        console.error("Failed to fetch types:", error);
      }
    };

    const fetchNumberOfPages = async () => {
      try {
        const response = await axios.get("http://localhost:3000/count");

        console.log(response.data[0].count);
        setTotalPages(Math.ceil(response.data[0].count / 9));
      } catch (error) {
        console.error("Failed to fetch types:", error);
      }
    };

    fetchApplications();
    fetchNumberOfPages();
    fetchTypes();
  }, [page, searchTerm]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewApplication({ ...newApplication, [name]: value });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1); // Optionally reset to the first page on a new search
    // No need to call fetchApplications() here since the useEffect hook will trigger it
  };

  const handleSubmitNewApplication = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newApplication.name);
    formData.append("description", newApplication.description);
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

  const handleEditClick = (application) => {
    setCurrentApplication(application); // Set the current application
    console.log(application); // Debugging: Log to ensure correct application data is being set
    setEditModalOpen(true); // Then open the modal
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", currentApplication.name);
    formData.append("description", currentApplication.description);
    formData.append("link", currentApplication.link);
    formData.append("type_id", currentApplication.type_id);
    if (currentApplication.image) {
      formData.append("image", currentApplication.image);
    }

    try {
      await axios.put(
        `http://localhost:3000/applications/${currentApplication.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setEditModalOpen(false);
      // Re-fetch applications to reflect the updated data
      fetchApplications();
    } catch (error) {
      console.error("Failed to update application:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Applications
      </Typography>

      <Box
        component="form"
        onSubmit={handleSearchSubmit}
        noValidate
        sx={{ mb: 2 }}
      >
        <TextField
          fullWidth
          label="Search Applications"
          value={searchTerm}
          onChange={handleSearchChange}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Search
        </Button>
      </Box>
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
            name="description"
            value={newApplication.descrription}
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
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={application.id}
            onClick={() => handleEditClick(application)}
          >
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
      <Modal
        open={editModalOpen}
        BackdropProps={{
          style: {
            backgroundColor: "rgba(255, 255, 255, 0.2)", // Adjust the alpha value for transparency
          },
        }}
        onClose={() => setEditModalOpen(false)}
      >
        <Box
          sx={modalStyle}
          component="form"
          onSubmit={handleEditSubmit}
          noValidate
        >
          <Typography variant="h6">Edit Application</Typography>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={currentApplication?.name || ""}
            onChange={(e) =>
              setCurrentApplication({
                ...currentApplication,
                name: e.target.value,
              })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={currentApplication?.description || ""}
            onChange={(e) =>
              setCurrentApplication({
                ...currentApplication,
                description: e.target.value,
              })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            type="file"
            onChange={(e) =>
              setCurrentApplication({
                ...currentApplication,
                image: e.target.files[0],
              })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Link"
            name="link"
            value={currentApplication?.link || ""}
            onChange={(e) =>
              setCurrentApplication({
                ...currentApplication,
                link: e.target.value,
              })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            select
            label="Type"
            name="type_id"
            value={currentApplication?.type_id || ""}
            onChange={(e) =>
              setCurrentApplication({
                ...currentApplication,
                type_id: e.target.value,
              })
            }
            margin="normal"
          >
            {types.map((type) => (
              <MenuItem key={type.type_id} value={type.type_id}>
                {type.type_name}
              </MenuItem>
            ))}
          </TextField>
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Save Changes
          </Button>
        </Box>
      </Modal>

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
