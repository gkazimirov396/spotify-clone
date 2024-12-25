import axios from '@/lib/axios';

import type { User } from '@/types';

class UserSerive {
  public async fetchUsers() {
    const response = await axios.get<User[]>('/users');

    return response.data;
  }
}

export default new UserSerive();
