import { useState } from "react";
const App = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const surpriseOptions = [
    "Which country won the latest football world cup?",
    "How many States in America with name and capital?",
    "Who was the first president of the United States?",
    "What is the capital of India?",
    "How many countries in Africa?",
    "Which country has the longest coastline?",
    "What is the longest river in the world?",
    "Which country has the most spoken languages?",
    "What is the highest mountain in the world?",
    "Which country has the highest life expectancy?",
  ];

  const surprise = () => {
    const randomValue =
      surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
    setValue(randomValue);
  };

  const getResponse = async () => {
    if (!value) {
      setError("Please Enter a Prompt");
      return;
    }
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          history: chatHistory,
          message: value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch("http://localhost:8002/gemini", options);
      const data = await response.text();
      setChatHistory((oldChatHistory) => [
        ...oldChatHistory,
        {
          role: "user",
          parts: value,
        },
        {
          role: "model",
          parts: data,
        },
      ]);
      setValue("");
    } catch (error) {
      setError("Something went wrong! Please try again later");
    }
  };

  const clear = () => {
    setChatHistory([]);
    setError("");
    setValue("");
  };
  return (
    <div className="app">
      <h1>🦊Gemini Cloud Vertex AI (Ahmad Bilal) </h1>
      <p>
        If you have not any Prompt or Question? then click the button ➡️!
        <button className="surprise" onClick={surprise} disabled={!chatHistory}>
          Generate Question
        </button>
      </p>
      <div className="input-container">
        <input
          value={value}
          placeholder="Enter a prompt"
          onChange={(e) => setValue(e.target.value)}
        />

        {!error && <button onClick={getResponse}>Ask me</button>}
        {error && <button onClick={clear}>Clear</button>}
      </div>
      {error && <p>{error}</p>}
      <div className="search-result">
        {chatHistory.map((chatItem, _index) => (
          <div key={_index}>
            <p className="answer">
              {chatItem.role}: {chatItem.parts}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default App;
