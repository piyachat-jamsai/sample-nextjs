import { CreateMovieObject } from '@/app/movie/interface/create-movie.interface';
import axios from 'axios';
import { Movie } from '../interface/movie.interface';

const baseApiUrl = 'http://localhost:3000';

export class MovieApiService {
    createMovie(movie: CreateMovieObject): Promise<unknown> {
        const url = baseApiUrl + '/movie';

        return axios({
            url: url,
            method: 'post',
            data: movie,
        });
    }

    getAllMovie(): Promise<Movie[]> {
        return new Promise((resolve) => {
            const url = baseApiUrl + '/movie';

            axios({
                url: url,
                method: 'get',
            }).then((resp) => {
                resolve(resp.data);
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    getMovie(movieId: number|string): Promise<Movie> {
        return new Promise((resolve) => {
            const url = baseApiUrl + '/movie/' + movieId;

            axios({
                url: url,
                method: 'get',
            }).then((resp) => {
                resolve(resp.data);
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    deleteMovie(movieId: number): Promise<unknown> {
        const url = baseApiUrl + '/movie/' + movieId;

        return axios({
            url: url,
            method: 'delete',
        });
    }

    updateMovie(movie: Movie): Promise<unknown> {
        const url = baseApiUrl + '/movie/' + movie.id;

        return axios({
            url: url,
            method: 'put',
            data: movie,
        });
    }
}