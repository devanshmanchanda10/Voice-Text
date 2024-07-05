import React, { useEffect, useRef, useState } from "react";

const useSpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);

  const options = {
    interimResults: false,
    lang: "en-US",
    continuous: true,
  };

  useEffect(() => {
    if (
      !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      console.error("Web speech not supported");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechGrammarList =
      window.SpeechGrammarList || window.webkitSpeechGrammarList;

    recognitionRef.current = new SpeechRecognition();
    const recognition = recognitionRef.current;

    recognition.interimResults =
      options.interimResults !== undefined ? options.interimResults : true;
    recognition.lang = options.lang !== undefined ? options.lang : "en-US";
    recognition.continuous =
      options.continuous !== undefined ? options.continuous : false;

    if (SpeechGrammarList) {
      const grammar =
        "#JSGF V1.0; grammar punctuation; public <punc> = . | , | ? | ! | ; | : ;";
      const speechRecognitionList = new SpeechGrammarList();
      speechRecognitionList.addFromString(grammar, 1);
      recognition.grammars = speechRecognitionList;
    }

    recognition.onresult = (event) => {
      let text = "";
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      setTranscript(text);
    };

    recognition.onerror = (event) => {
      console.error("Error in speech recognition:", event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    return () => {
      recognition.stop();
    };
  }, [options.interimResults, options.lang, options.continuous]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
  };
};

export default useSpeechToText;
