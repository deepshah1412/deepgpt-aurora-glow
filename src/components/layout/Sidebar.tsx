
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus, MessageSquare, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatSession {
  id: string;
  title: string;
  date: Date;
}

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    { id: '1', title: 'Introduction to DeepGPT', date: new Date() },
    { id: '2', title: 'Help me with React', date: new Date(Date.now() - 86400000) },
    { id: '3', title: 'Explain quantum computing', date: new Date(Date.now() - 172800000) },
  ]);
  const [activeChat, setActiveChat] = useState<string>('1');
  
  const handleNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      title: 'New Chat',
      date: new Date(),
    };
    setChatSessions([newChat, ...chatSessions]);
    setActiveChat(newChat.id);
  };

  return (
    <div 
      className={cn(
        "flex flex-col h-screen bg-sidebar transition-all duration-300 border-r border-sidebar-border relative",
        isCollapsed ? "w-[60px]" : "w-[260px]"
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && (
          <h1 className="text-xl font-bold text-white">DeepGPT</h1>
        )}
        <Button 
          variant="ghost" 
          size="icon"
          className="absolute -right-3 top-6 h-6 w-6 rounded-full border border-sidebar-border bg-background text-foreground shadow-md"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </Button>
      </div>
      
      <div className="px-3 mb-4">
        <Button 
          className="w-full bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground justify-start gap-2"
          onClick={handleNewChat}
        >
          <Plus size={16} />
          {!isCollapsed && <span>New Chat</span>}
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto px-1">
        <div className="space-y-1">
          {chatSessions.map((chat) => (
            <button
              key={chat.id}
              className={cn(
                "sidebar-item w-full text-left truncate",
                activeChat === chat.id && "sidebar-item-active"
              )}
              onClick={() => setActiveChat(chat.id)}
            >
              <MessageSquare size={isCollapsed ? 20 : 16} />
              {!isCollapsed && (
                <span className="truncate">{chat.title}</span>
              )}
            </button>
          ))}
        </div>
      </div>
      
      <div className="p-3 border-t border-sidebar-border mt-auto">
        <button className="sidebar-item w-full">
          <Settings size={isCollapsed ? 20 : 16} />
          {!isCollapsed && <span>Settings</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
