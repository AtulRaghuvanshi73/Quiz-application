"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const questions = [
  {
    id: 1,
    question: "What sound does a cat make?",
    options: ["Bhau-Bhau", "Meow-Meow", "Oink-Oink"],
    correctAnswer: "Meow-Meow",
  },
  {
    id: 2,
    question: "What would you probably find in your fridge?",
    options: ["Shoes", "Ice Cream", "Books"],
    correctAnswer: "Ice Cream",
  },
  {
    id: 3,
    question: "What color are bananas?",
    options: ["Blue", "Yellow", "Red"],
    correctAnswer: "Yellow",
  },
  {
    id: 4,
    question: "How many stars are in the sky?",
    options: ["Two", "Infinite", "One Hundred"],
    correctAnswer: "Infinite",
  },
];

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [displayScore, setDisplayScore] = useState(0);

  const handleOptionSelect = (option: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion]: option,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleStartAgain = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  useEffect(() => {
    if (showResults) {
      const targetScore = calculateScore();
      const duration = 1500;
      const steps = 60;
      const increment = targetScore / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= targetScore) {
          setDisplayScore(targetScore);
          clearInterval(timer);
        } else {
          setDisplayScore(Math.floor(current));
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    } else {
      setDisplayScore(0);
    }
  }, [showResults]);

  const isLastQuestion = currentQuestion === questions.length - 1;
  const isFirstQuestion = currentQuestion === 0;
  const hasSelectedAnswer = selectedAnswers[currentQuestion] !== undefined;

  if (showResults) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center" style={{
        background: "#F4FDFF"
      }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-block px-8 py-3 rounded-xl mb-10"
            style={{
              background: "linear-gradient(89.72deg, #E8F4F8 0.09%, #F5FBFD 99.91%)",
              border: "1px solid #D0E8EF"
            }}
          >
            <span className="text-[#1E6E8C] font-medium">Keep Learning!</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="text-4xl mb-2"
            style={{ fontFamily: "var(--font-dm-serif), 'DM Serif Display', serif" }}
          >
            <span className="italic text-[#1E6E8C]">Your</span>{" "}
            <span className="italic text-[#5BA3B8]">Final score is</span>
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, type: "spring", stiffness: 100 }}
            className="flex items-baseline justify-center gap-1"
          >
            <span 
              className="text-[160px] leading-none text-[#1E6E8C]"
              style={{ fontFamily: "var(--font-dm-serif), 'DM Serif Display', serif" }}
            >
              {displayScore}
            </span>
            <span 
              className="text-5xl text-[#5BA3B8]"
              style={{ fontFamily: "var(--font-dm-serif), 'DM Serif Display', serif" }}
            >
              %
            </span>
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartAgain}
            className="mt-10 px-10 py-3 rounded-xl text-[#1E6E8C] font-medium text-base transition-all"
            style={{
              background: "linear-gradient(89.72deg, #C6E9F7 0.09%, #E5F8FF 99.91%)",
              border: "1px solid #D0E8EF"
            }}
          >
            Start Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-8" style={{
      background: "linear-gradient(180deg, #BECFEE 0%, #71C6E2 25%, #D9F4FA 50%, #BECFEE 100%)"
    }}>
      {/* Outer blur frame */}
      <div 
        className="relative w-full max-w-[1250px] rounded-[48px] p-5"
        style={{
          background: "linear-gradient(180deg, rgba(190, 207, 238, 0.5) 0%, rgba(113, 198, 226, 0.5) 25%, rgba(217, 244, 250, 0.5) 50%, rgba(190, 207, 238, 0.5) 100%)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
        }}
      >
        {/* Inner content card */}
        <div 
          className="relative w-full rounded-[40px] p-12 overflow-visible"
          style={{
            background: "linear-gradient(180deg, rgba(244, 250, 255, 0.95) 0%, rgba(230, 245, 250, 0.95) 50%, rgba(244, 250, 255, 0.95) 100%)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.08)",
            border: "1px solid rgba(150, 229, 255, 0.4)"
          }}
        >
          {isFirstQuestion && (
            <>
              <div className="absolute -left-1 bottom-46 bg-white">
                <div className="relative">
                  <div 
                    className="absolute -top-4 left-1/2 -translate-x-1/2"
                    style={{
                      width: "197px",
                      height: "97px",
                    }}
                  >
                    <img 
                      src="/best_of_luck_image.svg" 
                      alt="" 
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute -left-(-1) -bottom-2">
                <img 
                  src="/cat_paw.gif" 
                  alt="Cat paw" 
                  width={120} 
                  height={140}
                  className="w-[120px] h-[140px] object-contain"
                />
              </div>
            </>
          )}

          <div className="text-center mb-8">
            <h1 
              className="text-[90px] leading-[1.1] tracking-[-4px] mb-6"
              style={{ fontFamily: "var(--font-dm-serif), 'DM Serif Display', serif" }}
            >
              <span className="italic text-[#1E6E8C]">Test Your</span>{" "}
              <span className="italic text-[#71C6E2]">Knowledge</span>
            </h1>
            
            <div 
              className="inline-block px-6 py-2 rounded-full"
              style={{
                background: "linear-gradient(89.72deg, #C6E9F7 0.09%, #E5F8FF 99.91%)",
                border: "1px solid #96E5FF"
              }}
            >
              <span className="text-[#1E6E8C] text-sm font-medium">
                Answer all questions to see your results
              </span>
            </div>
          </div>

          <div className="flex gap-4 justify-center mb-10 px-8">
            {questions.map((_, index) => (
              <div
                key={index}
                className="flex-1 h-1 rounded-full transition-all duration-300"
                style={{
                  background: index <= currentQuestion ? "#1E6E8C" : "#E5E5E5",
                  maxWidth: "180px"
                }}
              />
            ))}
          </div>

          <div className="max-w-[700px] mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div 
                  className="w-full py-5 px-8 rounded-xl mb-4 text-center"
                  style={{
                    background: "linear-gradient(89.72deg, #C6E9F7 0.09%, #E5F8FF 99.91%)",
                    border: "1px solid #96E5FF"
                  }}
                >
                  <span className="text-[#1E6E8C] font-medium text-lg">
                    {currentQuestion + 1}. {questions[currentQuestion].question}
                  </span>
                </div>

                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => {
                    const isSelected = selectedAnswers[currentQuestion] === option;
                    return (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleOptionSelect(option)}
                        className="w-full py-5 px-8 rounded-xl text-center font-medium text-[#1E6E8C] transition-all duration-200"
                        style={{
                          background: isSelected 
                            ? "linear-gradient(89.72deg, #C6E9F7 0.09%, #E5F8FF 99.91%)" 
                            : "white",
                          border: isSelected 
                            ? "1px solid #96E5FF" 
                            : "1px solid #96E5FF"
                        }}
                        aria-pressed={isSelected}
                        role="radio"
                        aria-checked={isSelected}
                      >
                        {option}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-end gap-3 mt-8">
              {!isFirstQuestion && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrev}
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-all"
                  style={{
                    background: "linear-gradient(89.72deg, #C6E9F7 0.09%, #E5F8FF 99.91%)",
                    border: "1px solid #96E5FF"
                  }}
                  aria-label="Previous question"
                >
                  <ChevronLeft className="w-6 h-6 text-[#1E6E8C]" />
                </motion.button>
              )}
              
              {isLastQuestion ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  disabled={Object.keys(selectedAnswers).length !== questions.length}
                  className="px-8 py-3 rounded-xl text-[#1E6E8C] font-medium transition-all disabled:opacity-50"
                  style={{
                    background: "linear-gradient(89.72deg, #C6E9F7 0.09%, #E5F8FF 99.91%)",
                    border: "1px solid #96E5FF"
                  }}
                >
                  Submit
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  disabled={!hasSelectedAnswer}
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-all disabled:opacity-50"
                  style={{
                    background: "linear-gradient(89.72deg, #C6E9F7 0.09%, #E5F8FF 99.91%)",
                    border: "1px solid #96E5FF"
                  }}
                  aria-label="Next question"
                >
                  <ChevronRight className="w-6 h-6 text-[#1E6E8C]" />
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}