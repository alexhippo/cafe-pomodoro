import { useEffect, useRef, useState } from 'react'
import './App.css'
import Timer, { timerType } from './components/Timer'
import RoundsDisplay from './components/RoundsDisplay';
import AudioPlayer from './components/AudioPlayer';

// global time variables
const TIME_POMODORO = 25 * 60;
const TIME_BREAK = 5 * 60;

export type AudioStatus = "playAudio" | "pauseAudio" | undefined;

function App() {
  const [timerType, setTimerType] = useState<timerType>('pomodoro');
  const [time, setTime] = useState<number>(TIME_POMODORO);
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [numberOfRounds, setNumberOfRounds] = useState<number>(0);
  const [audioStatus, setAudioStatus] = useState<AudioStatus>(undefined);
  const [bellStatus, setBellStatus] = useState<boolean>(false);

  const achievementBellAudio = new Audio('/mixkit-achievement-bell-600.wav');
  const achievementBellAudioRef = useRef(achievementBellAudio);

  const resetTimer = () => {
    if (timerType === 'pomodoro') {
      setTime(TIME_POMODORO);
    } else {
      setTime(TIME_BREAK);
    }
    setIsPaused(true);
  }

  useEffect(() => {
    resetTimer();
    setBellStatus(false);
  }, [timerType]);

  useEffect(() => {
    if (bellStatus) {
      achievementBellAudioRef.current.play();
    }
  }, [bellStatus])

  // timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPaused) {
        if (time <= 0) {
          clearInterval(timer);
          setIsPaused(true);
          setBellStatus(true);
          setAudioStatus('pauseAudio');

          if (timerType === 'pomodoro') {
            setTimerType('break');
            setNumberOfRounds(numberOfRounds + 1);
          } else {
            setTimerType('pomodoro');
          }

          return 0;
        } else {
          setTime(time - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    }
  }, [isPaused, timerType, time]);

  const handleTypeClick = (selectedTimerType: timerType) => {
    setTimerType(selectedTimerType);
    selectedTimerType === 'pomodoro' ? setTime(TIME_POMODORO) : setTime(TIME_BREAK);
  }

  const handleStartClick = () => {
    setIsPaused(false);
  }

  const handlePauseClick = () => {
    setIsPaused(true);
  }

  const handleResetClick = () => {
    resetTimer();
    setIsPaused(true);
    setNumberOfRounds(0);
  }

  const handleAudioClick = () => {
    if (audioStatus === 'playAudio') {
      setAudioStatus('pauseAudio');
    } else {
      setAudioStatus('playAudio');
    }
  }

  return (
    <div className="appGrid">
      <div className="topControls">
        <AudioPlayer status={audioStatus} handleAudioClick={handleAudioClick} />
      </div>
      <div>
        &nbsp;
      </div>
      <div className="topRightControls">
        <RoundsDisplay rounds={numberOfRounds} />
      </div>
      <div>&nbsp;</div>
      <main>
        <div className="controls">
          <button onClick={() => { handleTypeClick('pomodoro'); }}>pomodoro</button>
          <button onClick={() => { handleTypeClick('break'); }}>break</button>
        </div>
        <Timer type={timerType} time={time} />
        <div className="controls">
          <button onClick={() => {
            handleStartClick();
          }}>
            start
          </button>
          <button onClick={() => {
            handlePauseClick();
          }}>
            pause
          </button>
          <button onClick={() => {
            handleResetClick();
          }}>
            reset
          </button>
        </div>
      </main>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <footer>made with <span role="img" aria-label="sparkling heart">💖 </span> and <span role="img" aria-label="coffee">☕</span> by <a href="https://alexhippo.dev">alexhippo</a></footer>
      <div>&nbsp;</div>
    </div>
  )
}

export default App;
