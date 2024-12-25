import { Music } from 'lucide-react';

import SongsTable from './SongTable';
import AddSongModal from './AddSongModal';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function SongsTabContent() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Music className="size-5 text-emerald-500" />
              Songs Library
            </CardTitle>

            <CardDescription>Manage your music tracks</CardDescription>
          </div>

          <AddSongModal />
        </div>
      </CardHeader>

      <CardContent>
        <SongsTable />
      </CardContent>
    </Card>
  );
}
