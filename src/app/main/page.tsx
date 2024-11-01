'use client'

import Link from 'next/link';
import MovieList from './component/movie-list';

export default function Main() {
    const message = "Hello World";

    return (
        <div>
            <div>This is Main page <strong>{ message }</strong></div>
            <div>
                <Link href='/' className='underline text-red-500'>Home page</Link>
            </div>

            <MovieList/>
        </div>
    )
}