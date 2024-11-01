import { describe, afterEach, vi, it, expect } from 'vitest';
import { MovieApiService } from '../movie-api.service';
import { CreateMovieObject } from '@/app/movie/interface/create-movie.interface';
import axios from 'axios';
import { Movie } from '../../interface/movie.interface';

vi.mock('axios');

describe('MovieApiService', () => {
  const service = new MovieApiService();

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should create a new movie', async () => {
    const mockMovie: CreateMovieObject = {
      title: 'Test Movie',
      description: 'Director Name',
      coverUrl: 'https://abc.com',
    };
    const mockResponse = { data: 'Movie created' };

    //@ts-expect-error use unknown
    (axios as unknown).mockResolvedValueOnce(mockResponse);

    const response = await service.createMovie(mockMovie);

    expect(axios).toHaveBeenCalledWith({
      url: 'http://localhost:3000/movie',
      method: 'post',
      data: mockMovie,
    });
    expect(response).toBe(mockResponse);
  });

  it('should fetch all movies', async () => {
    const mockMovies: Movie[] = [
      {
        id: 1,
        title: 'Movie 1',
        description: 'Director 1',
        coverUrl: 'https://abc.com',
      },
      {
        id: 2,
        title: 'Movie 2',
        description: 'Director 2',
        coverUrl: 'https://abc.com',
      },
    ];

    //@ts-expect-error use unknown
    (axios as unknown).mockResolvedValueOnce({ data: mockMovies });

    const result = await service.getAllMovie();

    expect(axios).toHaveBeenCalledWith({
      url: 'http://localhost:3000/movie',
      method: 'get',
    });
    expect(result).toEqual(mockMovies);
  });

  it('should fetch a single movie by ID', async () => {
    const mockMovie: Movie = {
      id: 1,
      title: 'Movie 1',
      description: 'Director 1',
      coverUrl: 'https://abc.com',
    };

    //@ts-expect-error use unknown
    (axios as unknown).mockResolvedValueOnce({ data: mockMovie });

    const result = await service.getMovie(1);

    expect(axios).toHaveBeenCalledWith({
      url: 'http://localhost:3000/movie/1',
      method: 'get',
    });
    expect(result).toEqual(mockMovie);
  });

  it('should delete a movie by ID', async () => {
    const mockResponse = { data: 'Movie deleted' };

    //@ts-expect-error use unkonwn
    (axios as unknown).mockResolvedValueOnce(mockResponse);

    const result = await service.deleteMovie(1);

    expect(axios).toHaveBeenCalledWith({
      url: 'http://localhost:3000/movie/1',
      method: 'delete',
    });
    expect(result).toBe(mockResponse);
  });

  it('should update a movie', async () => {
    const mockMovie: Movie = {
      id: 1,
      title: 'Updated Movie',
      description: 'Updated Director',
      coverUrl: 'https://aabc.com',
    };
    const mockResponse = { data: 'Movie updated' };

    //@ts-expect-error use unknown
    (axios as unknown).mockResolvedValueOnce(mockResponse);

    const result = await service.updateMovie(mockMovie);

    expect(axios).toHaveBeenCalledWith({
      url: `http://localhost:3000/movie/${mockMovie.id}`,
      method: 'put',
      data: mockMovie,
    });
    expect(result).toBe(mockResponse);
  });
});
