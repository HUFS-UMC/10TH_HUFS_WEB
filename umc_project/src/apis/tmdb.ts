import axios from "axios";

const tmdbClient = axios.create({
    baseURL:"https://api.themoviedb.org/3",
    headers: {
        Authorization : `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
    },
});
export default tmdbClient;