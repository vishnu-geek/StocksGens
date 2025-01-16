"use client";

import { Save } from "lucide-react";
import { useState } from "react";

interface SaveButtonProps {
  onClick: () => void;
}

export default function SaveButton({ onClick }: SaveButtonProps) {
  const [clicked, setClicked] = useState(false);
  return (
    <div className="fixed top-24 right-5">
      <button
        className={`text-white transition-all duration-300 hover:scale-110 active:scale-90 p-4 ${
          clicked ? "bg-green-500  rounded-full" : " bg-red-600 rounded-full"
        }`}
        aria-label="Share"
        onClick={() => {
          setClicked(true);
          onClick;
        }}
      >
        <Save className="text-white w-6 h-6" />
      </button>
    </div>
  );
}
