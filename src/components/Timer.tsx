import React, { useCallback, useEffect, useState } from "react";

export type timerType = 'pomodoro' | 'break';

type TimerProps = {
  type: timerType,
  time: number,
}

const Timer: React.FunctionComponent<TimerProps> = (props: TimerProps) => {
  const { type, time } = props;

  const [isActive, setIsActive] = useState<boolean>(false);

  // const resetTimer = () => {
  //   if (type === 'pomodoro') {
  //     setTime(25 * 60);
  //   } else {
  //     setTime(5 * 60);
  //   }
  // }

  // useEffect(() => {
  //   if (!isActive) {
  //     resetTimer();
  //   }
  // }, [type]);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     if (!isPaused) {
  //       if (time === 0) {
  //         setIsActive(false);
  //         clearInterval(timer);
  //         // pass type back to the parent
  //         return 0;
  //       } else {
  //         setTime((time) => {
  //           return time - 1;
  //         });
  //       }
  //     }
  //   }, 1000);

  //   return () => {
  //     clearInterval(timer);
  //   }
  // }, [isPaused]);

  return (
    <>
      <p>{type}</p>
      <p>{Math.floor(time / 60).toString().padStart(2, '0')} : {Math.floor(time % 60).toString().padStart(2, '0')}</p>
    </>
  )
}

export default Timer;