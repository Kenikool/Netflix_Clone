import { fetchFromTMDB } from "../services/tmdb.service.js";

export const getTrendingMovie = async (req, res) => {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results.length)];
    res.status(200).json({ success: true, content: randomMovie });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMovieTrailers = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    );
    const trailers = data.results.filter((video) => video.type === "Trailer");
    res.status(200).json({ success: true, content: trailers });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "internal server error", error });
    console.log(error.message);
  }
};

export const getMovieDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    );
    res.status(200).json({ success: true, content: data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getSimilarMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US`
    );
    res.status(200).json({ success: true, similar: data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMovieByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US-US&page-1`
    );

    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
