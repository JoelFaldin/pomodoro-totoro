'use client'

import { useState } from "react";
import Timer from "./components/Timer";
import Configuration from "./components/Configuration";

export default function Home() {
  const [showConfig, setShowConfig] = useState(false)

  return (
    <div className="bg-gradient-to-b from-slate-700 to-slate-800 w-full min-h-screen flex flex-col justify-center items-center">      
      <Timer showConfig={showConfig} setShowConfig={setShowConfig} />
      {showConfig ? (
        <Configuration setShowConfig={setShowConfig} />
      ) : (
        <></>
      )}
    </div>
  );
}
