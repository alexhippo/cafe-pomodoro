import React from "react";

export type TimerType = "pomodoro" | "break";

type TimerProps = {
  type: TimerType;
  time: number;
  isPaused: boolean;
};

const Timer: React.FunctionComponent<TimerProps> = (props: TimerProps) => {
  const { type, time, isPaused } = props;

  const typeMap = {
    pomodoro: "time to focus",
    break: "take a break",
  };

  const timeDisplay = `${Math.floor(time / 60)
    .toString()
    .padStart(2, "0")} : ${Math.floor(time % 60)
    .toString()
    .padStart(2, "0")}`;

  if (!isPaused) {
    document.title = `Cafe Pomodoro - ${timeDisplay} - ${type}`;
  } else {
    document.title = "Cafe Pomodoro";
  }

  return (
    <>
      <p className="type" id="type" role="status">
        {typeMap[type]}
      </p>
      <div className="timer">
        <span role="timer" aria-labelledby="type">
          {timeDisplay}
        </span>
      </div>
    </>
  );
};

export default Timer;
