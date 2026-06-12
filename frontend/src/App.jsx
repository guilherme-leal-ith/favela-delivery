import AppRouter from './router/AppRouter';
import { AuthProvider } from './context/AuthContext';
import './styles/variables.css';
import './styles/global.css';

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
