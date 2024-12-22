import axios from '@/lib/axios';

class StatService {
  public async getStats() {
    const response = await axios.get('/stats');

    return response.data;
  }
}

export default new StatService();
