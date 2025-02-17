import { makeAutoObservable } from 'mobx';
import { CreateMovieInput, createMovieSchema } from '@/lib/validations/movie';

export type MovieStep =
  | 'idea'
  | 'character'
  | 'script'
  | 'screenplay'
  | 'shots'
  | 'music'
  | 'dialogues'
  | 'assets'
  | 'final'
  | null;

export class MovieStore {
  isPowerOn: boolean = false;
  isZeroShotMode: boolean = false;
  currentMovieId: string | null = null;
  currentStep: MovieStep = null;

  constructor() {
    makeAutoObservable(this);
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

  handleCharacterClick() {
    this.currentStep = 'character';
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

  handleMusicClick() {
    this.currentStep = 'music';
    // Implementation coming soon
  }

  handleDialoguesClick() {
    this.currentStep = 'dialogues';
    // Implementation coming soon
  }

  handleAssetsClick() {
    this.currentStep = 'assets';
    // Implementation coming soon
  }

  handleFinalClick() {
    this.currentStep = 'final';
    // Implementation coming soon
  }
}
