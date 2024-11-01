export interface MovieProp {
    movie: Movie;
    manageMode: string;
    onClickDelete: (id:number) => void;
}

export interface Movie {
    id: number;
    title: string;
    description: string;
    coverUrl: string;
}