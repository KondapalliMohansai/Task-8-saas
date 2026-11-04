import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import ProductAnalytics from './pages/ProductAnalytics';
import Customers from './pages/Customers';
import Invoices from './pages/Invoices';
import CreateInvoice from './pages/CreateInvoice';
import Schedule from './pages/Schedule';
import Tasks from './pages/Tasks';
import CalendarPage from './pages/Calendar';
import Chat from './pages/Chat';
import ComingSoon from './pages/ComingSoon';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Recover from './pages/Recover';
import Confirm from './pages/Confirm';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/recover" element={<Recover />} />
      <Route path="/confirm" element={<Confirm />} />

      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/analytics" element={<ProductAnalytics />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/invoices/new" element={<CreateInvoice />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/messages" element={<Chat />} />
        <Route path="/notifications" element={<ComingSoon title="Notification" />} />
        <Route path="/settings" element={<ComingSoon title="Settings" />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
