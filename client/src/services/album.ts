import toast from 'react-hot-toast';

import axios from '@/lib/axios';

class AlbumService {
  public async getAlbums() {
    const response = await axios.get('/albums');

    return response.data;
  }

  public async getAlbumById(id: string) {
    const response = await axios.get(`/albums/${id}`);

    return response.data;
  }

  public async deleteAlbum(id: string) {
    try {
      const result = await axios.delete<{ success: boolean }>(
        `/admin/albums/${id}`
      );

      if (!result.data.success) {
        throw new Error('Album not deleted');
      }

      toast.success('Album deleted successfully');
    } catch (error) {
      console.error('Error deleting album:', error);

      toast.error('Error deleting album');
    }
  }
}

export default new AlbumService();
