import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState("");

  const handleButtonClick = (e) => {
    e.preventDefault();  
    navigate('/chat', {state: {initialMessage: userInput}}); // Navigate to the /chat page
  };

  function handleInputChange(e) {
    setUserInput(e.target.value); // Update the userInput state with the input value
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-start">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="fixed inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
      <div className="items-start mt-24">
        <h1 className="font-sans text-5xl font-semibold tracking-tighter text-gray-900 sm:text-7xl pb-4">
          Welcome to ChatBot App
        </h1>
        <p className="font-sans text-lg   font-medium text-pretty text-gray-500 sm:text-xl/8">
          Chat with our AI-powered assistant and get instant answers to your
          questions.
        </p>
        <form action="#" method="post" className="pt-8 flex gap-x-4">
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            className="w-80 border border-gray-200 p-2 rounded-md focus:outline-none"
            placeholder="Enter text here"
          />
          <button onClick={handleButtonClick}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Get started
          </button>
        </form>
      </div>
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>
    </section>
  );
}
