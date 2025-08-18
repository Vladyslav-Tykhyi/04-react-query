import axios from "axios";
import type { Movie } from "../types/movie";

export interface TMDBMoviesResponse {
  page: number;
  total_pages: number;
  total_results: number;
  results: Movie[];
}

const API_KEy = import.meta.env.VITE_TMDB_TOKEN;

export const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEy}`,
  },
});
export async function searchMovies(
  query: string,
  page: number,
  signal?: AbortSignal
): Promise<TMDBMoviesResponse> {
  const res = await tmdb.get<TMDBMoviesResponse>("/search/movie", {
    params: { query, include_adult: false, language: "en-US", page },
    signal,
  });
  return res.data;
}
