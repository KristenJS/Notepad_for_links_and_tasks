import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';
import { useRoutes } from './routes';
import { Navbar } from './components/Navbar';
import 'materialize-css';

function App() {
  const { token, login, logout, userId } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      {isAuthenticated && <Navbar />}
      <div className='container'>
        <h3>{routes}</h3>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
