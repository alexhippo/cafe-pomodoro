import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import Timer, { TimerType } from "./components/Timer";
import RoundsDisplay from "./components/RoundsDisplay";
import AudioPlayer from "./components/AudioPlayer";

// global time variables
const TIME_POMODORO_MINUTES = 1;
const TIME_POMODORO = TIME_POMODORO_MINUTES * 60;
const TIME_BREAK_MINUTES = 5;
const TIME_BREAK = TIME_BREAK_MINUTES * 60;

export type AudioStatus = "playAudio" | "pauseAudio" | undefined;

function App() {
  const [timerType, setTimerType] = useState<TimerType>("pomodoro");
  const [time, setTime] = useState<number>(TIME_POMODORO);
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [numberOfRounds, setNumberOfRounds] = useState<number>(0);
  const [audioStatus, setAudioStatus] = useState<AudioStatus>(undefined);
  const [bellStatus, setBellStatus] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>(
    `${timerType === "pomodoro" ? TIME_POMODORO_MINUTES : TIME_BREAK_MINUTES} minutes left in ${timerType}`,
  );

  const achievementBellAudio = new Audio("/mixkit-achievement-bell-600.wav");
  const achievementBellAudioRef = useRef(achievementBellAudio);

  const resetTimer = useCallback(() => {
    if (timerType === "pomodoro") {
      setTime(TIME_POMODORO);
    } else {
      setTime(TIME_BREAK);
    }
    setStatusMessage(
      `${timerType === "pomodoro" ? TIME_POMODORO_MINUTES : TIME_BREAK_MINUTES} minutes left in ${timerType}`,
    );
  }, [timerType]);

  useEffect(() => {
    resetTimer();
    setBellStatus(false);
  }, [resetTimer, timerType]);

  useEffect(() => {
    if (bellStatus) {
      achievementBellAudioRef.current.play();
    }
  }, [bellStatus]);

  // timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPaused) {
        if (time <= 0) {
          clearInterval(timer);
          setIsPaused(true);
          setBellStatus(true);
          setAudioStatus("pauseAudio");

          if (timerType === "pomodoro") {
            setTimerType("break");
            setNumberOfRounds(numberOfRounds + 1);
          } else {
            setTimerType("pomodoro");
          }
          setStatusMessage(
            `${timerType === "pomodoro" ? TIME_POMODORO_MINUTES : TIME_BREAK_MINUTES} minutes left in ${timerType}`,
          );

          return 0;
        } else {
          setTime(time - 1);
          if (time % 60 === 0) {
            setStatusMessage(
              `${Math.floor(time / 60)} minutes left in ${timerType}`,
            );
          }
        }
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [isPaused, timerType, time, numberOfRounds]);

  const handleTypeClick = (selectedTimerType: TimerType) => {
    setTimerType(selectedTimerType);
    selectedTimerType === "pomodoro"
      ? setTime(TIME_POMODORO)
      : setTime(TIME_BREAK);
  };

  const handleStartClick = () => {
    setIsPaused(false);
  };

  const handlePauseClick = () => {
    setIsPaused(true);
  };

  const handleResetClick = () => {
    resetTimer();
    setIsPaused(true);
    setNumberOfRounds(0);
  };

  const handleAudioClick = () => {
    if (audioStatus === "playAudio") {
      setAudioStatus("pauseAudio");
    } else {
      setAudioStatus("playAudio");
    }
  };

  return (
    <div className="appGrid">
      <div className="topControls">
        <AudioPlayer status={audioStatus} handleAudioClick={handleAudioClick} />
      </div>
      <div>&nbsp;</div>
      <div className="topRightControls">
        <RoundsDisplay rounds={numberOfRounds} />
      </div>
      <div>&nbsp;</div>
      <main>
        <div className="controls">
          <button
            onClick={() => {
              handleTypeClick("pomodoro");
            }}
          >
            pomodoro
          </button>
          <button
            onClick={() => {
              handleTypeClick("break");
            }}
          >
            break
          </button>
        </div>
        <Timer type={timerType} time={time} />
        <span role="status">
          {statusMessage}
        </span>
        <div className="controls">
          <button
            onClick={() => {
              handleStartClick();
            }}
          >
            start
          </button>
          <button
            onClick={() => {
              handlePauseClick();
            }}
          >
            pause
          </button>
          <button
            onClick={() => {
              handleResetClick();
            }}
          >
            reset
          </button>
        </div>
      </main>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <footer>
        <p>
          made with{" "}
          <span role="img" aria-label="love">
            💖{" "}
          </span>{" "}
          and{" "}
          <span role="img" aria-label="coffee">
            ☕
          </span>{" "}
          by <a href="https://alexhippo.dev">alexhippo</a>
        </p>
      </footer>
      <div>&nbsp;</div>
    </div>
  );
}

export default App;
