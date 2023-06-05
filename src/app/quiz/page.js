"use client";
import Link from "next/link";
import { questions } from "../../../public/questions";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchString, setSearchString] = useState("");

  const handleAnswerOption = (answer, keywords) => {
    keywords = keywords || "";
    setSelectedOptions([
      (selectedOptions[currentQuestion] = { userResponse: answer, keywords: keywords }),
    ]);
    setSelectedOptions([...selectedOptions]);

    let search = "";
    for (let i = 0; i < selectedOptions.length; i++) {
      search += selectedOptions[i].keywords + " ";
    }
    setSearchString(search);
  };

  const handlePrevious = () => {
    const prevQues = currentQuestion - 1;
    prevQues >= 0 && setCurrentQuestion(prevQues);
  };

  const handleNext = () => {
    if (!selectedOptions[currentQuestion]?.userResponse) {
      toast.error("Choose an Option!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    const nextQues = currentQuestion + 1;
    nextQues < questions.length && setCurrentQuestion(nextQues);
  };

  return (
    <main className="flex flex-col w-screen px-2 sm:px-5 h-screen bg-gray-900 justify-center items-center">
      <div className="bg-gray-900 p-8 sm:p-20 m-2 sm:m-5 rounded-xl">
        <div className="flex flex-col items-center w-full">
          <h4 className="mt-4 sm:mt-10 text-lg sm:text-xl text-white text-center">
            Question {currentQuestion + 1} of {questions.length}
          </h4>
          <div className="mt-2 sm:mt-4 text-lg sm:text-2xl text-white text-center">
            {questions[currentQuestion].question}
          </div>
        </div>

        <div className="flex flex-col w-full mt-4">
          {questions[currentQuestion].answerOptions.map((answer, index) => (
            <div
              key={index}
              className="flex items-center w-full py-2 sm:py-4 pl-3 sm:pl-5 my-2 sm:my-2 ml-0 space-x-2 border-2 cursor-pointer bg-gray-800 border-white/10 rounded-xl"
              onClick={(e) => handleAnswerOption(answer.answer, answer.keywords)}
            >
              <input
                type="radio"
                name={answer.answer}
                value={answer.answer}
                onChange={(e) => handleAnswerOption(answer.answer, answer.keywords)}
                checked={answer.answer === selectedOptions[currentQuestion]?.userResponse}
                className="w-4 h-4 sm:w-6 sm:h-6 bg-black"
              />
              <p className="ml-4 sm:ml-6 text-sm sm:text-base text-white">
                {answer.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between w-full mt-4">
          <button
            onClick={handlePrevious}
            className="w-full sm:w-[49%] py-2 sm:py-3 bg-blue-500 text-white rounded-lg mb-2 sm:mb-0"
          >
            Previous
          </button>
          {currentQuestion + 1 === questions.length ? (
            <Link
              href={{
                pathname: "/results",
                query: { search : searchString },
              }}
              className="w-full sm:w-[49%] py-2 sm:py-3 bg-blue-500 text-white rounded-lg text-center"
            >
              <button>Submit</button>
            </Link>
          ) : (
            <button
              onClick={handleNext}
              className="w-full sm:w-[49%] py-2 sm:py-3 bg-blue-500 text-white rounded-lg"
            >
              Next
            </button>
          )}
        </div>
       {searchString.length > 10 && currentQuestion > 3 ? (
        <div className="flex flex-col sm:flex-row justify-center w-full mt-20">
          <Link
            href={{
              pathname: "/results",
              query: { search : searchString },
            }}
            className="w-full sm:w-[25%] py-2 sm:py-3 bg-blue-500 text-white rounded-lg text-center"
          >
            <button>Get Results Now!</button>
          </Link>
        </div>
       ) : (
          <div className="flex flex-col sm:flex-row justify-center w-full mt-20 p-3"></div>
       )}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        limit={2}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </main>
  );
}