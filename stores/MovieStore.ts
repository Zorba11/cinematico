import { makeAutoObservable } from 'mobx';
import { CreateMovieInput, createMovieSchema } from '@/lib/validations/movie';

export type MovieStep =
  | 'idea'
  | 'actors'
  | 'script'
  | 'screenplay'
  | 'frames' // base scene image
  | 'music'
  | 'dialogues'
  | 'shots'
  | 'render'
  | null;

// Define an interface for a movie item
export interface Movie {
  id: number;
  moviePrompt: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export class MovieStore {
  isPowerOn: boolean = false;
  isZeroShotMode: boolean = false;
  currentMovieId: string | null = null;
  currentStep: MovieStep = null;

  // Instead of a public property, we use a private backing field
  private _movies: Movie[] = [];

  isLoading: boolean = false;

  constructor() {
    // autoBind ensures actions keep the correct "this" context
    makeAutoObservable(this, {}, { autoBind: true });
  }

  // Getter for movies – the UI components will use this to get an observable list
  get movies() {
    return this._movies;
  }

  // Setter for movies – any update to the list goes through here
  set movies(movies: Movie[]) {
    this._movies = movies;
  }

  setPowerOn() {
    this.isPowerOn = !this.isPowerOn;
  }

  toggleZeroShotMode() {
    this.isZeroShotMode = !this.isZeroShotMode;
  }

  async createMovie(movieData: Pick<CreateMovieInput, 'moviePrompt'>) {
    try {
      // Validate input data
      const validatedData = createMovieSchema.parse({
        ...movieData,
        promptCharacterCount: movieData.moviePrompt.length,
        promptCharacterCountLimit: 280,
        storyStructureStyle: 'default',
        animationStyle: 'default',
      });

      const response = await fetch('/api/create-movie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create movie');
      }

      const movie = await response.json();
      this.setPowerOn();
      this.currentMovieId = movie.id.toString();

      return movie;
    } catch (error) {
      console.error('Error creating movie:', error);
      throw error;
    }
  }

  async createShot() {
    try {
      // For now, just create a movie with a default prompt
      await this.createMovie({ moviePrompt: 'Create a one-shot movie' });
    } catch (error) {
      console.error('Error creating shot:', error);
      throw error;
    }
  }

  // New methods for each step
  handleIdeaClick() {
    this.currentStep = 'idea';
    // Implementation coming soon
  }

  handleActorsClick() {
    this.currentStep = 'actors';
    // Implementation coming soon
  }

  handleScriptClick() {
    this.currentStep = 'script';
    // Implementation coming soon
  }

  handleScreenplayClick() {
    this.currentStep = 'screenplay';
    // Implementation coming soon
  }

  handleShotsClick() {
    this.currentStep = 'shots';
    // Implementation coming soon
  }

  handleFramesClick() {
    this.currentStep = 'frames';
  }

  handleMusicClick() {
    this.currentStep = 'music';
    // Implementation coming soon
  }

  handleDialoguesClick() {
    this.currentStep = 'dialogues';
    // Implementation coming soon
  }

  handleRenderClick() {
    this.currentStep = 'render';
    // Implementation coming soon
  }

  async loadPreviousMovies() {
    this.isLoading = true;
    try {
      const response = await fetch('/api/movies');
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const movies = await response.json();

      // If your API returns the movie field as "prompt" and your UI expects "moviePrompt",
      // you can map the response accordingly. For example:
      // this.movies = movies.map((m: any) => ({ ...m, moviePrompt: m.prompt }));
      //
      // Otherwise, if your API already returns a "moviePrompt" field, assign directly:
      this.movies = movies;
    } catch (error) {
      console.error('Error loading movies:', error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  setActiveMovie(movieId: string) {
    console.log('[moviestore] settig  movie id: ', movieId);
    this.currentMovieId = movieId;
    this.isPowerOn = true;
  }
}
