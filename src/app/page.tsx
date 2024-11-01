'use client'

// import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <div className='container p-5'>
      <div className='text-center'>Hello World</div>
      <div>
        <Link href='/main' className='underline text-red-500'>Main page</Link>
      </div>
    </div>
  );
}
