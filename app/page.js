"use client";
import { useState } from "react";
export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  async function sendMessage(prompt) {
    const canCreate = await window.ai.canCreateTextSession();
    if (canCreate !== "no") {
      const session = await window.ai.createTextSession();
      const stream = session.promptStreaming(prompt);
      for await (const chunk of stream) {
        setResponse(chunk);
      }
    }
  }

  return (
    <main className="flex min-h-screen flex-row gap-7 items-center justify-between p-24 container">
      <div className="flex flex-col w-full">
        <div className="flex flex-row gap-7 w-full">
          <div className="flex flex-col w-1/2">
            <input
              onChange={(e) => setPrompt(e.target.value)}
              className="text-black"
              placeholder="prompt"
              type="text"
            ></input>
            <button onClick={() => sendMessage(prompt)}>Enviar</button>
          </div>
          <div className="flex flex-col w-1/2">
            {!response ? <p>Hola, soy gemini nano</p> : <p>{response}</p>}
          </div>
        </div>
      </div>
    </main>
  );
}
