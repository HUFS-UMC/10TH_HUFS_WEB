/// <reference types="vite/client" />

interface ImportMetaEnv {
    //readonly 절대 변경 될 수 없는
    readonly VITE_TMDB_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}