import React, { useState } from "react";
import "./App.css";
import useSpeechToText from "./hooks/useSpeechToText";

const App = () => {
  const [text, setText] = useState("");
  const { isListening, transcript, startListening, stopListening } =
    useSpeechToText({ continuous: true });

  const startStopListening = () => {
    isListening ? stopVoiceInput() : startListening();
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleClear = () => {
    setText("");
  };

  const stopVoiceInput = () => {
    setText((prevVal) => prevVal + transcript);
    stopListening();
  };

  return (
    <>
      <button onClick={startStopListening}>
        {isListening ? "Stop" : "Start"}
      </button>
      <div className="container">
        <h2>Creative Text Box</h2>
        <div className="text-box-wrapper">
          <textarea
            className="text-box"
            placeholder="Write something..."
            disabled={isListening}
            value={isListening ? text + transcript : text}
            onChange={handleChange}
            maxLength={200}
          />
          <button className="clear-button" onClick={handleClear}>
            Clear
          </button>
        </div>
        <div className="char-count">{text.length} / 200</div>
      </div>
    </>
  );
};

export default App;
