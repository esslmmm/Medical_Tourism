"use client";
import React, { useState, useEffect } from "react";
import InterpreterList from "../../../components/user_components/interpreter-page/InterpreterList";
import InterpreterProfile from "../../../components/user_components/interpreter-page/InterpreterProfile";
import InterpreterBio from "../../../components/user_components/interpreter-page/InterpreterBio";
import ReviewSection from "../../../components/user_components/interpreter-page/ReviewSection";
import { Interpreter } from "../../../components/user_components/interpreter-page/types";
import Footer from "../../../components/user_components/Main/Footer";
import Navbar from "../../../components/user_components/Main/Navbar";

// Define a type for reviews
interface Review {
  user: string;
  rating: number;
  comment: string;
  date: string;
}

// Function to generate random ratings & reviews
const getRandomRating = () => (Math.random() * 1.5 + 3.5).toFixed(1);
const getRandomReviews = () => Math.floor(Math.random() * 50) + 10;

// Define base interpreters
const baseInterpreters: Interpreter[] = [
  {
    id: 1,
    name: "Duygu Muhurdar",
    role: "English Interpreter",
    image: "/img/interpreter.png",
    rating: 4.2, // Static value to avoid hydration error
    reviews: 42,
    age: 24,
    deals: 125,
    experience: "5 years",
    country: "UK",
    email: "duygu.mhd@gmail.com",
    bio: "I am Duygu, a music programmer, booking agent, and ethnomusicologist...",
    languages: [
      { name: "English", level: 100 },
      { name: "Thai", level: 80 },
      { name: "Spanish", level: 80 }
    ],
    skills: ["Communications", "Social Skills", "Positive Thinking"],
    education: [
      { institution: "Istanbul Technical University", degree: "MM: Ethnomusicology" },
      { institution: "Bahcesehir University - Istanbul", degree: "Jazz Studies" }
    ]
  },
  ...Array.from({ length: 7 }, (_, i) => ({
    id: i + 2,
    name: `Interpreter ${i + 2}`,
    role: `${["Arabic", "Chinese", "Burmese", "French", "Japanese", "Urdu", "Spanish"][i]} Interpreter`,
    image: "/img/interpreter.png",
    rating: 4.0, // Static value at first to prevent hydration error
    reviews: 30, // Static default value
    age: 25 + i,
    deals: Math.floor(Math.random() * 200) + 50,
    experience: `${Math.floor(Math.random() * 10) + 1} years`,
    country: ["USA", "Canada", "France", "Germany", "Spain", "Japan", "Brazil"][i],
    email: `interpreter${i + 2}@example.com`,
    bio: "Experienced interpreter with expertise in multiple fields including business, medical, and legal translations.",
    languages: [
      { name: "English", level: 90 },
      { name: "Spanish", level: 75 },
      { name: "French", level: 60 }
    ],
    skills: ["Communication", "Accuracy", "Cultural Awareness"],
    education: [
      { institution: "Global Language Institute", degree: "Certified Translator" },
      { institution: "International University", degree: "Linguistics BA" }
    ]
  }))
];

// Client-side function to randomize ratings and reviews **after mounting**
const generateRandomInterpreters = () =>
  baseInterpreters.map((interpreter) => ({
    ...interpreter,
    rating: parseFloat(getRandomRating()), // ✅ Assign random ratings client-side
    reviews: getRandomReviews() // ✅ Assign random reviews client-side
  }));

const randomReviews = (): Review[] =>
  Array.from({ length: 10 }, () => ({
    user: ["Excellent", "Value for Money", "Highly Recommend", "Professional", "Nice", "Great"][Math.floor(Math.random() * 6)],
    rating: parseFloat(getRandomRating()),
    comment: "The interpreter was very professional and made the entire process smooth and easy!",
    date: `Reviewed ${new Date(new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 365))).toDateString()}`
  }));

const UserInterpreterPage: React.FC = () => {
  const [selectedInterpreter, setSelectedInterpreter] = useState<Interpreter>(baseInterpreters[0]);
  const [reviews, setReviews] = useState<Review[]>([]); // ✅ Fixed type
  const [clientInterpreters, setClientInterpreters] = useState<Interpreter[]>(baseInterpreters); // 👈 Hold client-side interpreters

  // Generate random data **only on the client**
  useEffect(() => {
    setClientInterpreters(generateRandomInterpreters()); // ✅ Ensure all interpreters appear
    setReviews(randomReviews()); // ✅ No more type error
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-6xl mx-auto font-sans">
      <InterpreterList
        interpreters={clientInterpreters} // ✅ Now contains all interpreters
        selectedInterpreter={selectedInterpreter}
        setSelectedInterpreter={setSelectedInterpreter}
        setReviews={setReviews}
        generateReviews={randomReviews} // ✅ Pass function to generate reviews
      />
      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        <InterpreterProfile interpreter={selectedInterpreter} />
        <div className="flex-1">
          <InterpreterBio interpreter={selectedInterpreter} />
          <ReviewSection reviews={reviews} />
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserInterpreterPage;
