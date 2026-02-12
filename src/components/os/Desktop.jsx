import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';
import { Button, Window, WindowHeader, WindowContent, AppBar, Toolbar, Separator } from 'react95';
import { RecycleFull, Network3, Mail, Msnstart1 } from '@react95/icons';
import useOSStore from '../../store/useOSStore';
import DesktopIcon from './DesktopIcon';
import MsnChatWindow from './MsnChatWindow';
import FileExplorer from './apps/FileExplorer';
import WordPad from './apps/WordPad';
import { fileContents } from '../../data/fileSystem';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.desktopBackground};
  color: ${({ theme }) => theme.materialText};
  position: relative;
  overflow: hidden;
`;

export default function Desktop() {
  const windows = useOSStore((state) => state.windows);
  const toggleWindow = useOSStore((state) => state.toggleWindow);
  const [welcomeOpen, setWelcomeOpen] = useState(true);
  const [explorerOpen, setExplorerOpen] = useState(false);
  const [openDocument, setOpenDocument] = useState(null);

  const handleOpenFile = (contentId) => {
    setOpenDocument(contentId);
  };

  return (
    <ThemeProvider theme={original}>
      <Wrapper>
        {/* Desktop Icons Grid */}
        <div className="absolute top-4 left-4 flex flex-col items-start gap-4 z-10">
          <DesktopIcon 
            label="Fernando" 
            icon={<Msnstart1 variant="32x32_4" />} 
            onDoubleClick={() => toggleWindow('about', true)} 
          />
          <DesktopIcon 
            label="Projects" 
            icon={<Network3 variant="32x32_4" />} 
            onDoubleClick={() => setExplorerOpen(true)} 
          />
          <DesktopIcon 
            label="Mail" 
            icon={<Mail variant="32x32_4" />} 
            onDoubleClick={() => toggleWindow('contact', true)} 
          />
          <DesktopIcon 
            label="Recycle Bin" 
            icon={<RecycleFull variant="32x32_4" />} 
            onDoubleClick={() => console.log("Trash is empty")} 
          />
        </div>

        {/* Taskbar */}
        <div className="absolute bottom-0 left-0 w-full z-50">
          <AppBar style={{ position: 'relative' }}>
            <Toolbar style={{ justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Button style={{ fontWeight: 'bold' }}>
                   Start
                </Button>
                {/* Active Windows on Taskbar could go here */}
              </div>
              <div style={{ paddingRight: '10px' }}>12:00 PM</div>
            </Toolbar>
          </AppBar>
        </div>

        {/* ---------------- WINDOWS ---------------- */}

        {/* Welcome Window */}
        {welcomeOpen && (
          <Window className='window' style={{ width: 400, position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, 0)', zIndex: 100 }}>
            <WindowHeader className='window-title flex justify-between items-center'>
              <span>Welcome.exe</span>
              <Button size='sm' square onClick={() => setWelcomeOpen(false)}>
                <span style={{ fontWeight: 'bold', transform: 'translateY(-1px)' }}>x</span>
              </Button>
            </WindowHeader>
            <WindowContent>
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                  <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Fernando's Portfolio</h1>
                  <p>Dev System // v1.0.0</p>
                  <Separator />
                  <p style={{ marginTop: '1rem' }}>Double click the icons to explore.</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button onClick={() => setWelcomeOpen(false)}>OK</Button>
              </div>
            </WindowContent>
          </Window>
        )}

        {/* About Window (MSN Conversation) */}
        {windows.about && (
          <Window className="window" style={{ width: 500, height: 480, position: 'absolute', top: '10%', left: '20%', zIndex: 101 }}>
            <WindowHeader className="window-title flex justify-between items-center">
              <span>Fernando - Conversation</span>
              <Button size='sm' square onClick={() => toggleWindow('about', false)}>
                <span style={{ fontWeight: 'bold', transform: 'translateY(-1px)' }}>x</span>
              </Button>
            </WindowHeader>
            <WindowContent style={{ padding: 0, height: 'calc(100% - 35px)' }}>
              <MsnChatWindow />
            </WindowContent>
          </Window>
        )}

        {/* Contact Window */}
        {windows.contact && (
          <Window className="window" style={{ width: 350, position: 'absolute', top: '30%', left: '40%', zIndex: 103 }}>
            <WindowHeader className="window-title flex justify-between items-center">
              <span>Mail - Compose</span>
              <Button size='sm' square onClick={() => toggleWindow('contact', false)}>
                <span style={{ fontWeight: 'bold', transform: 'translateY(-1px)' }}>x</span>
              </Button>
            </WindowHeader>
            <WindowContent>
               <div className="flex flex-col gap-2">
                 <label>To: Fernando</label>
                 <input type="text" className="border p-1 font-mono w-full" placeholder="Subject..." />
                 <textarea className="border p-1 font-mono w-full h-32" placeholder="Write your message..."></textarea>
                 <Button>Send Email</Button>
               </div>
            </WindowContent>
          </Window>
        )}

        {/* File Explorer (Projects) */}
        {explorerOpen && (
          <FileExplorer 
            onClose={() => setExplorerOpen(false)} 
            onOpenFile={handleOpenFile} 
          />
        )}

        {/* WordPad (Document Viewer) */}
        {openDocument && (
          <WordPad 
            content={fileContents[openDocument]} 
            onClose={() => setOpenDocument(null)} 
          />
        )}

      </Wrapper>
    </ThemeProvider>
  );
}
