'use client'

import { useEffect, useState } from 'react'
import { CreateMovieObject } from './interface/create-movie.interface';
import { MovieApiService } from '../main/service/movie-api.service';
import { useRouter } from 'next/navigation';
import { Movie } from '../main/interface/movie.interface';

const formId = {
  title: 'title',
  description: 'description',
  coverUrl: 'coverUrl',
}
const testImageUrl = 'https://cdn.moviefone.com/admin-uploads/posters/insideout2-movie-poster_1709834077.jpg?d=360x540&q=80';

export default function MoviePage() {
  const router = useRouter();
  let isLoading = false;
  const movieApi = new MovieApiService();

  const [editMovie, setEditMovie] = useState();
  const [isInit, setIsInit] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverUrl, setCoverUrl] = useState(testImageUrl);

  const [isTitleValid, setIsTitleValid] = useState(false);
  const [errorMsgTitle, setErrorMsgTitle] = useState(<></>);

  const [isDescriptionValid, setIsDescriptionValid] = useState(false);
  const [errorMsgDescription, setErrorMsgDescription] = useState(<></>);

  const [isCoverUrlValid, setIsCoverUrlValid] = useState(false);
  const [errorMsgCoverUrl, setErrorMsgCoverUrl] = useState(<></>);

  function handleInputChange(e: { target: { id: string, value: string }}) {
    const value = e.target.value;

    switch (e.target.id) {
      case formId.title:
        setTitle(value);
        break;
      case formId.description:
        setDescription(value);
        break;
      case formId.coverUrl:
        setCoverUrl(value);
        break;
    }
  }

  function createNewMovie() {
    const formValue: CreateMovieObject = {
      title: title,
      description: description,
      coverUrl: coverUrl,
    };

    movieApi.createMovie(formValue).then(() => {
      console.log('success');
      // redirect
      router.replace('/main');
      isLoading = false;
    }).catch((err) => {
      console.log('err', err);
      isLoading = false;
    })
  }

  function updateMovie() {
    const updateValue: Movie = {
      //@ts-expect-error value can be null
      id: editMovie.id,
      title: title,
      description: description,
      coverUrl: coverUrl,
    };

    movieApi.updateMovie(updateValue).then(() => {
      console.log('success');
      // redirect
      router.replace('/main');
      isLoading = false;
    }).catch((err) => {
      console.log('err', err);
      isLoading = false;
    });
  }

  function onSubmit(e: unknown) {
    //@ts-expect-error unknown
    e.preventDefault();

    if (isLoading) {
      return;
    }

    if (validateForm()) {
      isLoading = true;

      if (isEditMode) {
        updateMovie();
      } else {
        createNewMovie();
      }
    }

    return false;
  }

  function validateForm(): boolean {
    let isFormValid = true;

    if (title === '' || title.length === 0) {
      setIsTitleValid(false);
      setErrorMsgTitle(<div className='text-red-500'>Please input</div>);
      isFormValid = false;
    } else {
      setIsTitleValid(true);
      setErrorMsgTitle(<></>);
    }

    if (description === '' || description.length === 0) {
      setIsDescriptionValid(false);
      setErrorMsgDescription(<div className='text-red-500'>Please input</div>);
      isFormValid = false;
    } else {
      setIsDescriptionValid(true);
      setErrorMsgDescription(<></>);
    }

    if (!coverUrl.match(/^https:\/\/[a-z]+.*/)) {
      setIsCoverUrlValid(false);
      setErrorMsgCoverUrl(<div className='text-red-500'>Please input url image</div>);
      isFormValid = false;
    } else {
      setIsCoverUrlValid(true);
      setErrorMsgCoverUrl(<></>);
    }

    return isFormValid;
  }

  function init() {
    setIsInit(true);

    const url = new URL(window.location.href);
    const queryParams = new URLSearchParams(url.search);
    const movieId = queryParams.get('id');

    if (movieId == null) {
      return;
    }

    movieApi.getMovie(movieId).then((movie: Movie) => {
      console.log(movie);
      //@ts-expect-error type not match
      setEditMovie(movie);

      setIsEditMode(true);
      setTitle(movie.title);
      setDescription(movie.description);
      setCoverUrl(movie.coverUrl);
    });
  }

  useEffect(() => {
    console.log('init');
    if (!isInit) {
      init();
    }
  }, []);

  return (
    <div className='container m-auto'>
      <div className='font-bold text-xl mt-6'>
        {isEditMode ? 'Form edit movie' : 'Form add new movie'}
      </div>
      <div>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor={formId.title}>Movie title</label>
            <div>
              <input id={formId.title} type="text" value={title} className='border px-4 py-1' onChange={handleInputChange} />
            </div>
            {isTitleValid ? '' : errorMsgTitle}
          </div>
          <div className='mt-2'>
            <label htmlFor={formId.description}>Movie description</label>
            <div>
              <input id={formId.description} type="text" value={description} className='border px-4 py-1' onChange={handleInputChange} />
            </div>
            {isDescriptionValid ? '' : errorMsgDescription}
          </div>
          <div className='mt-2'>
            <label htmlFor={formId.coverUrl}>Movie cover url</label>
            <div>
              <input id={formId.coverUrl} type="text" value={coverUrl} className='border px-4 py-1' onChange={handleInputChange} />
            </div>
            {isCoverUrlValid ? '' : errorMsgCoverUrl}
          </div>

          <div className='mt-5'>
            <button type='submit' className='bg-blue-700 text-white py-1 px-5 rounded'>Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}
