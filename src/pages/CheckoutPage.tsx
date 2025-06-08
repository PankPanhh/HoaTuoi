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

// --- Ưu đãi & phí ship ---
function getIsFirstOrder(user: any) {
  if (!user) return false;
  const orders = JSON.parse(localStorage.getItem('orders') || '{}');
  const userOrders = orders[user.email] || [];
  return userOrders.length === 0;
}

function getShippingFee(address: string) {
  if (!address) return 0;
  // Đơn giản: nếu địa chỉ chứa "Hà Nội" hoặc "TP HCM" => nội thành, miễn phí ship
  const addressLower = address.toLowerCase();
  if (addressLower.includes('hà nội') || addressLower.includes('tp hcm') || addressLower.includes('thành phố hồ chí minh')) {
    return 0;
  }
  return 30000;
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
  const [coupon, setCoupon] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
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
    // Lấy mã giảm giá từ localStorage nếu có
    const couponData = localStorage.getItem('cart-coupon');
    if (couponData) {
      const { code, discount } = JSON.parse(couponData);
      setCoupon(code);
      setCouponDiscount(discount);
    }
  }, []);

  // Xử lý nhập mã giảm giá
  const handleApplyCoupon = () => {
    setCouponError('');
    setCouponSuccess('');
    if (coupon.trim().toUpperCase() === 'SALE30') {
      // Kiểm tra user đã từng dùng mã SALE30 chưa
      if (!user) {
        setCouponError('Bạn cần đăng nhập để sử dụng mã giảm giá.');
        setCouponDiscount(0);
        return;
      }
      const orders = JSON.parse(localStorage.getItem('orders') || '{}');
      const userOrders = orders[user.email] || [];
      const hasUsedSale30 = userOrders.some((o: any) => o.couponApplied && o.couponApplied.code === 'SALE30');
      if (hasUsedSale30) {
        setCouponError('Bạn chỉ được sử dụng mã SALE30 cho 1 đơn hàng đầu tiên.');
        setCouponDiscount(0);
        localStorage.removeItem('cart-coupon');
        return;
      }
      setCouponDiscount(0.3);
      setCouponSuccess('Áp dụng mã giảm giá thành công!');
      localStorage.setItem('cart-coupon', JSON.stringify({ code: 'SALE30', discount: 0.3 }));
    } else {
      setCouponDiscount(0);
      setCouponError('Mã giảm giá không hợp lệ hoặc đã hết hạn.');
      localStorage.removeItem('cart-coupon');
    }
  };

  const total = cart.reduce((sum, item) => sum + (item.product.price * (1 - (item.product.promotion ?? 0) / 100)) * item.quantity, 0);
  const isFirstOrder = user ? getIsFirstOrder(user) : false;
  const shippingFee = form.recipientAddress ? getShippingFee(form.recipientAddress) : 0;
  const discount = isFirstOrder ? 0.2 : 0;
  const discountAmount = total * discount;
  const couponAmount = total * couponDiscount;
  const finalTotal = total - discountAmount - couponAmount + shippingFee;

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
    // Kiểm tra lại mã SALE30 trước khi lưu đơn
    let couponInfo = null;
    if (couponDiscount > 0 && coupon.trim().toUpperCase() === 'SALE30') {
      const orders = JSON.parse(localStorage.getItem('orders') || '{}');
      const userOrders = orders[user.email] || [];
      const hasUsedSale30 = userOrders.some((o: any) => o.couponApplied && o.couponApplied.code === 'SALE30');
      if (!hasUsedSale30) {
        couponInfo = { code: coupon, percent: couponDiscount * 100, amount: couponAmount, note: 'Đã áp dụng mã giảm giá SALE30.' };
      } else {
        couponInfo = null;
      }
    }
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
            discountApplied: isFirstOrder ? {
              percent: 20,
              amount: discountAmount,
              note: 'Đã áp dụng giảm giá 20% cho đơn hàng đầu tiên.'
            } : null,
            couponApplied: couponInfo,
            shippingFee,
            finalTotal,
          };
          orders[user.email] = [newOrder, ...userOrders];
          localStorage.setItem('orders', JSON.stringify(orders));
          localStorage.setItem('last-order', JSON.stringify(newOrder));
          await saveOrderToDB(user.email, newOrder);
          try {
            const res = await fetch(`/api/users?email=${encodeURIComponent(user.email)}`);
            if (res.ok) {
              const updatedUser = await res.json();
              localStorage.setItem('current-user', JSON.stringify(updatedUser));
            }
          } catch {}
        }
        localStorage.removeItem('cart');
        localStorage.removeItem('cart-coupon');
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
            discountApplied: isFirstOrder ? {
              percent: 20,
              amount: discountAmount,
              note: 'Đã áp dụng giảm giá 20% cho đơn hàng đầu tiên.'
            } : null,
            couponApplied: couponInfo,
            shippingFee,
            finalTotal,
          };
          orders[user.email] = [newOrder, ...userOrders];
          localStorage.setItem('orders', JSON.stringify(orders));
          localStorage.setItem('last-order', JSON.stringify(newOrder));
          await saveOrderToDB(user.email, newOrder);
          try {
            const res = await fetch(`/api/users?email=${encodeURIComponent(user.email)}`);
            if (res.ok) {
              const updatedUser = await res.json();
              localStorage.setItem('current-user', JSON.stringify(updatedUser));
            }
          } catch {}
        }
        localStorage.removeItem('cart');
        localStorage.removeItem('cart-coupon');
        setCart([]);
        setTimeout(() => navigate('/'), 2000);
      }, 1800);
    }
  };

  if (cart.length === 0) {
    // Nếu có last-order thì hiển thị tổng kết đơn hàng vừa đặt
    const lastOrder = localStorage.getItem('last-order');
    if (lastOrder) {
      const order = JSON.parse(lastOrder);
      return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 6, p: 3, borderRadius: 4, boxShadow: 3, background: '#fff' }}>
          <Typography align="center" color="#e91e63" fontWeight={700} mb={2}>Đặt hàng thành công!</Typography>
          <Typography align="center" color="text.secondary" mb={2}>Tóm tắt đơn hàng vừa đặt:</Typography>
          <Divider sx={{ mb: 2 }} />
          {order.cart.map((item: any, idx: number) => (
            <Box key={item.product.id + idx} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <img src={item.product.image} alt={item.product.name} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, marginRight: 10 }} />
              <Box sx={{ flex: 1 }}>
                <Typography fontWeight={600}>{item.product.name}</Typography>
                <Typography color="text.secondary" fontSize={14}>
                  SL: {item.quantity} x {item.product.promotion ? (
                    <>
                      {(item.product.price * (1 - (item.product.promotion ?? 0) / 100)).toLocaleString()}₫
                      <Typography component="span" color="text.secondary" sx={{ textDecoration: 'line-through', ml: 1, fontSize: 13 }}>
                        {item.product.price.toLocaleString()}₫
                      </Typography>
                    </>
                  ) : (
                    <>{item.product.price.toLocaleString()}₫</>
                  )}
                </Typography>
              </Box>
              <Typography fontWeight={700} color="#e91e63">
                {((item.product.price * (1 - (item.product.promotion ?? 0) / 100)) * item.quantity).toLocaleString()}₫
              </Typography>
            </Box>
          ))}
          <Divider sx={{ my: 1 }} />
          <Typography color="text.secondary" fontSize={14}>
            Tổng cộng: <b style={{ color: '#e91e63' }}>{order.cart.reduce((sum: number, i: any) => sum + i.product.price * i.quantity, 0).toLocaleString()}₫</b>
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography fontWeight={700}>Giảm giá (20% đơn đầu tiên):</Typography>
            <Typography fontWeight={900} color={order.discountApplied ? '#e91e63' : 'text.disabled'} fontSize={18} sx={!order.discountApplied ? { opacity: 0.6 } : {}}>
              -{order.discountApplied ? order.discountApplied.amount.toLocaleString() : '0'}₫
            </Typography>
          </Box>
          <Typography color="text.secondary" fontSize={14}>
            Phí ship: <b style={{ color: '#e91e63' }}>{order.shippingFee.toLocaleString()}₫</b>
          </Typography>
          <Typography color="text.secondary" fontSize={14} fontWeight={600}>
            Tổng cuối cùng: <b style={{ color: '#e91e63' }}>{order.finalTotal.toLocaleString()}₫</b>
          </Typography>
          {order.discountApplied && (
            <Box sx={{ mt: 2, p: 2, borderRadius: 2, bgcolor: '#e8f5e9', border: '1px solid #c8e6c9' }}>
              <Typography color="#2e7d32" fontWeight={500} mb={1}>
                🎉 Bạn đã được giảm giá 20% cho đơn hàng đầu tiên!
              </Typography>
              <Typography color="text.secondary" fontSize={14}>
                (Đã được trừ trực tiếp vào tổng tiền)
              </Typography>
            </Box>
          )}
          <Button variant="contained" color="secondary" sx={{ mt: 3, fontWeight: 600 }} onClick={() => { localStorage.removeItem('last-order'); navigate('/'); }}>Về trang chủ</Button>
        </Box>
      );
    }
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
        <Typography variant="h5" fontWeight={700} color="#e91e63" mb={2} sx={{ textAlign: { xs: 'center', md: 'center' } }}>
          🌸 Đặt hoa & Gửi yêu thương 🌸
        </Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="flex-start">
          {/* Form đặt hàng */}
          <Box sx={{ flex: 1, minWidth: 320 }}>
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
                sx={{ mb: 2, alignItems: 'flex-start', '.MuiFormControlLabel-label': { textAlign: 'left' } }}
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
          <Box sx={{ flex: 1, bgcolor: '#fff', borderRadius: 3, boxShadow: 2, p: 3, minWidth: 320 }}>
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
                    SL: {item.quantity} x {item.product.promotion ? (
                      <>
                        {(item.product.price * (1 - (item.product.promotion ?? 0) / 100)).toLocaleString()}₫
                        <Typography component="span" color="text.secondary" sx={{ textDecoration: 'line-through', ml: 1, fontSize: 13 }}>
                          {item.product.price.toLocaleString()}₫
                        </Typography>
                      </>
                    ) : (
                      <>{item.product.price.toLocaleString()}₫</>
                    )}
                  </Typography>
                  {item.note && (
                    <Typography color="text.secondary" fontSize={13}>Ghi chú: {item.note}</Typography>
                  )}
                </Box>
                <Typography fontWeight={700} color="#e91e63">
                  {((item.product.price * (1 - (item.product.promotion ?? 0) / 100)) * item.quantity).toLocaleString()}₫
                </Typography>
              </Box>
            ))}
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography fontWeight={700}>Tổng cộng:</Typography>
              <Typography fontWeight={900} color="#e91e63" fontSize={18}>
                {total.toLocaleString()}₫
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography fontWeight={700}>Giảm giá (20% đơn đầu tiên):</Typography>
              <Typography fontWeight={900} color={isFirstOrder ? '#e91e63' : 'text.disabled'} fontSize={18} sx={!isFirstOrder ? { opacity: 0.6 } : {}}>
                -{discountAmount.toLocaleString()}₫
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography fontWeight={700}>Phí giao hàng:</Typography>
              <Typography fontWeight={900} color="#e91e63" fontSize={18}>
                {shippingFee.toLocaleString()}₫
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography fontWeight={900} fontSize={20}>Tổng thanh toán:</Typography>
              <Typography fontWeight={900} color="#e91e63" fontSize={22}>
                {finalTotal.toLocaleString()}₫
              </Typography>
            </Box>
            {isFirstOrder && (
              <Box sx={{ mt: 2, p: 2, borderRadius: 2, bgcolor: '#e8f5e9', border: '1px solid #c8e6c9' }}>
                <Typography color="#2e7d32" fontWeight={500} mb={1}>
                  🎉 Chúc mừng! Bạn được giảm giá 20% cho đơn hàng đầu tiên.
                </Typography>
                <Typography color="text.secondary" fontSize={14}>
                  (Đã được trừ trực tiếp vào tổng tiền)
                </Typography>
              </Box>
            )}
            {shippingFee > 0 && (
              <Box sx={{ mt: 1, p: 2, borderRadius: 2, bgcolor: '#fff3e0', border: '1px solid #ffe0b2' }}>
                <Typography color="#e65100" fontWeight={500} mb={1}>
                  🚚 Phí giao hàng: {shippingFee.toLocaleString()}₫
                </Typography>
                <Typography color="text.secondary" fontSize={14}>
                  (Miễn phí giao hàng cho địa chỉ nội thành: Hà Nội, TP HCM)
                </Typography>
              </Box>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <TextField
                label="Nhập mã giảm giá"
                size="small"
                value={coupon}
                onChange={e => setCoupon(e.target.value)}
                sx={{ width: 220 }}
                disabled={!!couponDiscount}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={handleApplyCoupon}
                disabled={!!couponDiscount || !coupon.trim()}
                sx={{ fontWeight: 700, borderRadius: 2 }}
              >
                Áp dụng
              </Button>
              {couponDiscount > 0 && (
                <Typography color="success.main" fontWeight={600} ml={1}>Đã áp dụng mã SALE30 (-30%)</Typography>
              )}
            </Box>
            {couponError && <Alert severity="error" sx={{ mb: 1 }}>{couponError}</Alert>}
            {couponSuccess && <Alert severity="success" sx={{ mb: 1 }}>{couponSuccess}</Alert>}
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography fontWeight={700}>Mã giảm giá SALE30 (-30%):</Typography>
              <Typography fontWeight={900} color={couponDiscount > 0 ? 'success.main' : 'text.disabled'} fontSize={18} sx={couponDiscount === 0 ? { opacity: 0.6 } : {}}>
                -{couponAmount.toLocaleString()}₫
              </Typography>
            </Box>
            {/* Hiển thị lịch sử đơn hàng có giảm giá coupon */}
            {user && (
              <Box sx={{ mt: 3 }}>
                <Divider sx={{ mb: 2 }} />
                <Typography fontWeight={700} color="#e91e63" mb={1}>Lịch sử đơn hàng đã áp dụng mã giảm giá:</Typography>
                {(() => {
                  const orders = JSON.parse(localStorage.getItem('orders') || '{}');
                  const userOrders = orders[user.email] || [];
                  const couponOrders = userOrders.filter((o: any) => o.couponApplied && o.couponApplied.code === 'SALE30');
                  if (couponOrders.length === 0) return <Typography color="text.secondary">Chưa có đơn nào áp dụng mã SALE30.</Typography>;
                  return couponOrders.map((o: any) => (
                    <Box key={o.id} sx={{ mb: 1, p: 1.5, borderRadius: 2, bgcolor: '#e3f2fd', border: '1px solid #90caf9' }}>
                      <Typography fontWeight={600} color="#1976d2">Đơn #{o.id} - {new Date(o.createdAt).toLocaleString()}</Typography>
                      <Typography color="text.secondary" fontSize={14}>Đã giảm: {o.couponApplied.amount.toLocaleString()}₫ ({o.couponApplied.note})</Typography>
                      <Typography color="text.secondary" fontSize={14}>Tổng thanh toán: {o.finalTotal.toLocaleString()}₫</Typography>
                    </Box>
                  ));
                })()}
              </Box>
            )}
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}