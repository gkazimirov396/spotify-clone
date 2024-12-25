import axios from '@/lib/axios';

import type { Stats } from '@/types';

class StatService {
  public async getStats() {
    const response = await axios.get<Stats>('/stats');

    return response.data;
  }
}

export default new StatService();
