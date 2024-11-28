import React from "react";

export type timerType = 'pomodoro' | 'break';

type TimerProps = {
  type: timerType,
  time: number,
}

const Timer: React.FunctionComponent<TimerProps> = (props: TimerProps) => {
  const { type, time } = props;

  const typeMap = {
    pomodoro: 'time to focus',
    break: 'take a break',
  }

  return (
    <>
      <p className="type" id="type">{typeMap[type]}</p>
      <div className="timer">
        <span role="timer" aria-labelledby="type">{Math.floor(time / 60).toString().padStart(2, '0')} : {Math.floor(time % 60).toString().padStart(2, '0')}</span>
      </div>
    </>
  )
}

export default Timer;