"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const interBubbleRef = useRef<HTMLDivElement>(null);
  const [topic, setTopic] = useState<string>("");
  const [typed, setTyped] = useState<boolean>(false);
  const [ticker, setTicker] = useState<string>("");
  const [userLogged, setUserLogged] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const interBubble = interBubbleRef.current;
      if (!interBubble) return;

      const rect = interBubble.getBoundingClientRect();

      tgX = event.clientX - rect.width / 2;
      tgY = event.clientY - rect.height / 2;
    };

    const move = () => {
      curX += (tgX - curX) / 5;
      curY += (tgY - curY) / 5;
      if (interBubbleRef.current) {
        interBubbleRef.current.style.transform = `translate3d(${Math.round(
          curX
        )}px, ${Math.round(curY)}px, 0)`;
      }
      requestAnimationFrame(move);
    };

    window.addEventListener("mousemove", handleMouseMove);
    move();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTopic(val);

    if (val.length === 0) {
      setTicker("");
      return;
    }

    try {
      const response = await fetch("/api/ticker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stockName: val }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTicker(data.ticker);
    } catch (err) {
      console.error("Error fetching ticker:", err);
      setTicker("");
    } finally {
      setTyped(true);
    }
  };

  return (
    <div className="gradient-bg relative min-h-screen">
      <div className="absolute inset-0 flex flex-col items-center justify-between text-white z-10">
        <header className="w-full bg-black bg-opacity-20 shadow-lg">
          <div className="container mx-auto px-4 py-6 flex justify-between items-center">
            <h1 className="text-4xl font-bold tracking-tight">StockGen</h1>
          </div>
        </header>

        <main className="flex flex-col items-center justify-center flex-grow w-full px-4">
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Wipe data
              <br />
              with a Single Click
            </h2>
            <input
              type="text"
              onChange={handleInput}
              value={topic}
              className="flex-grow p-3 text-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter stock topic"
            />
            <input
              type="text"
              onChange={handleInput}
              value={topic}
              className="flex-grow p-3 text-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter stock topic"
            />
            <input
              type="text"
              onChange={handleInput}
              value={topic}
              className="flex-grow p-3 text-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter stock topic"
            />
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full max-w-md">
            <input
              type="text"
              onChange={handleInput}
              value={topic}
              className="flex-grow p-3 text-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter stock topic"
            />
            <button
              className={`px-6 py-3 ${
                typed
                  ? "bg-gradient-to-r from-pink-500 to-purple-600"
                  : "bg-slate-600"
              } rounded-lg text-white font-semibold shadow-md hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300`}
              disabled={!typed}
            >
              Generate PPT
            </button>
          </div>
        </main>

        <footer className="w-full bg-black bg-opacity-20 backdrop-blur-sm py-4">
          <div className="container mx-auto px-4 text-center text-sm">
            © 2025 pptX. All rights reserved.
          </div>
        </footer>
      </div>

      <div className="g1"></div>
      <div className="g2"></div>
      <div className="g3"></div>
      <div className="g4"></div>
      <div className="g5"></div>
      <div id="bubble" ref={interBubbleRef} className="interactive"></div>
    </div>
  );
}
