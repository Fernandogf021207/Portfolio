import React, { useState } from 'react';

const MsnChatWindow = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { user: 'Fernando', text: 'Welcome to my 1999 portfolio!', time: '10:00:00 PM' },
    { user: 'Fernando', text: 'Feel free to look around.', time: '10:00:05 PM' },
    { user: 'Fernando', text: 'I am currently Online.', time: '10:00:10 PM' }
  ]);

  const handleSend = () => {
    if (message.trim()) {
      setChatHistory([...chatHistory, { user: 'Guest', text: message, time: new Date().toLocaleTimeString() }]);
      setMessage('');
    }
  };

  return (
    <div className="w-full h-full bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-gray-600 border-b-gray-600 flex flex-col p-1 font-sans select-none">
      
      {/* Title Bar (Simulated if needed, but usually provided by window manager. Adding internal header as requested) */}
      
      {/* Menu Bar */}
      <div className="flex px-1 py-0.5 space-x-2 text-sm text-black">
        <span className="cursor-pointer hover:underline underline-offset-2">File</span>
        <span className="cursor-pointer hover:underline underline-offset-2">Edit</span>
        <span className="cursor-pointer hover:underline underline-offset-2">View</span>
        <span className="cursor-pointer hover:underline underline-offset-2">Tools</span>
        <span className="cursor-pointer hover:underline underline-offset-2">Help</span>
      </div>

      {/* Toolbar / User Info */}
      <div className="flex items-center px-2 py-2 border-t border-white border-b border-gray-400 mb-1 gap-3">
        {/* User Icon Placeholder */}
        <div className="w-8 h-8 bg-gray-300 border border-gray-500 shadow-sm flex items-center justify-center">
            <span className="text-xs text-gray-500">IMG</span>
        </div>
        
        <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1">
                <span className="font-bold text-black text-sm">Fernando</span>
                <span className="text-xs text-gray-600">(Online)</span>
            </div>
            <div className="text-[10px] text-gray-500 italic">
                &lt;Developer Mode&gt;
            </div>
        </div>
      </div>

      {/* Main Conversation Area */}
      <div className="flex-1 bg-white border-2 border-l-gray-600 border-t-gray-600 border-r-white border-b-white overflow-y-auto p-2 mb-2 font-['MS_Sans_Serif',_'Tahoma',_sans-serif]">
        {chatHistory.map((msg, index) => (
          <div key={index} className="mb-2 text-sm leading-tight">
            <div className="text-gray-500 mb-0.5">
              {msg.user} says:
            </div>
            <div className={`pl-2 ${msg.user === 'Fernando' ? 'text-black' : 'text-blue-800'}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="h-16 flex gap-1 mb-1">
        {/* Text Area */}
        <div className="flex-1 bg-white border-2 border-l-gray-600 border-t-gray-600 border-r-white border-b-white p-0.5">
            <textarea 
                className="w-full h-full resize-none border-none outline-none text-sm p-1 font-['MS_Sans_Serif',_'Tahoma',_sans-serif]"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                    }
                }}
            />
        </div>

        {/* Send Button */}
        <div className="w-16 flex flex-col justify-start">
            <button 
                onClick={handleSend}
                className="w-full h-10 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-gray-600 border-b-gray-600 active:border-t-gray-600 active:border-l-gray-600 active:border-r-white active:border-b-white flex items-center justify-center text-sm active:bg-gray-300"
            >
                Send
            </button>
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-5 border-t border-gray-400 flex items-center px-1 text-xs text-gray-600">
        Last message received at {new Date().toLocaleTimeString()}
      </div>

    </div>
  );
};

export default MsnChatWindow;
