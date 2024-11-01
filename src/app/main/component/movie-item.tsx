'use client'

import React from 'react';
import { MovieProp } from '../interface/movie.interface';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const MovieItem: React.FC<MovieProp> = ({ movie, manageMode, onClickDelete }) => {
    const router = useRouter();

    const clickDelete = () => {
        onClickDelete(movie.id);
    }

    function clickEdit() {
        router.push('/movie?id=' + movie.id);
    }

    const editBlock = 
        <div className='flex flex-col'>
            <button className='block bg-green-500 py-1 px-4 rounded text-white mb-2' onClick={clickEdit}>Edit</button>
            <button className='block bg-red-600 py-1 px-4 rounded text-white' onClick={clickDelete}>Delete</button>
        </div>;

    return (
        <div className='border-b px-4 py-2'>
            <div className='flex justify-between'>
                <div>
                    <Image src={movie.coverUrl} alt="movie cover" width={80} height={120} />
                    <p className='font-bold'>{ movie.title }</p>
                    <p>{movie.description}</p>
                </div>
                {manageMode === 'open' ? editBlock : <></>}
            </div>
        </div>
    );
}

export default MovieItem;
