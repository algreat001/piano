import { makeAutoObservable } from 'mobx';

export class Keyboard {
  keys: Map<string, boolean>;

  changeKeyMap = false;

  onKeyUp: (key: string) => void = null;

  onKeyDown: (key: string) => void = null;

  private constructor() {
    makeAutoObservable(this);

    this.keys = new Map<string, boolean>();
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  }

  keyDown(key: string) {
    if (!this.keys.get(key)) {
      this.keys.set(key, true);
      this?.onKeyDown(key);
      this.changeKeyMap = !this.changeKeyMap;
    }
  }

  keyUp(key: string) {
    if (this.keys.get(key)) {
      this.keys.set(key, false);
      this?.onKeyUp(key);
      this.changeKeyMap = !this.changeKeyMap;
    }
  }

  handleKeyDown = (e: KeyboardEvent) => {
    this.keyDown(e.code);
  }
  handleKeyUp = (e: KeyboardEvent) => {
    this.keyUp(e.code)
  }

  get stateKey() {
    return this.keys;
  }

  private static _instance: Keyboard = null;

  static getInstance() {
    if (!Keyboard._instance) {
      Keyboard._instance = new Keyboard();
    }
    return Keyboard._instance;
  }

}
