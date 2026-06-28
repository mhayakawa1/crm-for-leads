"use client";
import { url } from "@/contexts/AuthContext";
import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { DefaultButton } from "./DefaultButton";
import { LocaleRouteNormalizer } from "next/dist/server/normalizers/locale-route-normalizer";

export type ChatMessage = UIMessage<unknown, any>;

export default function ChatAssistant() {
  const [input, setInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const getAccessToken = () => localStorage.getItem("accessToken") || "";

  const { messages, sendMessage, status, error } = useChat<ChatMessage>({
    transport: new DefaultChatTransport({
      api: `${url}chat`,
      headers: () => ({
        Authorization: `Bearer ${getAccessToken()}`,
      }),
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
        pageContextText: pageContent,
      },
    });
    setInput("");
  };

  return (
    <div className="px-2 pb-2 flex flex-col w-full max-w-md  gap-4 box-border">
      {error && (
        <div className="text-xs p-2 bg-red-50 border border-red-200 text-red-600 rounded">
          {errorMessage}
        </div>
      )}
      <div className="flex-1 space-y-4 overflow-y-auto p-4 rounded min-h-[300px] max-h-[300px] box-border">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`w-[90%] whitespace-pre-wrap p-2 rounded-lg ${message.role === "user" ? "bg-gray-200 ml-auto" : "bg-gray-100 mr-auto"}`}
          >
            <strong>{message.role === "user" ? "You: " : "Assistant: "}</strong>

            {message.parts.map((part, index) => {
              if (part.type === "text") {
                return <span key={index}>{part.text}</span>;
              }

              return null;
            })}
          </div>
        ))}
        {status === "submitted" ? <p>Loading...</p> : null}
      </div>
      <div className="text-xs text-gray-500">
        Status: <span className="font-semibold">{status}</span>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="flex-1 p-2 border border-gray-300 rounded text-black h-8 focus:outline-none focus:ring-0"
          value={input}
          placeholder="Ask a question..."
          onChange={(event) => setInput(event.target.value)}
        />
        <DefaultButton>Send</DefaultButton>
      </form>
    </div>
  );
}
