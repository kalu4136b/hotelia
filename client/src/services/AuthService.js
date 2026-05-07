import api from './ApiService';

class AuthService {
  async login(userId, password) {
    try {
      const response = await api.post('/auth/login', { userId, password });
      const { accessToken, refreshToken, userId: returnedId } = response.data;
      
      this.saveSession(accessToken, refreshToken, returnedId);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Login failed';
    }
  }

  saveSession(accessToken, refreshToken, userId) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('userId', userId);
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
  }

  isAuthenticated() {
    return !!localStorage.getItem('accessToken');
  }

  getUserId() {
    return localStorage.getItem('userId');
  }
}

export default new AuthService();
