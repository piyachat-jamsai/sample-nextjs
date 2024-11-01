import { MovieApiService } from '../../main/service/movie-api.service';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { describe } from 'node:test';
import { beforeEach, expect, it, Mock, vi } from 'vitest';
import MoviePage from '../page';

// Mock the MovieApiService and the useRouter hook
vi.mock('../main/service/movie-api.service');
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('MoviePage', () => {
  let mockRouter: Mock;
  let mockCreateMovie: Mock;
  let mockUpdateMovie: Mock;
  let mockGetMovie: Mock;

  beforeEach(() => {
    //@ts-expect-error replace attrivute
    mockRouter = { replace: vi.fn() };
    mockCreateMovie = vi.fn().mockResolvedValue({});
    mockUpdateMovie = vi.fn().mockResolvedValue({});
    mockGetMovie = vi.fn().mockResolvedValue({
      id: 1,
      title: 'Existing Movie',
      description: 'A description',
      coverUrl: 'https://validurl.com/image.jpg',
    });

    //@ts-expect-error use unknow
    (useRouter as unknown).mockReturnValue(mockRouter);
    (MovieApiService.prototype.createMovie as unknown) = mockCreateMovie;
    (MovieApiService.prototype.updateMovie as unknown) = mockUpdateMovie;
    (MovieApiService.prototype.getMovie as unknown) = mockGetMovie;
  });

  it('renders the form to add a new movie', () => {
    render(<MoviePage />);

    expect(screen.getByText('Form add new movie')).toBeTruthy();
  });

  it('displays validation messages for invalid form fields', async () => {
    render(<MoviePage />);

    fireEvent.change(screen.getByLabelText('Movie title'), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText('Movie description'), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText('Movie cover url'), { target: { value: 'invalid-url' } });

    fireEvent.click(screen.getAllByText('Save')[0]);

    expect(await screen.findAllByText('Please input')).toBeTruthy();
    expect(await screen.findByText('Please input url image')).toBeTruthy();
  });

  it('creates a new movie on valid form submission', async () => {
    render(<MoviePage />);

    fireEvent.change(screen.getByLabelText('Movie title'), { target: { value: 'New Movie' } });
    fireEvent.change(screen.getByLabelText('Movie description'), { target: { value: 'Description of movie' } });
    fireEvent.change(screen.getByLabelText('Movie cover url'), { target: { value: 'https://validurl.com/image.jpg' } });

    fireEvent.click(screen.getAllByText('Save')[0]);

    await waitFor(() => {
      expect(mockCreateMovie).toHaveBeenCalledWith({
        title: 'New Movie',
        description: 'Description of movie',
        coverUrl: 'https://validurl.com/image.jpg',
      });
      //@ts-expect-error replace attribute
      expect(mockRouter.replace).toHaveBeenCalledWith('/main');
    });
  });
});
