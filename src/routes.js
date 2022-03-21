import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { isAuthenticated } from '../src/services/auth';
import Logon from './pages/Logon';
import Register from './pages/Register';
import Library from './pages/Library';
import NewBook from './pages/NewBook';
import Detail from './pages/Detail';

export function PrivateRoute({ children, redirectTo }) {
  return isAuthenticated() ? children : <Navigate to={redirectTo} />
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Logon />} />
        <Route path="/register"
          element={<PrivateRoute redirectTo="/">
            <Register />
          </PrivateRoute>}
        />
        <Route path="/library" element={<PrivateRoute redirectTo="/">
          <Library />
        </PrivateRoute>} />
        <Route path="/books/new" element={<PrivateRoute redirectTo="/">
          <NewBook />
        </PrivateRoute>} />
        <Route path="/detail/:id" element={<PrivateRoute redirectTo="/">
          <Detail />
        </PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}