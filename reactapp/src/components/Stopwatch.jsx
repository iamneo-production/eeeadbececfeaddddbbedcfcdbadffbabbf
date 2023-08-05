import React, { useState } from "react";

function Stopwatch() {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [intervalId, setIntervalId] = useState(null);
  const [button1State, setButton1State] = useState("Start");
  const [button2State, setButton2State] = useState("Reset");

  const startTimer = () => {
    const id = setInterval(() => {
      setTime((prevTime) => {
        let seconds = prevTime.seconds + 1;
        let minutes = prevTime.minutes;
        let hours = prevTime.hours;
        if (seconds === 60) {
          seconds = 0;
          minutes = prevTime.minutes + 1;
        }
        if (minutes === 60) {
          minutes = 0;
          hours = prevTime.hours + 1;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    setIntervalId(id);
  };

  const pauseTimer = () => {
    clearInterval(intervalId);
  };

  const resetTimer = () => {
    setTime({ hours: 0, minutes: 0, seconds: 0 });
  };

  const handleButton1Click = () => {
    if (button1State === "Start") {
      setButton1State("Pause");
      setButton2State("Reset");
      startTimer();
    } else if (button1State === "Pause") {
      setButton1State("Resume");
      setButton2State("Reset");
      pauseTimer();
    } else if (button1State === "Resume") {
      setButton1State("Pause");
      setButton2State("Reset");
      startTimer();
    }
  };

  const handleButton2Click = () => {
    if (button1State === "Pause" || button1State === "Resume") {
      resetTimer();
      setButton1State("Start")
      setButton2State("Reset");
      pauseTimer();
    }
  };

  return (
    <div className="outer-main">
      <p className="inner-main">
        <p className="head">React Stopwatch</p>
        <p data-testid="time" className="time">
          {`${time.hours.toString().padStart(2, "0")} : ${time.minutes.toString().padStart(2, "0")} : ${time.seconds.toString().padStart(2, "0")}`}
        </p>
        <button onClick={handleButton1Click} data-testid="button" className="button">
          {button1State === "Start" && "Start"}
          {button1State === "Pause" && "Pause"}
          {button1State === "Resume" && "Resume"}
        </button>
        <button onClick={handleButton2Click} disabled={button1State === "Start"} data-testid="button" className="button">
          {button2State === "Reset" && "Reset"}
        </button>
      </p>
    </div>
  );
}

export default Stopwatch;