"use client";
import React, { useState, useEffect, useRef } from "react";
import { marked } from "marked";
import "./Chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const chatWindowRef = useRef(null);

  // Replace with your actual server's IP/URL
  const apiUrl = "http://192.168.2.235:55441/api/v0/chat/completions";
  const model = "phi-4";

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Add user message to chat
    const newMessages = [...messages, { role: "user", content: input, timestamp }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    // Prepare for streaming response
    const assistantMessage = {
      role: "assistant",
      content: "",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages([...newMessages, assistantMessage]);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: model,
          messages: newMessages,
          temperature: 0.7,
          max_tokens: 200,
          stream: true,
        }),
      });

      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;

        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n").filter((line) => line.startsWith("data: "));

          for (const line of lines) {
            const json = line.slice(6); // Remove "data: "
            if (json.trim() === "[DONE]") {
              done = true;
              break;
            }

            const parsed = JSON.parse(json);
            const delta = parsed.choices[0]?.delta?.content || "";

            assistantMessage.content += delta;
            setMessages([...newMessages, { ...assistantMessage }]);
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Error: Unable to fetch response.", timestamp },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`chat-container ${darkMode ? "dark-mode" : ""}`}>
      <div className="chat-header">
        <h1>Chat with LMStudio</h1>
        <button onClick={toggleDarkMode} className="dark-mode-toggle">
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <div id="chat-window" ref={chatWindowRef} className="chat-window">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.role === "user"
                ? "chat-bubble user-bubble"
                : "chat-bubble assistant-bubble"
            }
          >
            <div
              dangerouslySetInnerHTML={{
                __html:
                  msg.role === "assistant" ? marked(msg.content) : msg.content,
              }}
            />
            <div className="chat-bubble-timestamp">{msg.timestamp}</div>
          </div>
        ))}
        {loading && (
          <div className="chat-bubble assistant-bubble typing-indicator">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        )}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chat;
