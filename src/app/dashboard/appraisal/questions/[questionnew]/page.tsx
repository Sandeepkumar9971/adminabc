"use client";

import React, { useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import BACK from "@/components/backbutton";

interface Question {
  heading: string;
  options: string[];
}

export default function QuizCreator() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    heading: "",
    options: ["", "", "", ""],
  });

  const handleHeadingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentQuestion((prev) => ({ ...prev, heading: e.target.value }));
  };

  const handleOptionChange = (index: number, value: string) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      options: prev.options.map((opt, i) => (i === index ? value : opt)),
    }));
  };

  const addQuestion = () => {
    if (
      currentQuestion.heading &&
      currentQuestion.options.every((opt) => opt)
    ) {
      setQuestions((prev) => [...prev, currentQuestion]);
      setCurrentQuestion({ heading: "", options: ["", "", "", ""] });
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <DefaultLayout>
      <BACK />
      <div className="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
         

          <div className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="question"
              >
                Question Heading
              </label>
              <input
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="question"
                type="text"
                placeholder="Enter question heading"
                value={currentQuestion.heading}
                onChange={handleHeadingChange}
              />
            </div>

            {currentQuestion.options.map((option, index) => (
              <div key={index} className="mb-4">
                <label
                  className="mb-2 block text-sm font-bold text-gray-700"
                  htmlFor={`option${index + 1}`}
                >
                  Option {index + 1}
                </label>
                <input
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  id={`option${index + 1}`}
                  type="text"
                  placeholder={`Enter option ${index + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
              </div>
            ))}

            <div className="flex items-center justify-between">
              <button
                className="focus:shadow-outline rounded bg-primary px-4 py-2 font-bold text-white focus:outline-none"
                type="button"
                onClick={addQuestion}
              >
                Add Question
              </button>
            </div>
          </div>
          {/* Pending Part */}
          <div className="mt-8">
            <h2 className="mb-4 text-2xl font-bold">Created Questions</h2>
            {questions.map((q, index) => (
              <div
                key={index}
                className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
              >
                <h3 className="mb-2 text-xl font-bold">{q.heading}</h3>
                <ul className="list-disc pl-5">
                  {q.options.map((opt, optIndex) => (
                    <li key={optIndex} className="mb-1">
                      {opt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
