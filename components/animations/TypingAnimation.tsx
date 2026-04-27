'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface TypingAnimationProps {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseDelay?: number;
  loop?: boolean;
  className?: string;
  showCursor?: boolean;
  blinkCursor?: boolean;
  cursorStyle?: 'line' | 'block' | 'underscore';
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  words,
  typeSpeed = 60,
  deleteSpeed = 100,
  pauseDelay = 2000,
  loop = true,
  className = '',
  showCursor = true,
  blinkCursor = true,
  cursorStyle = 'line',
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handleTyping = useCallback(() => {
    const fullWord = words[currentWordIndex];

    if (!isDeleting && !isPaused) {
      // Typing phase
      if (currentText !== fullWord) {
        setCurrentText(fullWord.substring(0, currentText.length + 1));
      } else {
        // Word complete, start pause
        setIsPaused(true);
      }
    } else if (isDeleting && !isPaused) {
      // Deleting phase
      if (currentText !== '') {
        setCurrentText(fullWord.substring(0, currentText.length - 1));
      } else {
        // Word fully deleted, move to next word
        setIsDeleting(false);
        const nextIndex = (currentWordIndex + 1) % words.length;
        if (!loop && nextIndex === 0) return; // Stop if not looping
        setCurrentWordIndex(nextIndex);
      }
    }
  }, [currentText, currentWordIndex, isDeleting, isPaused, words, loop]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isPaused) {
      // Pause at the end of typing
      timer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDelay);
    } else {
      // Typing or Deleting
      const speed = isDeleting ? deleteSpeed : typeSpeed;
      timer = setTimeout(handleTyping, speed);
    }

    return () => clearTimeout(timer);
  }, [handleTyping, isDeleting, isPaused, typeSpeed, deleteSpeed, pauseDelay]);

  // Cursor styling map
  const cursorChars = {
    line: '|',
    block: '█',
    underscore: '_',
  };

  return (
    <span className={className}>
      {currentText}
      {showCursor && (
        <span
          style={{
            display: 'inline-block',
            marginLeft: '2px',
            animation: blinkCursor ? 'blink 1s step-end infinite' : 'none',
            fontWeight: 300,
            opacity: 0.8,
          }}
        >
          {cursorChars[cursorStyle]}
          <style jsx>{`
            @keyframes blink {
              from, to { opacity: 1; }
              50% { opacity: 0; }
            }
          `}</style>
        </span>
      )}
    </span>
  );
};

export default TypingAnimation;
