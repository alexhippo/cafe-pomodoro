import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import Timer, { TimerType } from "./components/Timer";
import RoundsDisplay from "./components/RoundsDisplay";
import AudioPlayer from "./components/AudioPlayer";

const { BASE_URL } = import.meta.env;

// global time variables
const TIME_POMODORO_MINUTES = 25;
const TIME_POMODORO = TIME_POMODORO_MINUTES * 60;
const TIME_BREAK_MINUTES = 5;
const TIME_BREAK = TIME_BREAK_MINUTES * 60;

export type AudioStatus = "playAudio" | "pauseAudio" | undefined;

function App() {
  const [timerType, setTimerType] = useState<TimerType>("pomodoro");
  const [time, setTime] = useState(TIME_POMODORO);
  const [isPaused, setIsPaused] = useState(true);
  const [numberOfRounds, setNumberOfRounds] = useState(0);
  const [audioStatus, setAudioStatus] = useState<AudioStatus>(undefined);
  const [bellStatus, setBellStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState(
    `${timerType === "pomodoro" ? TIME_POMODORO_MINUTES : TIME_BREAK_MINUTES} minutes left in ${timerType}`,
  );

  const pomodoroButtonRef = useRef<HTMLButtonElement>(null);
  const breakButtonRef = useRef<HTMLButtonElement>(null);

  const achievementBellAudio = new Audio(
    `${BASE_URL}/mixkit-achievement-bell-600.wav`,
  );
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
            toggleType("break");
          } else {
            setTimerType("pomodoro");
            toggleType("pomodoro");
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

  const toggleType = (selectedTimerType: TimerType) => {
    if (pomodoroButtonRef.current && breakButtonRef.current) {
      if (selectedTimerType === "pomodoro") {
        pomodoroButtonRef.current.classList.add("typeButtonSelected");
        breakButtonRef.current.setAttribute("aria-pressed", "false");
        breakButtonRef.current.classList.remove("typeButtonSelected");
      } else {
        pomodoroButtonRef.current.setAttribute("aria-pressed", "false");
        pomodoroButtonRef.current.classList.remove("typeButtonSelected");
        breakButtonRef.current.setAttribute("aria-pressed", "true");
        breakButtonRef.current.classList.add("typeButtonSelected");
      }
    }
  };

  const handleTypeClick = (selectedTimerType: TimerType) => {
    setTimerType(selectedTimerType);

    if (selectedTimerType === "pomodoro") {
      setTime(TIME_POMODORO);
      setIsPaused(true);
      toggleType("pomodoro");
    } else {
      setTime(TIME_BREAK);
      setIsPaused(true);
      toggleType("break");
    }
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
            className="typeButtonSelected"
            ref={pomodoroButtonRef}
          >
            pomodoro
          </button>
          <button
            onClick={() => {
              handleTypeClick("break");
            }}
            ref={breakButtonRef}
          >
            break
          </button>
        </div>
        <Timer type={timerType} time={time} />
        <span role="status" className="screenReaderOnlyTimer">
          {statusMessage}
        </span>
        <div className="controls">
          <button
            onClick={() => {
              isPaused ? handleStartClick() : handlePauseClick();
            }}
          >
            {isPaused ? "play" : "pause"}
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
