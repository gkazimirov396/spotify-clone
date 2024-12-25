import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Calendar, Music, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

import albumService from '@/services/album';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function AlbumsTable() {
  const queryClient = useQueryClient();

  const { data: albums, isSuccess } = useQuery({
    queryKey: ['albums'],
    queryFn: albumService.getAlbums,
  });

  const { mutate: deleteAlbum } = useMutation({
    mutationFn: albumService.deleteAlbum,
    onError: error => toast(error.message),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['albums'] }),
  });

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-zinc-800/50">
          <TableHead className="w-[50px]"></TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Artist</TableHead>
          <TableHead>Release Year</TableHead>
          <TableHead>Songs</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {isSuccess &&
          albums.map(album => (
            <TableRow key={album._id} className="hover:bg-zinc-800/50">
              <TableCell>
                <img
                  src={album.imageUrl}
                  alt={album.title}
                  className="object-cover w-10 h-10 rounded"
                />
              </TableCell>

              <TableCell className="font-medium">{album.title}</TableCell>
              <TableCell>{album.artist}</TableCell>

              <TableCell>
                <span className="inline-flex items-center gap-1 text-zinc-400">
                  <Calendar className="w-4 h-4" />
                  {album.releaseYear}
                </span>
              </TableCell>

              <TableCell>
                <span className="inline-flex items-center gap-1 text-zinc-400">
                  <Music className="w-4 h-4" />
                  {album.songs.length} songs
                </span>
              </TableCell>

              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteAlbum(album._id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
