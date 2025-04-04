"use client";

import { useState } from "react";
import { getChatResponse, generateImage } from "./apiService";

export default function Home() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("chat"); // "chat" or "image"
  const [image, setImage] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [imageInput, setImageInput] = useState("");

  const handleSubmit = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    
    if (activeTab === "chat") {
      // Save user message to history
      const newUserMessage = { role: "user", content: input };
      setChatHistory((prev) => [...prev, newUserMessage]);
      
      const chatReply = await getChatResponse(input);
      
      // Save assistant response to history
      const newAssistantMessage = { role: "assistant", content: chatReply };
      setChatHistory((prev) => [...prev, newAssistantMessage]);
      setResponse(chatReply);
    } else {
      setImageInput(input);
      const imageData = await generateImage(input);
      setImage(imageData);
      
      // Save image generation to history
      setChatHistory((prev) => [
        ...prev, 
        { role: "user", content: `Generated image: ${input}` }
      ]);
    }
    
    setInput("");
    setIsLoading(false);
  };

  const startNewConversation = () => {
    setChatHistory([]);
    setResponse("");
    setImage(null);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-gray-900 text-white transition-all duration-300 ${sidebarOpen ? "w-64" : "w-20"}`}>
        <div className="p-4 flex items-center justify-between">
          <h2 className={`font-bold text-xl ${!sidebarOpen && "hidden"}`}>AI Assistant</h2>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="p-2 rounded hover:bg-gray-700"
          >
            {sidebarOpen ? "←" : "→"}
          </button>
        </div>
        
        <div className="px-4 py-2">
          <button 
            onClick={startNewConversation} 
            className="flex items-center space-x-2 w-full p-2 rounded bg-blue-600 hover:bg-blue-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            {sidebarOpen && <span>New Conversation</span>}
          </button>
        </div>
        
        <div className="mt-6 px-4">
          {sidebarOpen && <h3 className="text-sm font-medium text-gray-400 mb-2">Recent Conversations</h3>}
          <ul className="space-y-2">
            {sidebarOpen && chatHistory.length === 0 && (
              <li className="text-sm text-gray-400 italic">No recent conversations</li>
            )}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">AI Assistant Dashboard</h1>
          
          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg">
            <button 
              className={`px-4 py-2 rounded-md transition-colors ${activeTab === "chat" ? "bg-white text-gray-900 shadow" : "text-gray-700 hover:bg-gray-300"}`}
              onClick={() => {
                setActiveTab("chat");
                window.location.reload();
              }}
            >
              Chat
            </button>
            <button 
              className={`px-4 py-2 rounded-md transition-colors ${activeTab === "image" ? "bg-white text-gray-900 shadow" : "text-gray-700 hover:bg-gray-300"}`}
              onClick={() => {setActiveTab("image");}}
            >
              Image
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto bg-gray-50">
          <div className="max-w-4xl mx-auto">
            {activeTab === "chat" && (
              <div className="space-y-6">
                {chatHistory.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg max-w-3xl ${
                      msg.role === "user" 
                        ? "bg-blue-100 text-gray-800 ml-auto" 
                        : "bg-white border border-gray-200 shadow-sm"
                    } ${
                      msg.role != "user" 
                        ? "bg-blue-100 text-gray-800 ml-auto" 
                        : "bg-white border border-gray-200 shadow-sm"
                    }`}
                  >
                    <p className="text-sm font-medium mb-1">
                      {msg.role === "user" ? "You" : "AI Assistant"}
                    </p>
                    <div className="whitespace-pre-wrap">
                      {msg.content}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      <span className="text-gray-500">AI is thinking...</span>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === "image" && (
              <div className="flex flex-col items-center">
                {image && (
                  <div className="mt-6 border border-gray-200 rounded-lg overflow-hidden shadow-lg bg-white p-4">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Generated Image</h3>
                    <img 
                      src={image} // Use the full data URI directly from backend
                      alt="AI Generated" 
                      className="max-w-full max-h-96 object-contain" 
                    />
                    <p className="mt-2 text-sm text-gray-500 italic">
                      Prompt: {imageInput}
                    </p>
                  </div>
                )}
                
                {isLoading && (
                  <div className="mt-6 bg-white p-6 rounded-lg border border-gray-200 shadow flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-600">Generating your image...</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>

        {/* Input Area */}
        <footer className="bg-white border-t border-gray-200 p-4">
          <div className="max-w-4xl mx-auto flex">
            <div className="relative flex-1">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={activeTab === "chat" ? "Type your message..." : "Describe the image you want to generate..."}
                className="w-full p-3 pr-20 border text-black border-gray-300 rounded-lg resize-none h-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="1"
              />
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="absolute right-2 top-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 mr-2 rounded-md disabled:bg-blue-400"
              >
                {isLoading ? "..." : "Send"}
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}