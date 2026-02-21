import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserHome from './pages/UserHome';
import Schemes from './pages/Schemes';
import SmartPrediction from './pages/SmartPrediction';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminSchemes from './pages/AdminSchemes';
import AdminLogs from './pages/AdminLogs';

function PrivateLayout({ adminOnly, children }) {
  return (
    <ProtectedRoute adminOnly={adminOnly}>
      <Layout>{children}</Layout>
    </ProtectedRoute>
  );
}

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#121212]">
        <div className="text-green-600 dark:text-orange-500">Loading...</div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={user ? <Navigate to={user.role === 'admin' ? '/admin' : '/home'} replace /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to={user.role === 'admin' ? '/admin' : '/home'} replace /> : <Signup />} />
      <Route path="/home" element={<PrivateLayout><UserHome /></PrivateLayout>} />
      <Route path="/schemes" element={<PrivateLayout><Schemes /></PrivateLayout>} />
      <Route path="/prediction" element={<PrivateLayout><SmartPrediction /></PrivateLayout>} />
      <Route path="/admin" element={<PrivateLayout adminOnly><AdminDashboard /></PrivateLayout>} />
      <Route path="/admin/users" element={<PrivateLayout adminOnly><AdminUsers /></PrivateLayout>} />
      <Route path="/admin/schemes" element={<PrivateLayout adminOnly><AdminSchemes /></PrivateLayout>} />
      <Route path="/admin/logs" element={<PrivateLayout adminOnly><AdminLogs /></PrivateLayout>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
