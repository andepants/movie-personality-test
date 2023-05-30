'use client';
import Link from 'next/link'
import { questions } from '../../../public/questions'
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Quiz() {

  const [ currentQuestion, setCurrentQuestion ] = useState(0);
  const [ selectedOptions, setSelectedOptions ] = useState([]);
  const [ searchString, setSearchString ] = useState('');

  const handleAnswerOption = (answer) => {
    setSelectedOptions([
      (selectedOptions[currentQuestion] = { userResponse: answer }),
    ]);
    setSelectedOptions([...selectedOptions]);
    let search = '';
    for (let i = 0; i < selectedOptions.length; i++) {
      search += selectedOptions[i].userResponse + ' ';
    }
    setSearchString(search);
  };

  const handlePrevious = () => {
    const prevQues = currentQuestion - 1;
    prevQues >= 0 && setCurrentQuestion(prevQues);
  };

  const handleNext = () => {
    if (!selectedOptions[currentQuestion]?.userResponse) {
      toast.error('Choose an Option!', {
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
    <main className="flex flex-col w-screen px-5 h-screen bg-darkblue justify-center items-center">
      <div className="bg-darkblue p-20 m-5 rounded-xl">
        <div className="flex flex-col items-start w-full">
          <h4 className="mt-10 text-xl text-lightblue">
            Question {currentQuestion + 1} of {questions.length}
          </h4>
          <div className="mt-4 text-2xl text-offwhite">
          {questions[currentQuestion].question}
          </div>
        </div>

        <div className="flex flex-col w-full">
          {questions[currentQuestion].answerOptions.map((answer, index) => (
            <div
              key={index}
              className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer bg-white/5 border-white/10 rounded-xl"
              onClick={(e) => handleAnswerOption(answer.answer)}
            >
              <input
                type="radio"
                name={answer.answer}
                value={answer.answer}
                onChange={(e) => handleAnswerOption(answer.answer)}
                checked={
                  answer.answer === selectedOptions[currentQuestion]?.userResponse
                }
                className="w-6 h-6 bg-black"
              />
              <p className="ml-6 text-offwhite">{answer.answer}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between w-full mt-4 text-offwhite">
          <button
            onClick={handlePrevious}
            className="w-[49%] py-3 bg-pink rounded-lg"
          >
            Previous
          </button>
          {currentQuestion + 1 === questions.length
            ? <Link
                href={{
                  pathname: '/results',
                  query: searchString,
                }}
                className="w-[49%] py-3 bg-pink rounded-lg text-center"
              >
                <button>Submit</button>
              </Link>
            : <button
                onClick={handleNext}
                className="w-[49%] py-3 bg-pink rounded-lg"
              >
                Next
              </button>
          }
        </div>
      </div>
      <Link href='/' className="flex justify-center">
        <button className="px-4 m-2 py-2 rounded bg-blue-500 text-white font-bold">
          Home
        </button>
      </Link>
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
  )
}