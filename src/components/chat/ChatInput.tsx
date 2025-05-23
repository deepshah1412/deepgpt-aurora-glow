
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import TextareaAutosize from 'react-textarea-autosize';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form 
    
      onSubmit={handleSubmit}
      className="border border-border bg-background rounded-lg shadow-sm flex items-end p-2"
    >
      <TextareaAutosize
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Message DeepGPT..."
        className="flex-1 resize-none border-0 bg-transparent focus:ring-0 focus-visible:ring-0 focus-visible:outline-none max-h-[200px] p-2"
        maxRows={6}
        disabled={disabled}
      />
      <Button 
        type="submit" 
        size="icon" 
        className="bg-deepgpt-500 hover:bg-deepgpt-600 text-white rounded-lg h-10 w-10 flex-shrink-0 ml-2"
        disabled={!message.trim() || disabled}
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default ChatInput;
