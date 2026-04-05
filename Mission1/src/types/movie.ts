export interface MovieDetails {
    id: number;
    title: string;
    tagline: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    release_date: string;
    runtime: number;
    genres: { id: number; name: string }[];
  }
  
  export interface Cast {
    id: number;
    name: string;
    original_name: string;
    character: string;
    profile_path: string | null;
    known_for_department: string;
  }
  
  export interface Crew {
    id: number;
    name: string;
    job: string;
    department: string;
    profile_path: string | null;
  }
  
  export interface Credits {
    id: number;
    cast: Cast[];
    crew: Crew[];
  }
  
  export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
  }