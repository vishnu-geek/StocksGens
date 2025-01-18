"use client";

import { Save } from "lucide-react";

interface SaveButtonProps {
  onClick: () => void;
}

export default function SaveButton({ onClick }: SaveButtonProps) {
  return (
    <div className="fixed top-24 right-5">
      <button
        className="text-white  bg-black transition-all duration-300 hover:scale-110 active:scale-90 p-4 rounded-full shadow-md  shadow-cyan-400"
        aria-label="Share"
        onClick={() => {
          onClick();
        }}
      >
        <Save className="text-white w-6 h-6" />
      </button>
    </div>
  );
}
