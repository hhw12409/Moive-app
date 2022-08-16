import API_KEY from '../config/apiKey';
const BASE_URL = 'https://api.themoviedb.org/3';

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TV {
  name: string;
  original_name: string;
  origin_country: string[];
  vote_count: number;
  backdrop_path: string | null;
  vote_average: number;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  poster_path: string | null;
  first_air_date: string;
  popularity: number;
  media_type: string;
}

interface BaseResponse {
  page: number;
  total_results: number;
  total_pages: number;
}

export interface MoiveResponse extends BaseResponse {
  results: Movie[];
}

export const moviesApi = {
  getTrending: async () => {
    const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
    return await response.json();
  },
  getUpComing: async () => {
    const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`);
    return await response.json();
  },
  getNowPlaying: async () => {
    const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`);
    return await response.json();
  },
  search: async ({ queryKey }: any) => {
    const [_, query] = queryKey;
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`);
    return await response.json();
  },
  detail: async ({ queryKey }: any) => {
    const [_, id] = queryKey;
    const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,images`);
    return await response.json();
  },
};

export const tvApi = {
  getTrending: async () => {
    const response = await fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`);
    return await response.json();
  },
  getAiringToday: async () => {
    const respone = await fetch(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}`);
    return await respone.json();
  },
  getTopRated: async () => {
    const response = await fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`);
    return await response.json();
  },
  search: async ({ queryKey }: any) => {
    const [_, query] = queryKey;
    const response = await fetch(`${BASE_URL}/search/tv?api_key=${API_KEY}&language=en-US&query=${query}`);
    return await response.json();
  },
  detail: async ({ queryKey }: any) => {
    const [_, id] = queryKey;
    const response = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}&append_to_response=videos,images`);
    return await response.json();
  },
};
