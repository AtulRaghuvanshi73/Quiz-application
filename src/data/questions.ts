export interface Question {
  id: number;
  question: string;
  correctAnswer: string;
}

export const questionsBank: Question[] = [
  {
    id: 1,
    question: "What sound does a cat make?",
    correctAnswer: "Meow-Meow",
  },
  {
    id: 2,
    question: "What would you probably find in your fridge?",
    correctAnswer: "Ice Cream",
  },
  {
    id: 3,
    question: "What color are bananas?",
    correctAnswer: "Yellow",
  },
  {
    id: 4,
    question: "How many stars are in the sky?",
    correctAnswer: "Infinite",
  },
  {
    id: 5,
    question: "What is the capital of France?",
    correctAnswer: "Paris",
  },
  {
    id: 6,
    question: "What is 2 + 2?",
    correctAnswer: "4",
  },
  {
    id: 7,
    question: "What color is the sky on a clear day?",
    correctAnswer: "Blue",
  },
  {
    id: 8,
    question: "How many legs does a spider have?",
    correctAnswer: "Eight",
  },
  {
    id: 9,
    question: "What is the largest planet in our solar system?",
    correctAnswer: "Jupiter",
  },
  {
    id: 10,
    question: "What do bees make?",
    correctAnswer: "Honey",
  },
  {
    id: 11,
    question: "What is the opposite of hot?",
    correctAnswer: "Cold",
  },
  {
    id: 12,
    question: "How many continents are there?",
    correctAnswer: "Seven",
  },
  {
    id: 13,
    question: "What is the smallest unit of life?",
    correctAnswer: "Cell",
  },
  {
    id: 14,
    question: "What gas do plants need to survive?",
    correctAnswer: "Carbon Dioxide",
  },
  {
    id: 15,
    question: "What is the freezing point of water in Celsius?",
    correctAnswer: "Zero",
  },
  {
    id: 16,
    question: "What color do you get when you mix red and blue?",
    correctAnswer: "Purple",
  },
  {
    id: 17,
    question: "How many sides does a triangle have?",
    correctAnswer: "Three",
  },
  {
    id: 18,
    question: "What is the main ingredient in guacamole?",
    correctAnswer: "Avocado",
  },
  {
    id: 19,
    question: "What animal is known as the 'king of the jungle'?",
    correctAnswer: "Lion",
  },
  {
    id: 20,
    question: "What is the largest ocean on Earth?",
    correctAnswer: "Pacific Ocean",
  },
  {
    id: 21,
    question: "What metal does a magnet attract?",
    correctAnswer: "Iron",
  },
  {
    id: 22,
    question: "What do caterpillars transform into?",
    correctAnswer: "Butterfly",
  },
  {
    id: 23,
    question: "What is the capital of Japan?",
    correctAnswer: "Tokyo",
  },
  {
    id: 24,
    question: "How many letters are in the alphabet?",
    correctAnswer: "Twenty-Six",
  },
  {
    id: 25,
    question: "What is the fastest land animal?",
    correctAnswer: "Cheetah",
  },
  {
    id: 26,
    question: "What do you call a person who studies rocks?",
    correctAnswer: "Geologist",
  },
  {
    id: 27,
    question: "What is the chemical symbol for gold?",
    correctAnswer: "Au",
  },
  {
    id: 28,
    question: "How many strings does a violin have?",
    correctAnswer: "Four",
  },
  {
    id: 29,
    question: "What is the tallest mountain in the world?",
    correctAnswer: "Mount Everest",
  },
  {
    id: 30,
    question: "What do plants use sunlight to make?",
    correctAnswer: "Food",
  },
  {
    id: 31,
    question: "What is the capital of Italy?",
    correctAnswer: "Rome",
  },
  {
    id: 32,
    question: "What animal has the longest neck?",
    correctAnswer: "Giraffe",
  },
  {
    id: 33,
    question: "How many bones are in the human body?",
    correctAnswer: "206",
  },
  {
    id: 34,
    question: "What is the main gas in the Earth's atmosphere?",
    correctAnswer: "Nitrogen",
  },
  {
    id: 35,
    question: "What is the capital of Spain?",
    correctAnswer: "Madrid",
  },
  {
    id: 36,
    question: "What color is a ripe strawberry?",
    correctAnswer: "Red",
  },
  {
    id: 37,
    question: "What animal lays eggs and is a mammal?",
    correctAnswer: "Platypus",
  },
  {
    id: 38,
    question: "What is the boiling point of water in Celsius?",
    correctAnswer: "100",
  },
  {
    id: 39,
    question: "How many sides does a hexagon have?",
    correctAnswer: "Six",
  },
  {
    id: 40,
    question: "What is the capital of Brazil?",
    correctAnswer: "Brasília",
  },
  {
    id: 41,
    question: "What do you call a baby kangaroo?",
    correctAnswer: "Joey",
  },
  {
    id: 42,
    question: "What is the chemical symbol for water?",
    correctAnswer: "H2O",
  },
  {
    id: 43,
    question: "What animal is known for its ability to change colors?",
    correctAnswer: "Chameleon",
  },
  {
    id: 44,
    question: "What is the capital of Germany?",
    correctAnswer: "Berlin",
  },
  {
    id: 45,
    question: "How many seconds are in a minute?",
    correctAnswer: "60",
  },
  {
    id: 46,
    question: "What do you call a group of flamingos?",
    correctAnswer: "Flamboyance",
  },
  {
    id: 47,
    question: "What is the deepest ocean trench?",
    correctAnswer: "Mariana Trench",
  },
  {
    id: 48,
    question: "What animal is the fastest swimmer?",
    correctAnswer: "Sailfish",
  },
  {
    id: 49,
    question: "What is the capital of Canada?",
    correctAnswer: "Ottawa",
  },
  {
    id: 50,
    question: "What is the most spoken language in the world?",
    correctAnswer: "Mandarin Chinese",
  },
];

export const generateQuizQuestions = (count: number = 4) => {
  const shuffled = [...questionsBank].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export const shuffleOptions = (question: Question) => {
  const allAnswers = questionsBank.map((q) => q.correctAnswer);
  const otherAnswers = allAnswers.filter(
    (answer) => answer !== question.correctAnswer
  );
  const shuffledOthers = otherAnswers.sort(() => Math.random() - 0.5).slice(0, 2);
  const options = [question.correctAnswer, ...shuffledOthers].sort(
    () => Math.random() - 0.5
  );
  return options;
};
