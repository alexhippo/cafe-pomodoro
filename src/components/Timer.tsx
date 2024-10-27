import React from "react";

export type timerType = 'pomodoro' | 'break';

type TimerProps = {
  type: timerType,
  time: number,
}

const Timer: React.FunctionComponent<TimerProps> = (props: TimerProps) => {
  const { type, time } = props;

  return (
    <>
      <p>{type}</p>
      <p>{Math.floor(time / 60).toString().padStart(2, '0')} : {Math.floor(time % 60).toString().padStart(2, '0')}</p>
    </>
  )
}

export default Timer;