import { observer } from "mobx-react";
import React, { useContext, useEffect, useMemo } from "react";

import { octava, Synth } from "services/Sinth";
import { Keyboard } from "services/Keyboard";

import {SocketContext} from 'context/socket';

import { KeySynth } from "components/KeySynth";


export const Piano = observer(() => {

  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('playNote', handlePlayAnotherUserNote)
    socket.on('stopNote', handleStopAnotherUserNote)

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const handlePlayAnotherUserNote = (note: string) => {
    synth.synth.playNote(note);
  }
  const handleStopAnotherUserNote = (note: string) => {
    synth.synth.stopNote(note);
  }

  const synth = useMemo(() => {

    const synth = new Synth();

    const upKey = (key: string) => {
      const note = synth.upKey(key);
      if (note) {
        socket.emit("stop", '1', note);
      }
    }
    const downKey = (key: string) => {
      const note = synth.downKey(key);
      if (note) {
        socket.emit("play", '1', note);
      }
    }

    const handlePlayNote = (note: string) => {
      synth.playNote(note);
      socket.emit("play", '1', note);
    }

    const handleStopNote = (note: string) => {
      synth.stopNote(note);
      socket.emit("stop", '1', note);
    }

    Keyboard.getInstance().onKeyUp = upKey;
    Keyboard.getInstance().onKeyDown = downKey;

    return { synth: synth, play: handlePlayNote, stop: handleStopNote, keys: Keyboard.getInstance().stateKey };
  }, []);

  return <div className='piano'>
        {octava.map((key, index) =>
          <KeySynth
            key={index}
            label={key.label}
            css={key.css}
            note={key.note}
            button={key.key}
            onPlay={synth.play}
            onStop={synth.stop}
            playing={synth.synth.isPlaying(key.note)}
          />
        )}
      </div>
});
