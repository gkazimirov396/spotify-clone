import { Outlet } from 'react-router-dom';

import useMediaQuery from '@/hooks/useMediaQuery';

import LeftSidebar from './components/LeftSidebar';
import AudioPlayer from './components/AudioPlayer';
import FriendsActivity from './components/FriendsActivity';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../ui/resizable';

export default function RootLayout() {
  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  return (
    <main className="flex flex-col h-screen text-white bg-black">
      <ResizablePanelGroup
        direction="horizontal"
        className="flex flex-1 h-full p-2 overflow-hidden"
      >
        <AudioPlayer />

        <ResizablePanel
          defaultSize={20}
          minSize={isSmallScreen ? 0 : 10}
          maxSize={30}
        >
          <LeftSidebar />
        </ResizablePanel>

        <ResizableHandle className="w-2 transition-colors bg-black rounded-lg" />

        <ResizablePanel defaultSize={isSmallScreen ? 80 : 60}>
          <Outlet />
        </ResizablePanel>

        {!isSmallScreen && (
          <>
            <ResizableHandle className="w-2 transition-colors bg-black rounded-lg" />

            <ResizablePanel
              defaultSize={20}
              minSize={0}
              maxSize={25}
              collapsedSize={0}
            >
              <FriendsActivity />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </main>
  );
}
