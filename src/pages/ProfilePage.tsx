import { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, MenuItem, Alert, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import addresses from '../data/dvhcvn.json';
import { useAuth } from '../features/auth/AuthContext';

const provinces = addresses.data;

export default function ProfilePage() {
  const { user, login, logout } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    province: '',
    district: '',
    ward: '',
    addressDetail: '',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Tách địa chỉ nếu có
  useEffect(() => {
    if (user) {
      // Nếu đang ở chế độ xem, chỉ set form khi vừa đăng nhập hoặc user thay đổi
      if (!editMode) {
        let addressDetail = '', ward = '', district = '', province = '';
        if (user.address) {
          // Tách địa chỉ theo định dạng: số nhà, xã/phường, huyện/quận, tỉnh/thành phố
          const parts = user.address.split(',').map(s => s.trim());
          addressDetail = parts[0] || '';
          ward = parts[1] || '';
          district = parts[2] || '';
          province = parts[3] || '';
        }
        setForm(f => ({
          ...f,
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || '',
          addressDetail,
          ward,
          district,
          province,
        }));
      }
    }
  }, [user, editMode]);

  const handleChange = (field: string, value: string) => {
    setForm(f => ({ ...f, [field]: value }));
    // Reset district/ward nếu đổi tỉnh/quận
    if (field === 'province') setForm(f => ({ ...f, district: '', ward: '' }));
    if (field === 'district') setForm(f => ({ ...f, ward: '' }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess(''); setLoading(true);
    try {
      if (!user) throw new Error('Chưa đăng nhập');
      const address = [form.addressDetail, form.ward, form.district, form.province].filter(Boolean).join(', ');
      const updatedUser = {
        id: user.id,
        email: user.email,
        name: form.name,
        phone: form.phone,
        address,
      };
      // Gửi lên backend để cập nhật
      const res = await fetch('/api/save-current-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      });
      if (!res.ok) throw new Error('Cập nhật thất bại');
      login(updatedUser); // cập nhật context
      setSuccess('Cập nhật thành công!');
      setEditMode(false); // Quay về chế độ xem sau khi lưu thành công
    } catch {
      setError('Không thể cập nhật.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setError(''); setSuccess(''); setLoading(true);
    try {
      // Xóa user khỏi mock-db (xóa hoàn toàn user khỏi file json)
      const res = await fetch('/api/save-current-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user?.email, deleted: true, hardDelete: true }),
      });
      if (!res.ok) throw new Error('Xóa thất bại');
      // Xóa toàn bộ dữ liệu liên quan đến user khỏi localStorage
      if (user?.email) {
        // Xóa orders
        const orders = JSON.parse(localStorage.getItem('orders') || '{}');
        delete orders[user.email];
        localStorage.setItem('orders', JSON.stringify(orders));
        // Xóa last-order nếu là của user này
        const lastOrder = localStorage.getItem('last-order');
        if (lastOrder) {
          const lo = JSON.parse(lastOrder);
          if (lo?.form?.senderEmail === user.email) localStorage.removeItem('last-order');
        }
        // Xóa current-user
        localStorage.removeItem('current-user');
        // Xóa cart
        localStorage.removeItem('cart');
        // Xóa cart-coupon
        localStorage.removeItem('cart-coupon');
      }
      logout();
      setSuccess('Tài khoản đã bị xóa.');
      // Quay về trang chủ sau khi xóa tài khoản
      setTimeout(() => {
        window.location.href = '/';
      }, 1200);
    } catch {
      setError('Không thể xóa tài khoản.');
    } finally {
      setLoading(false);
      setDeleteDialog(false);
    }
  };

  if (!user) return <Box sx={{ mt: 4, textAlign: 'center' }}>Bạn chưa đăng nhập.</Box>;

  // Lấy danh sách quận/huyện, phường/xã theo tỉnh/thành
  const districts = provinces.find((p: any) => p.name === form.province)?.level2s || [];
  const wards = districts.find((d: any) => d.name === form.district)?.level3s || [];

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', mt: 4, p: 3, borderRadius: 3, boxShadow: 3, background: 'linear-gradient(135deg, #fffbe7 60%, #ffe0ec 100%)' }}>
      <Typography variant="h5" fontWeight={700} color="#e91e63" mb={2} align="center">
        Quản lý tài khoản
      </Typography>
      {!editMode ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start' }}>
          <Typography align="left"><b>Họ tên:</b> {user.name}</Typography>
          <Typography align="left"><b>Email:</b> {user.email}</Typography>
          <Typography align="left"><b>Số điện thoại:</b> {user.phone}</Typography>
          <Typography align="left"><b>Địa chỉ:</b> {user.address || 'Chưa cập nhật'}</Typography>
          <Button variant="contained" color="secondary" sx={{ mt: 2, fontWeight: 600, alignSelf: 'stretch' }} onClick={() => {
            let addressDetail = '', ward = '', district = '', province = '';
            if (user.address) {
              const parts = user.address.split(',').map(s => s.trim());
              addressDetail = parts[0] || '';
              ward = parts[1] || '';
              district = parts[2] || '';
              province = parts[3] || '';
            }
            setForm({
              name: user.name || '',
              email: user.email || '',
              phone: user.phone || '',
              addressDetail,
              ward,
              district,
              province,     
            });
            setEditMode(true);
          }}>
            Sửa thông tin
          </Button>
        </Box>
      ) : (
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <TextField
            label="Họ tên"
            variant="outlined"
            required
            value={form.name}
            onChange={e => handleChange('name', e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            value={form.email}
            disabled
          />
          <TextField
            label="Số điện thoại"
            type="tel"
            variant="outlined"
            required
            value={form.phone}
            onChange={e => handleChange('phone', e.target.value)}
          />
          <TextField
            select
            label="Tỉnh/Thành phố"
            value={form.province}
            onChange={e => handleChange('province', e.target.value)}
            required
          >
            {provinces.map((p: any) => (
              <MenuItem key={p.id || p.level1_id} value={p.name}>{p.name}</MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Quận/Huyện"
            value={form.district}
            onChange={e => handleChange('district', e.target.value)}
            required
            disabled={!form.province}
          >
            {districts.map((d: any) => (
              <MenuItem key={d.id || d.level2_id} value={d.name}>{d.name}</MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Phường/Xã"
            value={form.ward}
            onChange={e => handleChange('ward', e.target.value)}
            required
            disabled={!form.district}
          >
            {wards.map((w: any) => (
              <MenuItem key={w.id || w.level3_id} value={w.name}>{w.name}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Địa chỉ nhà (số nhà, tên đường, ... )"
            variant="outlined"
            value={form.addressDetail}
            onChange={e => handleChange('addressDetail', e.target.value)}
            required
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              size="large"
              disabled={loading}
              sx={{ fontWeight: 600, mt: 1 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Lưu thay đổi'}
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              sx={{ mt: 1 }}
              onClick={() => setEditMode(false)}
              disabled={loading}
            >
              Hủy
            </Button>
          </Box>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setDeleteDialog(true)}
            sx={{ mt: 1 }}
          >
            Xóa tài khoản
          </Button>
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
        </form>
      )}
      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>Xác nhận xóa tài khoản</DialogTitle>
        <DialogContent>Bạn chắc chắn muốn xóa tài khoản này? Hành động này không thể hoàn tác.</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>Hủy</Button>
          <Button onClick={handleDelete} color="error" variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={20} color="inherit" /> : 'Xóa'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
