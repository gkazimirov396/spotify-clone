import toast from 'react-hot-toast';

import axios, { formDataHeaders } from '@/lib/axios';

import type { Song } from '@/types';

class SongService {
  public async getSongs() {
    const response = await axios.get<Song[]>('/songs');

    return response.data;
  }

  public async getTrendingSongs() {
    const response = await axios.get<Song[]>('/songs/trending');

    return response.data;
  }

  public async getMadeForYouSongs() {
    const response = await axios.get<Song[]>('/songs/made-for-you');

    return response.data;
  }

  public async getFeaturedSongs() {
    const response = await axios.get<Song[]>('/songs/featured');

    return response.data;
  }

  public async createSong(data: FormData) {
    const response = await axios.post('/admin/songs', data, {
      headers: formDataHeaders,
    });

    return response.data;
  }

  public async deleteSong(id: string) {
    try {
      const result = await axios.delete<{ success: boolean }>(
        `/admin/songs/${id}`
      );

      if (!result.data.success) {
        throw new Error('Song not deleted');
      }

      toast.success('Song deleted successfully');
    } catch (error) {
      console.error('Error deleting song:', error);

      toast.error('Error deleting song');
    }
  }
}

export default new SongService();
