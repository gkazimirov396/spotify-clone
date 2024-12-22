import axios from '@/lib/axios';

interface NewUser {
  id: string;
  userName: string;
  imageUrl: string;
}

class AuthService {
  public async checkAdminStatus() {
    const response = await axios.get<{ admin: boolean }>('/admin/check');

    return response.data.admin;
  }

  public async login(user: NewUser) {
    const response = await axios.post<{ success: true }>(
      '/auth/callback',
      user
    );

    return response.data;
  }
}

export default new AuthService();
