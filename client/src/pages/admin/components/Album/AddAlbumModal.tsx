import { ChangeEvent, FormEvent, useRef, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

import albumService from '@/services/album';

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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AddAlbumModal() {
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutateAsync: createAlbum, isPending } = useMutation({
    mutationFn: albumService.createAlbum,
    onError: error => toast.error(error.message),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['albums'] }),
  });

  const handleSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!imageFile) {
        return toast.error('Please upload an image.');
      }

      const formData = new FormData(event.currentTarget);

      formData.append('imageFile', imageFile);

      await createAlbum(formData);

      setImageFile(null);
      setIsModalOpen(false);

      toast.success('Album created successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button className="text-white bg-violet-500 hover:bg-violet-600">
          <Plus className="w-4 h-4 mr-2" />
          Add Album
        </Button>
      </DialogTrigger>

      <DialogContent className="text-white bg-zinc-900 border-zinc-700">
        <DialogHeader>
          <DialogTitle>Add New Album</DialogTitle>

          <DialogDescription>
            Add a new album to your collection
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="py-4 space-y-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleSelectImage}
              accept="image/*"
              className="hidden"
            />

            <div
              className="flex items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer border-zinc-700"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="text-center">
                <div className="inline-block p-3 mb-2 rounded-full bg-zinc-800">
                  <Upload className="w-6 h-6 text-zinc-400" />
                </div>

                <div className="mb-2 text-sm text-zinc-400">
                  {imageFile ? imageFile.name : 'Upload album artwork'}
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs text-black"
                >
                  Choose File
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Album Title
              </Label>
              <Input
                id="title"
                name="title"
                className="bg-zinc-800 border-zinc-700"
                placeholder="Enter album title"
                minLength={3}
                required
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
                placeholder="Enter artist name"
                minLength={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="releaseYear" className="text-sm font-medium">
                Release Year
              </Label>
              <Input
                type="number"
                id="releaseYear"
                name="releaseYear"
                className="bg-zinc-800 border-zinc-700"
                placeholder="Enter release year"
                min={1889}
                step={1}
                max={new Date().getFullYear()}
                defaultValue={new Date().getFullYear()}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              className="text-black"
              onClick={() => setIsModalOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="bg-violet-500 hover:bg-violet-600"
              disabled={isPending || !imageFile}
            >
              {isPending ? 'Creating...' : 'Add Album'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
