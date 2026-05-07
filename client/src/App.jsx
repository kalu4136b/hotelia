import { useEffect, useState } from 'react';
import authService from './services/AuthService';
import hotelService from './services/HotelService';
import './App.css';

function App() {
  const [userId, setUserId] = useState('user-1');
  const [password, setPassword] = useState('');
  const [accessToken, setAccessToken] = useState(authService.isAuthenticated());
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (accessToken) {
      loadDashboardData();
    }
  }, [accessToken]);

  async function loadDashboardData() {
    setLoading(true);
    try {
      const hotelData = await hotelService.getHotels();
      setHotels(hotelData);
    } catch (err) {
      setError(err);
      if (err.includes('expired')) handleLogout();
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(event) {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authService.login(userId, password);
      setAccessToken(true);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    authService.logout();
    setAccessToken(false);
    setHotels([]);
  }

  if (!accessToken) {
    return (
      <div className="login-page">
        <div className="login-panel">
          <div className="brand-bar">
            <div className="brand-badge">Hotelia SaaS</div>
          </div>
          <div className="login-content">
            <h1>Partner Login</h1>
            <p>Access your dedicated hospitality ecosystem.</p>
            <form onSubmit={handleLogin} className="login-form">
              <label>
                TENANT ID / EMAIL
                <input
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="e.g. user-1"
                />
              </label>
              <label>PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <button type="submit" className="primary-button" disabled={loading}>
                {loading ? 'Authenticating...' : 'Sign In →'}
              </button>
              {error ? <p className="error-message">{error}</p> : null}
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-shell">
      <div className="dashboard-header">
        <div className="brand-badge">Hotelia</div>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
      
      <div className="dashboard-content">
        <h1>Welcome, {authService.getUserId()}</h1>
        <p>Managing your dedicated tenant environment.</p>

        <div className="data-section">
          <h2>Your Hotels</h2>
          {loading ? <p>Loading data...</p> : (
            <div className="hotel-grid">
              {hotels.map(hotel => (
                <div key={hotel.id} className="hotel-card">
                  <h3>{hotel.name}</h3>
                  <p>{hotel.city}</p>
                </div>
              ))}
              {hotels.length === 0 && <p>No hotels found for this tenant.</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
