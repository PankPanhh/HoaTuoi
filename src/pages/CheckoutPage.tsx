import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Stack,
  Alert,
  Paper,
  CircularProgress,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../types';

function getCart() {
  try {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  } catch {
    return [];
  }
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<Array<{ product: Product; quantity: number; note?: string }>>([]);
  const [form, setForm] = useState({
    recipientName: '',
    recipientPhone: '',
    recipientAddress: '',
    recipientNote: '',
    senderName: '',
    senderEmail: '',
    senderPhone: '',
    senderMessage: '',
    hideSenderInfo: false,
    paymentMethod: 'cod', // Thêm trường phương thức thanh toán
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setCart(getCart());
    const userData = JSON.parse(localStorage.getItem('current-user') || 'null');
    if (userData) {
      setUser(userData);
      setForm(f => ({
        ...f,
        senderName: userData.name || '',
        senderEmail: userData.email || '',
        senderPhone: userData.phone || '',
      }));
    }
  }, []);

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleChange = (field: string, value: string | boolean) => {
    setForm(f => ({ ...f, [field]: value }));
  };

  const saveOrderToDB = async (userEmail: string, order: any) => {
    try {
      await fetch('/api/users/add-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, order }),
      });
    } catch (err) {
      // Có thể hiển thị thông báo lỗi nếu cần
    }
  };

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.recipientName || !form.recipientPhone || !form.recipientAddress) {
      setError('Vui lòng nhập đầy đủ thông tin người nhận!');
      return;
    }
    if (!form.paymentMethod) {
      setError('Vui lòng chọn hình thức thanh toán!');
      return;
    }
    setLoading(true);
    if (form.paymentMethod === 'online') {
      setTimeout(async () => {
        setLoading(false);
        setSuccess('Thanh toán online thành công! Đơn hàng của bạn đã được ghi nhận.');
        const user = JSON.parse(localStorage.getItem('current-user') || 'null');
        if (user) {
          const orders = JSON.parse(localStorage.getItem('orders') || '{}');
          const userOrders = orders[user.email] || [];
          const newOrder = {
            id: Date.now(),
            cart,
            form,
            status: 'Đang xử lý',
            createdAt: new Date().toISOString(),
          };
          orders[user.email] = [newOrder, ...userOrders];
          localStorage.setItem('orders', JSON.stringify(orders));
          await saveOrderToDB(user.email, newOrder); // Lưu vào mock-db
          // Lấy lại user mới nhất từ backend và cập nhật localStorage
          try {
            const res = await fetch(`/api/users?email=${encodeURIComponent(user.email)}`);
            if (res.ok) {
              const updatedUser = await res.json();
              localStorage.setItem('current-user', JSON.stringify(updatedUser));
            }
          } catch {}
        }
        localStorage.removeItem('cart');
        setCart([]);
        setTimeout(() => navigate('/'), 2000);
      }, 1800);
    } else {
      setTimeout(async () => {
        setLoading(false);
        setSuccess('Đặt hàng thành công! Bạn sẽ thanh toán khi nhận hàng.');
        const user = JSON.parse(localStorage.getItem('current-user') || 'null');
        if (user) {
          const orders = JSON.parse(localStorage.getItem('orders') || '{}');
          const userOrders = orders[user.email] || [];
          const newOrder = {
            id: Date.now(),
            cart,
            form,
            status: 'Đang xử lý',
            createdAt: new Date().toISOString(),
          };
          orders[user.email] = [newOrder, ...userOrders];
          localStorage.setItem('orders', JSON.stringify(orders));
          await saveOrderToDB(user.email, newOrder); // Lưu vào mock-db
          // Lấy lại user mới nhất từ backend và cập nhật localStorage
          try {
            const res = await fetch(`/api/users?email=${encodeURIComponent(user.email)}`);
            if (res.ok) {
              const updatedUser = await res.json();
              localStorage.setItem('current-user', JSON.stringify(updatedUser));
            }
          } catch {}
        }
        localStorage.removeItem('cart');
        setCart([]);
        setTimeout(() => navigate('/'), 2000);
      }, 1800);
    }
  };

  if (cart.length === 0) {
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 6, p: 3, borderRadius: 4, boxShadow: 3, background: '#fff' }}>
        <Typography align="center" color="text.secondary">Giỏ hàng trống. Vui lòng chọn sản phẩm trước khi thanh toán.</Typography>
        <Button variant="contained" color="secondary" sx={{ mt: 3, fontWeight: 600 }} onClick={() => navigate('/')}>Về trang chủ</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, mb: 6 }}>
      <Paper elevation={4} sx={{ borderRadius: 4, p: { xs: 2, sm: 4 }, background: 'linear-gradient(135deg, #fffbe7 60%, #ffe0ec 100%)' }}>
        <Typography variant="h5" fontWeight={700} color="#e91e63" mb={2} align="center">
          🌸 Đặt hoa & Gửi yêu thương 🌸
        </Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
          {/* Form đặt hàng */}
          <Box sx={{ flex: 1 }}>
            <form onSubmit={handleOrder}>
              {/* Người nhận */}
              <Typography fontWeight={700} color="text.secondary" mb={1}>Thông tin người nhận</Typography>
              <TextField
                label="Họ và tên người nhận hoa"
                value={form.recipientName}
                onChange={e => handleChange('recipientName', e.target.value)}
                fullWidth required sx={{ mb: 2 }}
              />
              <TextField
                label="Số điện thoại người nhận"
                value={form.recipientPhone}
                onChange={e => handleChange('recipientPhone', e.target.value)}
                fullWidth required sx={{ mb: 2 }}
              />
              <TextField
                label="Địa chỉ giao hàng (đường, phường, quận, thành phố)"
                value={form.recipientAddress}
                onChange={e => handleChange('recipientAddress', e.target.value)}
                fullWidth required sx={{ mb: 2 }}
              />
              <TextField
                label='Ghi chú giao hàng (ví dụ: "Giao trước 10h sáng", "Gọi trước khi đến")'
                value={form.recipientNote}
                onChange={e => handleChange('recipientNote', e.target.value)}
                fullWidth multiline minRows={2} sx={{ mb: 3 }}
              />

              <Typography fontWeight={700} color="text.secondary" mb={1}>Thông tin người đặt</Typography>
              <TextField
                label="Họ tên người đặt"
                value={form.senderName}
                fullWidth
                disabled
                sx={{ mb: 2 }}
              />
              <Stack direction="column" spacing={2} sx={{ mb: 2 }}>
                <TextField
                  label="Email"
                  value={form.senderEmail}
                  fullWidth
                  disabled
                />
                <TextField
                  label="Số điện thoại"
                  value={form.senderPhone}
                  fullWidth
                  disabled
                />
              </Stack>

              <TextField
                label="Lời nhắn / thiệp chúc gửi kèm"
                value={form.senderMessage}
                onChange={e => handleChange('senderMessage', e.target.value)}
                fullWidth
                multiline
                minRows={2}
                sx={{ mb: 2 }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.hideSenderInfo}
                    onChange={e => handleChange('hideSenderInfo', e.target.checked)}
                  />
                }
                label="Bạn có muốn ẩn thông tin cá nhân của mình để tạo sự tò mò cho người ấy không?"
                sx={{ mb: 2 }}
              />

              {/* Chọn hình thức thanh toán */}
              <Typography fontWeight={700} color="text.secondary" mb={1}>Hình thức thanh toán</Typography>
              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <FormControlLabel
                  control={<Checkbox checked={form.paymentMethod === 'cod'} onChange={() => handleChange('paymentMethod', 'cod')} />}
                  label="Thanh toán khi nhận hàng"
                />
                <FormControlLabel
                  control={<Checkbox checked={form.paymentMethod === 'online'} onChange={() => handleChange('paymentMethod', 'online')} />}
                  label="Thanh toán online"
                />
              </Stack>
              {form.paymentMethod === 'online' && (
                <Box sx={{ mb: 2, textAlign: 'center' }}>
                  <Typography color="text.secondary" fontWeight={500} mb={1}>
                    Vui lòng quét mã QR để thanh toán:
                  </Typography>
                  <Box sx={{ display: 'inline-block', p: 2, bgcolor: '#fff', borderRadius: 2, boxShadow: 2 }}>
                    <img
                      src="/qr-demo.png"
                      alt="QR Thanh toán"
                      style={{ width: 180, height: 180, objectFit: 'contain' }}
                    />
                  </Box>
                  <Typography color="text.secondary" fontSize={13} mt={1}>
                    (Sau khi thanh toán, nhấn "Xác nhận đặt hàng")
                  </Typography>
                </Box>
              )}

              {/* Button: Thông tin người nhận giống người đặt */}
              <Button
                variant="outlined"
                color="secondary"
                sx={{ mb: 2, fontWeight: 600, borderRadius: 2 }}
                onClick={() => {
                  setForm(f => ({
                    ...f,
                    recipientName: f.senderName,
                    recipientPhone: f.senderPhone,
                    recipientAddress: user?.address || '',
                  }));
                }}
              >
                Thông tin người nhận giống với người đặt
              </Button>

              <Button
                type="submit"
                variant="contained"
                color="secondary"
                size="large"
                fullWidth
                sx={{
                  fontWeight: 700,
                  fontSize: 18,
                  borderRadius: 3,
                  boxShadow: 3,
                  letterSpacing: 1,
                  mt: 1,
                  '&:hover': {
                    bgcolor: '#d81b60',
                    boxShadow: 6,
                    transform: 'scale(1.04)',
                  },
                }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={26} color="inherit" /> : 'Xác nhận đặt hàng'}
              </Button>
              {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
              {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
            </form>
          </Box>

          {/* Tóm tắt đơn hàng */}
          <Box sx={{ flex: 1, bgcolor: '#fff', borderRadius: 3, boxShadow: 2, p: 3 }}>
            <Typography fontWeight={600} mb={2} color="#e91e63">🧾 Tóm tắt đơn hàng</Typography>
            <Divider sx={{ mb: 2 }} />
            {cart.map((item, idx) => (
              <Box key={item.product.id + idx} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  style={{
                    width: 56,
                    height: 56,
                    objectFit: 'cover',
                    borderRadius: 8,
                    marginRight: 12,
                    boxShadow: '0 2px 8px #e91e6322',
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography fontWeight={600}>{item.product.name}</Typography>
                  <Typography color="text.secondary" fontSize={14}>
                    SL: {item.quantity} x {item.product.price.toLocaleString()}₫
                  </Typography>
                  {item.note && (
                    <Typography color="text.secondary" fontSize={13}>Ghi chú: {item.note}</Typography>
                  )}
                </Box>
                <Typography fontWeight={700} color="#e91e63">
                  {(item.product.price * item.quantity).toLocaleString()}₫
                </Typography>
              </Box>
            ))}
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography fontWeight={700}>Tổng cộng:</Typography>
              <Typography fontWeight={900} color="#e91e63" fontSize={22}>
                {total.toLocaleString()}₫
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}