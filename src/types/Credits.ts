export interface Cast {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
}

export interface Crew {
    id: number;
    name: string;
    job: string;
}

export interface Credits {
    cast: Cast[];
    crew: Crew[];
}