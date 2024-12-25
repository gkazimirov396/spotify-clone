import { FormEvent, useRef, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import albumService from '@/services/album';
import songService from '@/services/song';
import toast from 'react-hot-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus, Upload } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Files {
  audio: File | null;
  image: File | null;
}

export default function AddSongModal() {
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [files, setFiles] = useState<Files>({
    audio: null,
    image: null,
  });

  const audioInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const { data: albums, isSuccess } = useQuery({
    queryKey: ['albums'],
    queryFn: albumService.getAlbums,
  });

  const { mutateAsync: createSong, isPending } = useMutation({
    mutationFn: songService.createSong,
    onError: error => toast.error(error.message),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['songs'] }),
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!files.audio || !files.image) {
        return toast.error('Please upload both audio and image files');
      }

      const formData = new FormData(event.currentTarget);

      const albumId = formData.get('albumId');

      if (albumId === 'none') {
        formData.delete('albumId');
      }

      formData.append('audioFile', files.audio);
      formData.append('imageFile', files.image);

      await createSong(formData);

      setIsModalOpen(false);
      setFiles({
        audio: null,
        image: null,
      });

      toast.success('Song created successfully');
    } catch (error) {
      console.error(error);
      // toast.error('Failed to create album: ' + error.message);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button className="text-black bg-emerald-500 hover:bg-emerald-600">
          <Plus className="w-4 h-4 mr-2" />
          Add Song
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-zinc-900 border-zinc-700 max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Add New Song</DialogTitle>

          <DialogDescription>
            Add a new song to your music library
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="py-4 space-y-4">
            <input
              type="file"
              accept="audio/*"
              ref={audioInputRef}
              hidden
              onChange={e =>
                setFiles(prev => ({ ...prev, audio: e.target.files![0] }))
              }
            />

            <input
              type="file"
              ref={imageInputRef}
              className="hidden"
              accept="image/*"
              hidden
              onChange={e =>
                setFiles(prev => ({ ...prev, image: e.target.files![0] }))
              }
            />

            <div
              className="flex items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer border-zinc-700"
              onClick={() => imageInputRef.current?.click()}
            >
              <div className="text-center">
                {files.image ? (
                  <div className="space-y-2">
                    <div className="text-sm text-emerald-500">
                      Image selected:
                    </div>

                    <div className="text-xs text-zinc-400">
                      {files.image.name.slice(0, 20)}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="inline-block p-3 mb-2 rounded-full bg-zinc-800">
                      <Upload className="w-6 h-6 text-zinc-400" />
                    </div>

                    <div className="mb-2 text-sm text-zinc-400">
                      Upload artwork
                    </div>

                    <Button variant="outline" size="sm" className="text-xs">
                      Choose File
                    </Button>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Audio File</Label>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => audioInputRef.current?.click()}
                  className="w-full"
                >
                  {files.audio
                    ? files.audio.name.slice(0, 20)
                    : 'Choose Audio File'}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                className="bg-zinc-800 border-zinc-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="artist" className="text-sm font-medium">
                Artist
              </Label>
              <Input
                id="artist"
                name="artist"
                className="bg-zinc-800 border-zinc-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration" className="text-sm font-medium">
                Duration (seconds)
              </Label>
              <Input
                type="number"
                min={0}
                id="duration"
                name="duration"
                className="bg-zinc-800 border-zinc-700"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Album (Optional)</Label>
              <Select name="albumId">
                <SelectTrigger className="bg-zinc-800 border-zinc-700">
                  <SelectValue placeholder="Select album" />
                </SelectTrigger>

                <SelectContent className="bg-zinc-800 border-zinc-700">
                  <SelectItem value="none">No Album (Single)</SelectItem>
                  {isSuccess &&
                    albums.map(album => (
                      <SelectItem key={album._id} value={album._id}>
                        {album.title}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsModalOpen(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button disabled={isPending}>
            {isPending ? 'Uploading...' : 'Add Song'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
