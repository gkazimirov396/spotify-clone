import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Calendar, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

import songService from '@/services/song';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function SongTable() {
  const queryClient = useQueryClient();

  const {
    data: songs,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery({ queryKey: ['songs'], queryFn: songService.getSongs });

  const { mutate: deleteSong } = useMutation({
    mutationFn: songService.deleteSong,
    onError: error => toast(error.message),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['songs'] }),
  });

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-zinc-800/50">
          <TableHead className="w-[50px]"></TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Artist</TableHead>
          <TableHead>Release Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="text-zinc-400">Loading songs...</div>
          </div>
        )}
        {isError && (
          <div className="flex items-center justify-center py-8">
            <div className="text-red-400">{error.message}</div>
          </div>
        )}
        {isSuccess &&
          songs.map(song => (
            <TableRow
              key={song._id}
              className="text-black hover:bg-zinc-800/50"
            >
              <TableCell>
                <img
                  src={song.imageUrl}
                  alt={song.title}
                  className="object-cover rounded size-10"
                />
              </TableCell>

              <TableCell className="font-medium">{song.title}</TableCell>
              <TableCell>{song.artist}</TableCell>

              <TableCell>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {song.recordedAt.split('T')[0]}
                </span>
              </TableCell>

              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                    onClick={() => deleteSong(song._id)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
