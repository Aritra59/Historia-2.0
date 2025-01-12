import React, { useState } from "react";
import { gsap } from "gsap";

const CuriousMindAsk = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle the answer visibility
  };

  const questions = [
    { id: 1, question: "What kind of stories do you share?", answer: "We share stories about history, culture, and personal experiences." },
    { id: 2, question: "How can I contribute my story?", answer: "You can contribute by filling out the story submission form on our website." },
    { id: 3, question: "Is this site for serious historians?", answer: "No, it’s for anyone curious about history or culture." },
    { id: 4, question: "Can I submit photos?", answer: "Yes, we encourage photo submissions to complement stories." },
    { id: 5, question: "Are there any age restrictions?", answer: "There are no age restrictions, anyone can participate!" },
    { id: 6, question: "How often do you update stories?", answer: "We update stories on a weekly basis to keep the content fresh." },
  ];

  return (
    <div className="relative py-12 px-6 h-auto flex flex-col md:flex-row md:items-start gap-6">
      {/* Left Top Title */}
      <div className="md:w-1/4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <span className="mr-2 text-black">●</span> Curious Minds Ask
        </h2>
      </div>

      {/* FAQ Section */}
      <div className="w-full md:w-3/4 bg-white rounded-lg shadow-2xl p-6">
        {questions.map((item, index) => (
          <div key={item.id} className="border-b border-gray-300 overflow-hidden">
            {/* Question Header */}
            <div
              className="flex justify-between items-center py-4 cursor-pointer hover:text-blue-600 transition-colors"
              onClick={() => toggleAnswer(index)}
            >
              <h3 className="text-lg font-semibold text-gray-800">{item.question}</h3>
              <span
                className={`text-gray-500 transform transition-transform ${
                  activeIndex === index ? "rotate-90" : "rotate-0"
                }`}
              >
                ▶
              </span>
            </div>

            {/* Answer */}
            <div
              className={`overflow-hidden transition-all duration-500 ${
                activeIndex === index ? "max-h-48 p-4" : "max-h-0"
              }`}
            >
              <p className="text-gray-700 text-sm">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CuriousMindAsk;

