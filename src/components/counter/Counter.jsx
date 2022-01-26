import React, { useState, useEffect } from "react";

import "./counter.scss";

const Counter = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const counterToTime = () => {
    let hour = Math.floor((time / 3600) % 24);
    let min = Math.floor((time % 3600) / 60);
    let sec = time % 60;

    return `${hour < 10 ? "0" + hour : hour} : ${
      min < 10 ? "0" + min : min
    } : ${sec < 10 ? "0" + sec : sec}`;
  };

  return <div className="counter">{counterToTime()}</div>;
};

export default Counter;
