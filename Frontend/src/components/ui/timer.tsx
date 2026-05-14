

import { Pause, Play } from "lucide-react";
import { useState, useEffect } from "react";

export default function Timer() {
  const [time, setTime] = useState(0); // Time in seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }else{setTime(0)}
    return () => clearInterval(timer);
  }, [isRunning]);

  // Convert seconds into HH:MM:SS format
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const mins = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <header className="flex items-center justify-between border px-2 rounded-sm  text-white">

      <div className="flex items-center ">
        <span className="text-lg font-mono">{formatTime(time)}</span>
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="px-4 py-2  rounded-md text-white"
        >
          {isRunning ? <Pause fill="white" size={15} /> : <Play fill="white" size={15} />}
        </button>
      </div>
    </header>
  );
}
