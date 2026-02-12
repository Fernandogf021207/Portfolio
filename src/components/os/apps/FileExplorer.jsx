import React, { useState } from 'react';
import { Window, WindowHeader, WindowContent, Button, Toolbar, Cutout } from 'react95';
import { Folder, FileText, Computer3, CdMusic } from '@react95/icons';
import { projectFiles } from '../../../data/fileSystem';

const FileExplorer = ({ onClose, onOpenFile }) => {
  const [currentPath, setCurrentPath] = useState('root');
  const [history, setHistory] = useState(['root']);

  const handleNavigate = (path) => {
    setCurrentPath(path);
    setHistory([...history, path]);
  };

  const handleUp = () => {
    if (currentPath === 'root') return;
    // Simple logic for 1 level deep
    setCurrentPath('root');
  };

  const handleItemClick = (item) => {
    if (item.type === 'folder') {
      handleNavigate(item.id);
    } else if (item.type === 'file') {
      onOpenFile(item.contentId);
    } else if (item.type === 'executable') {
      if (item.link) window.open(item.link, '_blank');
    }
  };

  const currentItems = projectFiles[currentPath] || [];

  return (
    <Window className="window" style={{ width: 600, height: 400, position: 'absolute', top: '10%', left: '15%', zIndex: 105 }}>
      <WindowHeader className="window-title flex justify-between items-center">
        <span>Exploring - C:\Projects\{currentPath === 'root' ? '' : currentPath}</span>
        <Button size='sm' square onClick={onClose}>
          <span style={{ fontWeight: 'bold', transform: 'translateY(-1px)' }}>x</span>
        </Button>
      </WindowHeader>
      
      <Toolbar>
        <Button variant="menu" size="sm">File</Button>
        <Button variant="menu" size="sm">Edit</Button>
        <Button variant="menu" size="sm">View</Button>
        <Button variant="menu" size="sm">Help</Button>
      </Toolbar>

      <div className="px-2 pb-2 flex gap-2 items-center">
         <span className="text-sm">Address:</span>
         <Cutout className="flex-1 bg-white p-1 text-sm">
            C:\Projects\{currentPath === 'root' ? '' : currentPath}
         </Cutout>
         <Button onClick={handleUp} disabled={currentPath === 'root'}>Up</Button>
      </div>

      <WindowContent style={{ height: 'calc(100% - 110px)' }}>
        <Cutout className="bg-white h-full overflow-auto p-4">
           <div className="grid grid-cols-4 gap-4">
              {currentItems.map((item) => (
                <div 
                  key={item.id} 
                  className="flex flex-col items-center cursor-pointer hover:bg-blue-800 hover:text-white p-2 border border-transparent hover:border-dotted hover:border-white group"
                  onDoubleClick={() => handleItemClick(item)}
                >
                  <div className="mb-1">
                    {item.type === 'folder' && <Folder variant="32x32_4" />}
                    {item.type === 'file' && <FileText variant="32x32_4" />}
                    {item.type === 'executable' && <Computer3 variant="32x32_4" />}
                    {item.type === 'image' && <CdMusic variant="32x32_4" />}
                  </div>
                  <span className="text-xs text-center break-words w-full">{item.name}</span>
                </div>
              ))}
              {currentItems.length === 0 && (
                  <div className="col-span-4 text-center text-gray-500 mt-4">
                      (Empty Folder)
                  </div>
              )}
           </div>
        </Cutout>
      </WindowContent>
      
      <div className="h-6 border-t border-gray-400 flex items-center px-2 text-xs gap-4 bg-[#c0c0c0]">
         <span>{currentItems.length} object(s)</span>
      </div>
    </Window>
  );
};

export default FileExplorer;
