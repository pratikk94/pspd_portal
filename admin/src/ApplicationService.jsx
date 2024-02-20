// src/api/ApplicationService.js
import axios from "axios";

const API_URL = "http://localhost:3000/applications";

export const fetchApplications = (page = 1, limit = 9, search = "") => {
  return axios
    .get(
      `${API_URL}?page=${page}&limit=${limit}&search=${encodeURIComponent(
        search
      )}`
    )
    .then((response) => response.data);
};

export const createApplication = (application) => {
  return axios.post(API_URL, application);
};

export const updateApplication = (id, application) => {
  return axios.put(`${API_URL}/${id}`, application);
};
