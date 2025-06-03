import { fetchFromTMDB } from "../services/tmdb.service.js";

export const getTrendingTV = async (req, res) => {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
    );
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results.length)];
    res.status(200).json({ success: true, content: randomMovie });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTvTrailers = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );
    const trailers = data.results.filter((video) => video.type === "Trailer");
    res.status(200).json({ success: true, content: trailers });
    console.log(trailers);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "internal server error", error });
    console.log(error.message);
  }
};

export const getTvDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
    );
    res.status(200).json({ success: true, content: data });
    console.log(data);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getSimilarTvs = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US`
    );
    res.status(200).json({ success: true, similar: data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTvByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US-US&page-1`
    );

    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
