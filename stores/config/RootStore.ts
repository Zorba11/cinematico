import { makeAutoObservable } from 'mobx';
import { MovieStore } from '../MovieStore';

export class RootStore {
  movieStore: MovieStore;
  constructor() {
    this.movieStore = new MovieStore();
    makeAutoObservable(this);
  }
}

const rootStore = new RootStore();
export default rootStore;
