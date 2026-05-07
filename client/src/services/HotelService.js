import api from './ApiService';

class HotelService {
  async getHotels() {
    try {
      const response = await api.get('/hotels');
      return response.data.hotels;
    } catch (error) {
      throw error.response?.data?.error || 'Unable to load hotels';
    }
  }

  async getHealth() {
    return api.get('/health');
  }
}

export default new HotelService();
