import { makeAutoObservable } from 'mobx';

export class MovieStore {
  isPowerOn: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }

  setPowerOn() {
    this.isPowerOn = !this.isPowerOn;
  }
}
