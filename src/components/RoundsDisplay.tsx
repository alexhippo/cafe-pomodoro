import React from "react";

type RoundsDisplayProps = {
  rounds: number;
}

const RoundsDisplay: React.FunctionComponent<RoundsDisplayProps> = (props: RoundsDisplayProps) => {
  const { rounds } = props;
  return (
    <p>Pomodoros completed: {rounds}</p>
  )
}

export default RoundsDisplay;