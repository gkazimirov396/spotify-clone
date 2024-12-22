import toast from 'react-hot-toast';

import axios from '@/lib/axios';

class SongService {
  public async getSongs() {
    const response = await axios.get('/songs');

    return response.data;
  }

  public async getTrendingSongs() {
    const response = await axios.get('/songs/trending');

    return response.data;
  }

  public async getMadeForYouSongs() {
    const response = await axios.get('/songs/made-for-you');

    return response.data;
  }

  public async getFeaturedSongs() {
    const response = await axios.get('/songs/featured');

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
