"use client";
import { url } from "@/contexts/AuthContext";
import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";

export type ChatMessage = UIMessage<unknown, any>;

export default function ChatAssistant() {
  const [input, setInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { messages, sendMessage, status, error } = useChat<ChatMessage>({
    transport: new DefaultChatTransport({
      api: `${url}chat`,
    }),
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input.trim()) return;
    const pageContent =
      document.getElementById("main-content")?.innerText || "";

    sendMessage({
      text: input,
      metadata: {
      currentUrl: window.location.href,
      pageContextText: pageContent 
    }
    });
    setInput("");
  };

  return (
    <div className="border border-solid bg-white flex flex-col w-full max-w-md py-0 mx-auto stretch gap-4">
      {error && (
        <div className="text-xs p-2 bg-red-50 border border-red-200 text-red-600 rounded">
          {errorMessage}
        </div>
      )}

      <div className="flex-1 space-y-4 overflow-y-auto mb-4 border p-4 rounded bg-gray-50 min-h-[300px] max-h-[300px]">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`whitespace-pre-wrap ${message.role === "user" ? "text-blue-600" : "text-gray-800"}`}
          >
            <strong>{message.role === "user" ? "User: " : "AI: "}</strong>

            {message.parts.map((part, index) => {
              if (part.type === "text") {
                return <span key={index}>{part.text}</span>;
              }

              return null;
            })}
          </div>
        ))}
      </div>

      <div className="text-xs text-gray-500">
        Status: <span className="font-semibold">{status}</span>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="flex-1 p-2 border border-gray-300 rounded text-black"
          value={input}
          placeholder="Ask a question..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Send
        </button>
      </form>
    </div>
  );
}
