import { Album, Music } from 'lucide-react';

import AdminHeader from './components/AdminHeader';
import DashboardStats from './components/DashboardStats';
import SongsTabContent from './components/Song/SongsTabContent';
import AlbumsTabContent from './components/Album/AlbumsTabContent';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AdminPage() {
  return (
    <section className="min-h-screen p-8 bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-zinc-100">
      <AdminHeader />

      <DashboardStats />

      <Tabs defaultValue="songs" className="space-y-6">
        <TabsList className="p-1 bg-zinc-800/50">
          <TabsTrigger
            value="songs"
            className="data-[state=active]:bg-zinc-700"
          >
            <Music className="mr-2 size-4" />
            Songs
          </TabsTrigger>

          <TabsTrigger
            value="albums"
            className="data-[state=active]:bg-zinc-700"
          >
            <Album className="mr-2 size-4" />
            Albums
          </TabsTrigger>
        </TabsList>

        <TabsContent value="songs">
          <SongsTabContent />
        </TabsContent>

        <TabsContent value="albums">
          <AlbumsTabContent />
        </TabsContent>
      </Tabs>
    </section>
  );
}
