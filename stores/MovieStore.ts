import { makeAutoObservable } from 'mobx';

export class MovieStore {
  constructor() {
    makeAutoObservable(this);
  }

  setPowerOn() {
    alert('Power On');
  }
}
