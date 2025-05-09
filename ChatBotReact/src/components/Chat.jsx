import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCallback } from "react";

const microphoneIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
   className="fill-indigo-500 hover:fill-indigo-700 active:fill-indigo-800 transition-colors duration-200"
    viewBox="0 0 256 256"
  >
    <path d="M128,176a48.05,48.05,0,0,0,48-48V64a48,48,0,0,0-96,0v64A48.05,48.05,0,0,0,128,176ZM96,64a32,32,0,0,1,64,0v64a32,32,0,0,1-64,0Zm40,143.6V240a8,8,0,0,1-16,0V207.6A80.11,80.11,0,0,1,48,128a8,8,0,0,1,16,0,64,64,0,0,0,128,0,8,8,0,0,1,16,0A80.11,80.11,0,0,1,136,207.6Z"></path>
  </svg>
);

const sendMessageIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
   className="fill-indigo-500 hover:fill-indigo-700 active:fill-indigo-800 transition-colors duration-200"
    viewBox="0 0 256 256"
  >
    <path d="M231.87,114l-168-95.89A16,16,0,0,0,40.92,37.34L71.55,128,40.92,218.67A16,16,0,0,0,56,240a16.15,16.15,0,0,0,7.93-2.1l167.92-96.05a16,16,0,0,0,.05-27.89ZM56,224a.56.56,0,0,0,0-.12L85.74,136H144a8,8,0,0,0,0-16H85.74L56.06,32.16A.46.46,0,0,0,56,32l168,95.83Z"></path>
  </svg>
);

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const chatEndRef = useRef(null);
  const hasRun = useRef(false);

  const location = useLocation();
  const initialMessage = location.state?.initialMessage || "";

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  const sendMessage = useCallback(
    async (userInput) => {
      if (!userInput.trim()) return;

      const userMessage = { sender: "You", text: userInput };
      setMessages((prev) => [...prev, userMessage]);

      const typingMessage = { sender: "Bot", text: "", isTyping: true };
      setMessages((prev) => [...prev, typingMessage]);

      setUserInput("");

      try {
        const response = await fetch("https://localhost:7251/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userInput }),
        });

        const data = await response.json();
        const botMessage = { sender: "Bot", text: data.response };

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = botMessage;
          return updated;
        });

      
      } catch (error) {
        console.error(error);
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            sender: "Bot",
            text: "Failed to fetch response.",
          };
          return updated;
        });
      }
    },
    [setMessages, setUserInput]
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage(userInput);
    }
  };

  useEffect(() => {
    if (initialMessage && !hasRun.current) {
      sendMessage(initialMessage);
      hasRun.current = true;
    }
  }, [initialMessage, sendMessage]);

  const startVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported by your browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;

    recognition.start();

    recognition.onresult = (event) => {
      const last = event.results.length - 1;
      const speechToText = event.results[last][0].transcript;
      setUserInput(speechToText);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event);
    };
  };
   return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Animated background elements */}
      <div className="fixed -z-10 w-full h-full overflow-hidden">
        <div className={`absolute top-1/4 -left-20 w-96 h-96 rounded-full blur-3xl opacity-10 transition-all duration-700 ${isHovering ? 'bg-indigo-400 scale-110' : 'bg-indigo-300'}`}></div>
        <div className={`absolute bottom-1/4 -right-20 w-96 h-96 rounded-full blur-3xl opacity-10 transition-all duration-700 ${isHovering ? 'bg-purple-400 scale-110' : 'bg-purple-300'}`}></div>
      </div>

      <div className="max-w-md mx-auto pt-10 pb-20 px-4">
        {/* Chat container */}
        <div 
          className="h-[calc(100vh-180px)] border border-gray-200 p-4 overflow-y-scroll rounded-xl bg-white/80 backdrop-blur-sm shadow-lg"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "You" ? "justify-end" : "justify-start"
              } mb-3`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-xs break-words transition-all ${
                  msg.sender === "You"
                    ? "bg-indigo-600 text-white rounded-br-none hover:shadow-md hover:-translate-y-0.5"
                    : "bg-gray-100 text-gray-800 rounded-bl-none hover:shadow-sm"
                }`}
              >
                {msg.isTyping ? <TypingDots /> : msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input area */}
        <div 
          className="flex mt-4 border border-gray-200 rounded-xl p-2 bg-white/80 backdrop-blur-sm shadow-lg transition-all hover:shadow-xl"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-grow p-2 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
          />
          <button 
            onClick={startVoiceInput} 
            className="p-2 text-indigo-500 hover:text-indigo-700 transition-colors"
            aria-label="Voice input"
          >
            {microphoneIcon}
          </button>
          <button 
            onClick={() => sendMessage(userInput)}
            className="p-2 text-indigo-500 hover:text-indigo-700 transition-colors"
            aria-label="Send message"
          >
            {sendMessageIcon}
          </button>
        </div>
      </div>
    </div>
  );
};


// Typing dots animation component
const TypingDots = () => {
  return (
    <div className="flex space-x-1">
      <div
        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
        style={{ animationDelay: "0s" }}
      ></div>
      <div
        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
        style={{ animationDelay: "0.2s" }}
      ></div>
      <div
        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
        style={{ animationDelay: "0.4s" }}
      ></div>
    </div>
  );
};

export default ChatComponent;