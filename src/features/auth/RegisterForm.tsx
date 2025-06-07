import { useState } from 'react';
import { Box, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';

// Hàm thao tác với mock database local (public/mock-db.json)
async function addUserToDB(user: { name: string; email: string; phone: string; password: string; address?: string }) {
  // Gửi user lên backend để đăng ký và lưu vào mock-db.json
  const res = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...user, address: user.address || '' }),
  });
  if (res.status === 409) {
    return { success: false, error: 'Email đã tồn tại!' };
  }
  if (!res.ok) {
    return { success: false, error: 'Đăng ký thất bại.' };
  }
  const data = await res.json();
  // Lưu user vào localStorage (nếu muốn đồng bộ frontend)
  const users = localStorage.getItem('mock-users');
  let arr = users ? JSON.parse(users) : [];
  arr.push(data.user);
  localStorage.setItem('mock-users', JSON.stringify(arr));
  return { success: true, user: data.user };
}

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirm: '',
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    if (form.password !== form.confirm) {
      setError('Mật khẩu không khớp!');
      return;
    }
    setLoading(true);
    try {
      // Gọi hàm thêm user vào mock database
      const result = await addUserToDB({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        address: '', // Truyền address rỗng để backend không lỗi
      });
      if (!result.success) {
        setError(result.error || 'Đăng ký thất bại.');
        setLoading(false);
        return;
      }
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', password: '', confirm: '' });
      // Gửi user vừa đăng ký lên backend để lưu vào file current-user.json (không cần thiết vì /api/register đã làm việc này)
    } catch (err) {
      setError('Không thể lưu dữ liệu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 3, borderRadius: 3, boxShadow: 3, background: 'linear-gradient(135deg, #fffbe7 60%, #ffe0ec 100%)' }}>
      <Typography variant="h5" fontWeight={700} color="#e91e63" mb={2} align="center">
        Đăng ký tài khoản
      </Typography>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <TextField
          label="Họ tên"
          variant="outlined"
          required
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
        />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          required
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
        />
        <TextField
          label="Số điện thoại"
          type="tel"
          variant="outlined"
          required
          value={form.phone}
          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
        />
        <TextField
          label="Mật khẩu"
          type="password"
          variant="outlined"
          required
          value={form.password}
          onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
        />
        <TextField
          label="Nhập lại mật khẩu"
          type="password"
          variant="outlined"
          required
          value={form.confirm}
          onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))}
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          size="large"
          disabled={loading}
          sx={{ fontWeight: 600, mt: 1 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Đăng ký'}
        </Button>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">Đăng ký thành công!</Alert>}
      </form>
    </Box>
  );
}
