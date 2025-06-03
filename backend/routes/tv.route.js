import express from "express";
import {
  getTrendingTV,
  getTvTrailers,
  getTvDetails,
  getSimilarTvs,
  getTvByCategory,
} from "../controllers/tv.controller.js";
const router = express.Router();
router.get("/trending", getTrendingTV);
router.get("/:id/trailers", getTvTrailers);
router.get("/:id/details", getTvDetails);
router.get("/:id/similar", getSimilarTvs);
router.get("/:category", getTvByCategory); // for tv category in the end point we use  http://localhost:5000/api/v1/tv/on_the_air

export default router;
