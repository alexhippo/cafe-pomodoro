import React from "react";

type RoundsDisplayProps = {
  rounds: number;
}

const RoundsDisplay: React.FunctionComponent<RoundsDisplayProps> = (props: RoundsDisplayProps) => {
  const { rounds } = props;
  return (
    <p className="rounds" role="status">pomodoros completed: {rounds}</p>
  )
}

export default RoundsDisplay;