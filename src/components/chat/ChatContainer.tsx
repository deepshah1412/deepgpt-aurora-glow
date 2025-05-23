
import React, { useState, useRef, useEffect } from 'react';
import ChatMessage, { ChatMessageProps } from './ChatMessage';
import ChatInput from './ChatInput';
import { Loader2 } from 'lucide-react';

const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageProps[]>([
    {
      role: 'ai',
      content: 'Hello! I\'m DeepGPT, an advanced AI assistant. How can I help you today?'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: ChatMessageProps = {
      role: 'user',
      content,
      timestamp: new Date()
    };
  
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
  
    try {
      // Make API call to Flask
      const response = await fetch("http://127.0.0.1:5000/mcp_client", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question: content })
      });
  
      if (!response.ok) {
        throw new Error("Failed to get response from server.");
      }
  
      const data = await response.json();
      const aiMessage: ChatMessageProps = {
        role: 'ai',
        content: data.answer || "I'm sorry, I couldn't understand that.",
        timestamp: new Date()
      };
  
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
      const aiMessage: ChatMessageProps = {
        role: 'ai',
        content: "There was an error processing your request. Please try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4 pb-4">
          {messages.map((message, index) => (
            <ChatMessage 
              key={index} 
              role={message.role} 
              content={message.content} 
              timestamp={message.timestamp} 
            />
          ))}
          
          {isLoading && (
            <div className="flex justify-center items-center py-4">
              <Loader2 className="h-6 w-6 text-deepgpt-500 animate-spin" />
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="p-4 border-t border-border">
        <ChatInput 
          onSendMessage={handleSendMessage} 
          disabled={isLoading} 
        />
      </div>
    </div>
  );
};

export default ChatContainer;
