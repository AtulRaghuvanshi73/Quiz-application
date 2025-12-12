"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generateQuizQuestions, shuffleOptions, Question } from "@/data/questions";

interface QuestionWithOptions extends Question {
  options: string[];
}

const initializeQuestions = (): QuestionWithOptions[] => {
  const baseQuestions = generateQuizQuestions(4);
  return baseQuestions.map((question) => ({
    ...question,
    options: shuffleOptions(question),
  }));
};

export default function Home() {
  const [questions, setQuestions] = useState<QuestionWithOptions[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    setQuestions(initializeQuestions());
  }, []);

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
    setQuestions(initializeQuestions());
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
  }, [showResults, questions]);

  if (questions.length === 0) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center" style={{
        background: "linear-gradient(180deg, #BECFEE 0%, #71C6E2 25%, #D9F4FA 50%, #BECFEE 100%)"
      }}>
        <div className="text-center">
          <p className="text-white text-lg">Loading questions...</p>
        </div>
      </div>
    );
  }

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
            <span 
              className="text-[#333] font-medium" 
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "16px",
                lineHeight: "10px",
                letterSpacing: "-0.31px",
                textAlign: "center"
              }}
            >
              Keep Learning!
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="text-4xl mb-2 italic text-center"
            style={{ 
              fontFamily: "var(--font-dm-serif), 'DM Serif Display', serif",
              background: "linear-gradient(90deg, #15313D 0%, #3CABDA 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "#15313D"
            }}
          >
            Your Final score is
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
            className="mt-10 px-10 py-3 rounded-xl text-[#1E6E8C] font-medium text-base transition-all block mx-auto"
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
        className="relative w-full max-w-[1250px] rounded-[48px] p-7"
        style={{
          background: "rgba(255, 255, 255, 0.25)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)"
        }}
      >
        {/* Inner content card */}
        <div 
          className="relative w-full rounded-[40px] p-12 overflow-visible"
          style={{
            background: "rgba(255, 255, 255, 0.9)",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.6)"
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
              className="text-[80px] leading-[1.2] tracking-tight mb-6 italic px-4"
              style={{ 
                fontFamily: "var(--font-dm-serif), 'DM Serif Display', serif",
                background: "linear-gradient(90deg, #15313D 0%, #3CABDA 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "#15313D"
              }}
            >
              Test Your Knowledge
            </h1>
            
          <p className="text-[#333] font-medium" style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "16px",
            lineHeight: "10px",
            letterSpacing: "-0.31px",
            textAlign: "center"
          }}>
              Answer all questions to see your results
            </p>
          </div>

          <div className="flex gap-4 justify-center mb-10 px-8">
            {questions.map((_, index) => (
              <motion.div
                key={index}
                initial={{ width: "180px" }}
                animate={{ width: index <= currentQuestion ? "180px" : "180px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="transition-all duration-300 relative"
                style={{
                  height: "0px",
                  opacity: 1
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "0px",
                    borderTop: index <= currentQuestion ? "8px solid #1E6E8C" : "8px solid #E5E5E5",
                    borderRadius: "4px",
                    transition: "all 0.6s ease-out"
                  }}
                />
              </motion.div>
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
                  <span className="text-black font-medium text-lg">
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
                        className="w-full py-5 px-8 rounded-xl text-center font-medium text-black transition-all duration-200"
                        style={{
                          background: isSelected 
                            ? "linear-gradient(89.72deg, #C6E9F7 0.09%, #E5F8FF 99.91%)" 
                            : "linear-gradient(89.72deg, rgba(198, 233, 247, 0.1) 0.09%, rgba(229, 248, 255, 0.1) 99.91%)",
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
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrev}
                disabled={isFirstQuestion}
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-all disabled:opacity-50"
                style={{
                  background: "linear-gradient(89.72deg, #C6E9F7 0.09%, #E5F8FF 99.91%)",
                  border: "1px solid #96E5FF"
                }}
                aria-label="Previous question"
              >
                <img 
                  src="/arrow_forward.svg" 
                  alt="" 
                  className="w-6 h-6"
                  style={{ transform: "scaleX(-1)" }}
                />
              </motion.button>
              
              {isLastQuestion ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  disabled={Object.keys(selectedAnswers).length !== questions.length}
                  className="px-8 py-3 rounded-xl text-black font-medium transition-all disabled:opacity-50"
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
                  <img 
                    src="/arrow_forward.svg" 
                    alt="" 
                    className="w-6 h-6"
                  />
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}