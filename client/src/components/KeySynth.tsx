import { observer } from "mobx-react";
import React, { useState } from "react";
import cx from "classnames";

import { Keyboard } from "services/Keyboard";

interface KeySynthProps {
  css: string;
  note: string;
  button: string;
  label: string;
  playing: boolean;
  onPlay: (note: string) => void;
  onStop: (note: string) => void;

}

export const KeySynth = observer(({ css, note, button, label, playing, onPlay, onStop }: KeySynthProps) => {
  const [ pressed, setPressed ] = useState(false);

  const touchStart = (e: any) => {
    onPlay(note);
    setPressed(true);
    e.preventDefault();
  }
  const touchStop = (e: any) => {
    onStop(note);
    setPressed(false);
    e.preventDefault();
  }

  const cn = `piano__${css}`;
  const cnPress = cn + '--press';
  const cnPressOutside = cn + '--press-outside';
  const pressInside = pressed || Keyboard.getInstance().stateKey.get(button);
  const pressOutside = playing && !pressInside;
  return <div
    className={cx(cn, {
      [cnPress]: (pressInside),
      [cnPressOutside]: (pressOutside)
    })}
    onMouseDown={touchStart}
    onMouseUp={touchStop}
    onMouseLeave={touchStop}

    onTouchStart={touchStart}
    onTouchMove={touchStop}
    onTouchEnd={touchStop}
    onTouchCancel={touchStop}
  >{label}</div>
})
