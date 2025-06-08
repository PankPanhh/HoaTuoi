import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import Layout from './components/Layout';
import './App';
import './App.css'; // Đảm bảo import file css chung
import { AuthProvider } from './features/auth/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          {/* Chỉ render AppRoutes, KHÔNG render Navbar ở đây vì Layout đã có Navbar */}
          <AppRoutes />
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
