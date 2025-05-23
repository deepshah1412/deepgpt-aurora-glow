
import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import ChatContainer from '@/components/chat/ChatContainer';

const Index = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 flex flex-col h-full">
        <div className="border-b border-border py-2 px-4">
          <h2 className="text-lg font-medium">Introduction to DeepGPT</h2>
        </div>
        
        <div className="w-full flex justify-center flex-1 bg-muted">
          <div className="max-w-3xl w-full flex flex-col flex-1">
            <ChatContainer />
          </div>
      </div>
      </main>
    </div>
  );
};

export default Index;
