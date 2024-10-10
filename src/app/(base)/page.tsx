'use client'

import { useState } from "react";

import Configuration from "./components/Configuration";
import TimerContainer from "./components/TimerContainer";

export interface TimerDataInterface {
  audio?: string,
  id?: string,
  timer?: string,
  userId?: string
}

export default function Home() {
  const [showConfig, setShowConfig] = useState(false)

  return (
    <div className="bg-gradient-to-b from-slate-700 to-slate-800 w-full min-h-screen flex flex-col justify-center items-center">      
      <TimerContainer showConfig={showConfig} setShowConfig={setShowConfig} />
      {showConfig ? (
        <Configuration setShowConfig={setShowConfig} />
      ) : (
        <></>
      )}
    </div>
  );
}
