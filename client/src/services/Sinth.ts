import * as Tone from "tone";
import { makeAutoObservable } from "mobx";

export const octava = [
  { css: 'clear', note: 'C4', label: 'До', key: 'KeyA' },
  { css: 'diez', note: 'C#4', label: 'До#', key: 'KeyW' },
  { css: 'clear', note: 'D4', label: 'Ре', key: 'KeyS' },
  { css: 'diez', note: 'D#4', label: 'Ре#', key: 'KeyE' },
  { css: 'clear', note: 'E4', label: 'Ми', key: 'KeyD' },
  { css: 'clear', note: 'F4', label: 'Фа', key: 'KeyF' },
  { css: 'diez', note: 'F#4', label: 'Фа#', key: 'KeyT' },
  { css: 'clear', note: 'G4', label: 'Соль', key: 'KeyG' },
  { css: 'diez', note: 'G#4', label: 'Соль#', key: 'KeyY' },
  { css: 'clear', note: 'A4', label: 'Ля', key: 'KeyH' },
  { css: 'diez', note: 'A#4', label: 'Ля#', key: 'KeyU' },
  { css: 'clear', note: 'B4', label: 'Си', key: 'KeyJ' },

  { css: 'clear', note: 'C5', label: 'До', key: 'KeyK' },
  { css: 'diez', note: 'C#5', label: 'До#', key: 'KeyO' },
  { css: 'clear', note: 'D5', label: 'Ре', key: 'KeyL' },
  { css: 'diez', note: 'D#5', label: 'Ре#', key: 'KeyP' },
  { css: 'clear', note: 'E5', label: 'Ми', key: 'Semicolon' },
  { css: 'clear', note: 'F5', label: 'Фа', key: 'Quote' },
  { css: 'diez', note: 'F#5', label: 'Фа#', key: 'BracketRight' },
  { css: 'clear', note: 'G5', label: 'Соль', key: 'Backslash' },
  { css: 'diez', note: 'G#5', label: 'Соль#', key: null },
  { css: 'clear', note: 'A5', label: 'Ля', key: null },
  { css: 'diez', note: 'A#5', label: 'Ля#', key: null },
  { css: 'clear', note: 'B5', label: 'Си', key: null },
];

export class Synth {
  synth: Tone.Sampler;

  notes: Set<string>;

  constructor() {
    makeAutoObservable(this);

    this.synth = new Tone.Sampler({
      urls: {
        C4: "C4.mp3",
        "D#4": "Ds4.mp3",
        "F#4": "Fs4.mp3",
        A4: "A4.mp3",
      },
      release: 1,
      baseUrl: "https://tonejs.github.io/audio/salamander/",
    }).toDestination();
    this.notes = new Set<string>();
  }

  downKey = (key: string): string => {
    const note = octava.find((note) => note.key === key);
    if (note) {
      this.playNote(note.note);
      return note.note;
    }
    return null;
  }

  upKey = (key: string): string => {
    const note = octava.find((note) => note.key === key);
    if (note) {
      this.stopNote(note.note);
      return note.note;
    }
    return null;
  }

  playNote(note: string) {
    if (!this.notes.has(note)) {
      this.notes.add(note);
      this.synth.triggerAttack(note);
    }
  }

  stopNote(note: string) {
    if (this.notes.has(note)) {
      this.notes.delete(note);
      this.synth.triggerRelease(note, '+0.1');
    }
  }

  isPlaying(note: string) {
    return this.notes.has(note);
  }
}
