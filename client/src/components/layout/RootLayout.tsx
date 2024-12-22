import { Outlet } from 'react-router-dom';

import useMediaQuery from '@/hooks/useMediaQuery';

import { ResizablePanel } from '../ui/resizable';

export default function RootLayout() {
  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  return (
    <main className="flex flex-col h-screen text-white bg-black">
      <ResizablePanel defaultSize={isSmallScreen ? 80 : 60}>
        <Outlet />
      </ResizablePanel>
    </main>
  );
}
