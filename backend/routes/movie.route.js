import express from "express";
import {
  getTrendingMovie,
  getMovieTrailers,
  getMovieDetails,
  getSimilarMovie,
  getMovieByCategory,
} from "../controllers/movie.controller.js";
const router = express.Router();
router.get("/trending", getTrendingMovie);
router.get("/:category", getMovieByCategory);
router.get("/:id/trailers", getMovieTrailers);
router.get("/:id/details", getMovieDetails);
router.get("/:id/similar", getSimilarMovie);
export default router;
