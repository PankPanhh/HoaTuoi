import { useState } from 'react';
import { Box, TextField, Button, Alert, CircularProgress } from '@mui/material';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

// Lấy danh sách user từ backend (API)
async function getUsersFromDB() {
  try {
    const res = await fetch('/api/users');
    const db = await res.json();
    return db.users || [];
  } catch {
    // Fallback: lấy từ localStorage nếu fetch lỗi
    const users = localStorage.getItem('mock-users');
    return users ? JSON.parse(users) : [];
  }
}

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);
    try {
      // Lấy user từ file mock-db.json
      const users = await getUsersFromDB();
      const user = users.find((u: any) => u.email === form.email && u.password === form.password);
      if (!user) {
        setError('Email hoặc mật khẩu không đúng!');
        setLoading(false);
        return;
      }
      setSuccess(true);
      setForm({ email: '', password: '' });
      login(user); // Lưu user vào context
      // Gửi user lên backend để lưu vào file
      await fetch('/api/save-current-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      setTimeout(() => {
        navigate('/'); // Chuyển về trang chủ
      }, 500);
    } catch (err) {
      setError('Không thể kiểm tra dữ liệu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 2, p: 2, borderRadius: 3, background: 'transparent' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          required
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
        />
        <TextField
          label="Mật khẩu"
          type="password"
          variant="outlined"
          required
          value={form.password}
          onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          size="large"
          disabled={loading}
          sx={{ fontWeight: 600, mt: 1 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Đăng nhập'}
        </Button>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">Đăng nhập thành công!</Alert>}
      </form>
    </Box>
  );
}
