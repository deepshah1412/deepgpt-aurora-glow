
import React from 'react';
import { cn } from "@/lib/utils";
import { User, Bot } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type MessageRole = 'user' | 'ai';

export interface ChatMessageProps {
  role: MessageRole;
  content: string;
  timestamp?: Date;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ role, content, timestamp = new Date() }) => {
  const isUser = role === 'user';
  
  return (
    <div
      className={cn(
        "flex items-start gap-4 max-w-3xl mx-auto py-2 animate-fade-in",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <Avatar className={cn("h-8 w-8", isUser ? "bg-deepgpt-400" : "bg-white border border-deepgpt-200")}>
        <AvatarFallback className={isUser ? "bg-deepgpt-400 text-white" : "bg-white text-deepgpt-600"}>
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>
      
      <div className={cn(
        "flex-1",
        isUser ? "chat-message-user" : "chat-message-ai"
      )}>
        <div className="whitespace-pre-wrap">{content}</div>
        <div className={cn(
          "text-xs mt-2",
          isUser ? "text-white/70" : "text-muted-foreground"
        )}>
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
