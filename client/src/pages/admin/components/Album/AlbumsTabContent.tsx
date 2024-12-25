import { Library } from 'lucide-react';

import AlbumsTable from './AlbumsTable';
import AddAlbumModal from './AddAlbumModal';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function AlbumsTabContent() {
  return (
    <Card className="bg-zinc-800/50 border-zinc-700/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Library className="w-5 h-5 text-violet-500" />
              <span className="text-white">Albums Library</span>
            </CardTitle>

            <CardDescription>Manage your album collection</CardDescription>
          </div>

          <AddAlbumModal />
        </div>
      </CardHeader>

      <CardContent>
        <AlbumsTable />
      </CardContent>
    </Card>
  );
}
