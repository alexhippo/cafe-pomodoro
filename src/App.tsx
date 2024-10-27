import { useEffect, useState } from 'react'
import './App.css'
import Timer, { timerType } from './components/Timer'

// global time variables
const TIME_POMODORO = 25 * 60;
const TIME_BREAK = 5 * 60;

function App() {
  const [timerType, setTimerType] = useState<timerType>('pomodoro');
  const [time, setTime] = useState<number>(TIME_POMODORO);
  const [isPaused, setIsPaused] = useState<boolean>(true);

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
  }, [timerType]);

  // timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPaused) {
        if (time <= 0) {
          clearInterval(timer);
          setIsPaused(true);
          setTimerType(timerType === 'pomodoro' ? 'break' : 'pomodoro');
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
  }

  return (
    <>
      <button onClick={() => { handleTypeClick('pomodoro'); }}>pomodoro</button>
      <button onClick={() => { handleTypeClick('break'); }}>break</button>
      <Timer type={timerType} time={time} />
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
    </>
  )
}

export default App
