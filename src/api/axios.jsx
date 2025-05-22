// src/api/axios.jsx
import axios from "axios";

export const getGalleries = (page = 1, size = 16) =>
  axios.get("http://127.0.0.1:8000/api/galleries", {
    params: { page, size },
    headers: { "Content-Type": "application/json" }
  });

export const createGallery = (data) =>
  axios.post("http://211.188.51.83:8080/api/galleries", data
  );

export const getGallery = (galleryId) =>
  axios.get(`http://127.0.0.1:8080/api/galleries/${galleryId}`);

export const updateGallery = (galleryId, data) =>
  axios.put(`http://127.0.0.1:8080/api/galleries/${galleryId}`, data, {
    headers: { "Content-Type": "application/json" }
  });

export const deleteGallery = (galleryId) =>
  axios.delete(`http://127.0.0.1:8000/api/galleries/${galleryId}`);