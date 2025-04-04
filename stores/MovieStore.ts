import { makeAutoObservable } from 'mobx';
import { CreateMovieInput, createMovieSchema } from '@/lib/validations/movie';
import { Actor, Movie, MovieStep } from '@/types/MovieTypes';

export class MovieStore {
  isPowerOn: boolean = false;
  isZeroShotMode: boolean = false;
  currentMovieId: string | null = null;
  currentStep: MovieStep = null;

  private _actors: Actor[] = [];

  // Instead of a public property, we use a private backing field
  private _movies: Movie[] = [];

  isLoading: boolean = false;

  constructor() {
    // autoBind ensures actions keep the correct "this" context
    makeAutoObservable(this, {}, { autoBind: true });

    // TODO:these function calling sequence should be optimized later
    this.loadActors();
    this.loadPreviousMovies();
  }

  // Getter for movies – the UI components will use this to get an observable list
  get movies() {
    return this._movies;
  }

  get actors() {
    return this._actors;
  }

  // Setter for movies – any update to the list goes through here
  setMovies(movies: Movie[]) {
    this._movies = movies;
  }

  setActors(actors: Actor[]) {
    this._actors = actors;
  }

  setCurrentMovieId(id: string) {
    this.currentMovieId = id;
  }

  setPowerOn() {
    this.isPowerOn = !this.isPowerOn;

    // Auto-select the latest movie when turning power on
    if (this.isPowerOn && !this.currentMovieId) {
      const latestMovie = this._movies[0]; // Already sorted by latest in the API
      console.log(`Auto-selecting movie ID: ${latestMovie.id}`);
      this.setActiveMovie(latestMovie.id.toString());
    }
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
      this.setCurrentMovieId(movie.id.toString());

      return movie;
    } catch (error) {
      console.error('Error creating movie:', error);
      throw error;
    }
  }

  async createZeroShotMovie() {
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
      this.setMovies(movies);
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
  }

  get isActorSelected() {
    if (!this.currentMovieId) return false;
    return this.currentMovie?.actorId !== undefined;
  }

  // Add this new getter to easily check if a specific actor is selected
  isActorSelectedById(actorId: number) {
    return this.currentMovie?.actorId === actorId;
  }

  get currentMovie(): Movie | null {
    return (
      this.movies.find(
        (movie) => movie.id.toString() === this.currentMovieId
      ) ?? null
    );
  }

  async selectActor(actorId: number): Promise<boolean> {
    if (!this.currentMovieId) return false;

    try {
      const response = await fetch(
        `/api/movies/${this.currentMovieId}/select-actor`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ actorId }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to select actor');
      }

      return true; // Explicitly return true on success
    } catch (error) {
      console.error('Error selecting actor:', error);
      throw error;
    }
  }

  private async loadActors() {
    try {
      const response = await fetch('/api/actors');
      const data = await response.json();
      this.setActors(data);
    } catch (error) {
      console.error('Error loading actors:', error);
    }
  }
}
