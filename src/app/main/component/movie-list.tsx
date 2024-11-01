'use client'

import { useEffect, useState } from 'react';
import { Movie } from '../interface/movie.interface';
import MovieItem from './movie-item';
import Link from 'next/link';
import { MovieApiService } from '../service/movie-api.service';

export default function MovieList () {
    const [manageMode, setManageMode] = useState('close');
    const [movies, setMovies] = useState<Movie[]>([]);

    const movieApiService = new MovieApiService();

    let isLoading = false;

    function clickManage() {
        if (manageMode === 'close') {
            setManageMode('open');
        } else {
            setManageMode('close');
        }
    }

    function onClickDelete(movieId: number) {
        if (confirm('Confirm delete ?')) {
            movieApiService.deleteMovie(movieId).then(() => {
                console.log('success');
                loadMovie();
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    //@ts-expect-error error list any type 
    let movieList = [];
    if (movies) {
        movieList = movies.map((movie) =>
            <MovieItem 
                key={movie.id} 
                movie={movie} 
                manageMode={manageMode} 
                onClickDelete={onClickDelete}
            ></MovieItem>
        )
    }

    function loadMovie() {
        isLoading = true;
        movieApiService.getAllMovie().then((movies) => {
            console.log(movies);

            setMovies(movies);
            isLoading = false;
        });
    }

    useEffect(() => {
        if (movies.length === 0 && !isLoading) {
            loadMovie();
        }
    });

    return (
        <>
            <div className='max-w-xl m-auto'>
                <div className='flex justify-between'>
                    <p className='font-bold'>Movie List</p>
                    <div>
                        <Link href="/movie" className='inline-block bg-blue-600 text-white px-5 py-1 rounded active:bg-blue-300 mr-4'>Add</Link>
                        <button className='bg-black text-white px-5 py-1 rounded active:bg-gray-500 w-24' 
                                onClick={clickManage}>
                            { manageMode === 'close' ? 'Manage' : 'Cancel' }
                        </button>
                    </div>
                </div>
                <div className='mt-5'>
                    { movieList }
                </div>
            </div>
        </>
    );
}