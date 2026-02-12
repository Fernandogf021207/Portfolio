import React from 'react';
import { Window, WindowHeader, WindowContent, Button, Toolbar, Cutout } from 'react95';
import { Print, FilePen } from '@react95/icons';

const WordPad = ({ content, onClose }) => {
  if (!content) return null;

  return (
    <Window className="window" style={{ width: 500, height: 400, position: 'absolute', top: '15%', left: '25%', zIndex: 200 }}>
      <WindowHeader className="window-title flex justify-between items-center">
        <span>WordPad - {content.title}</span>
        <Button size='sm' square onClick={onClose}>
          <span style={{ fontWeight: 'bold', transform: 'translateY(-1px)' }}>x</span>
        </Button>
      </WindowHeader>
      
      <Toolbar>
        <Button variant="menu" size="sm">File</Button>
        <Button variant="menu" size="sm">Edit</Button>
        <Button variant="menu" size="sm">View</Button>
        <Button variant="flat" size="sm" disabled><Print variant="16x16_4" /></Button>
        <Button variant="flat" size="sm" disabled><FilePen variant="16x16_4" /></Button>
      </Toolbar>

      <WindowContent style={{ height: 'calc(100% - 90px)' }}>
        <Cutout className="bg-white h-full overflow-auto p-4 font-serif">
          <h1 className="text-2xl font-bold mb-4 border-b-2 border-black pb-1">{content.title}</h1>
          
          {content.image && (
             <div className="mb-4 bg-gray-200 border border-gray-400 p-2 text-center text-xs text-gray-500">
               [Image: {content.image}]
             </div>
          )}
          
          <p className="whitespace-pre-wrap leading-relaxed">{content.body}</p>
        </Cutout>
      </WindowContent>
    </Window>
  );
};

export default WordPad;
