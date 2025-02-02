import React, { useRef } from "react";
import { AudioStatus } from "../App";
import { PauseIcon, PlayIcon } from "@radix-ui/react-icons";

const { BASE_URL } = import.meta.env;

type AudioPlayerProps = {
  status: AudioStatus;
  handleAudioClick: () => void;
};

const AudioPlayer: React.FunctionComponent<AudioPlayerProps> = (
  props: AudioPlayerProps,
) => {
  const { status, handleAudioClick } = props;
  let buttonContent = "Play";

  const cafeBackgroundAudio = new Audio(`${BASE_URL}/cafe-ambience.wav`);
  const cafeBackgroundAudioRef = useRef(cafeBackgroundAudio);

  const playAudio = (ref: React.MutableRefObject<HTMLAudioElement>) => {
    ref.current.play();
    ref.current.loop = true;
  };

  const pauseAudio = (ref: React.MutableRefObject<HTMLAudioElement>) => {
    ref.current.pause();
  };

  if (status === "playAudio") {
    playAudio(cafeBackgroundAudioRef);
    buttonContent = "pause cafe sounds";
  } else {
    pauseAudio(cafeBackgroundAudioRef);
    buttonContent = "play cafe sounds";
  }

  return (
    <button onClick={handleAudioClick} className="audioButton">
      <div className="audioButtonContent">
        {buttonContent === "play cafe sounds" ? <PlayIcon /> : <PauseIcon />}
        {buttonContent}
      </div>
    </button>
  );
};

export default AudioPlayer;
