import React, { useState, useEffect, useRef } from "react";
import SaveButton from "./ui/saveButton";

interface EditableTextProps {
  initialText: string;
  onSave: (text: string) => void;
  className?: string;
  mitigation?: boolean;
}

export function EditableText({
  initialText,
  mitigation = false,
  onSave,
  className = "",
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const [hasChanged, setHasChanged] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const cursorPositionRef = useRef<number | null>(null);

  useEffect(() => {
    if (isEditing && textRef.current) {
      textRef.current.focus();
      if (cursorPositionRef.current !== null) {
        const range = document.createRange();
        const sel = window.getSelection();
        range.setStart(
          textRef.current.childNodes[0] || textRef.current,
          cursorPositionRef.current
        );
        range.collapse(true);
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    }
  }, [isEditing, text]);

  const handleBlur = () => {
    setIsEditing(false);
    if (hasChanged) {
      onSave(text);
      setHasChanged(false);
    }
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newText = e.currentTarget.textContent || "";
    if (newText !== initialText) {
      setHasChanged(true);
    } else {
      setHasChanged(false);
    }
    setText(newText);
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      cursorPositionRef.current = range.startOffset;
    }
  };

  const handleSave = () => {
    onSave(text);
    setHasChanged(false);
  };

  return (
    <div className="relative">
      {hasChanged && (
        <div className="absolute right-0 top-0 -mt-8">
          <SaveButton onClick={() => handleSave()} />
        </div>
      )}
      <div
        ref={textRef}
        className={`${className} ${
          isEditing ? "border border-blue-500 rounded" : ""
        }`}
        contentEditable={isEditing}
        onBlur={handleBlur}
        onClick={() => setIsEditing(true)}
        onInput={handleInput}
        suppressContentEditableWarning={true}
      >
        {mitigation ? (
          <span className="font-bold text-white">Mitigation: </span>
        ) : (
          <></>
        )}
        {text}
      </div>
    </div>
  );
}
