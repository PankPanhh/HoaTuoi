import { useState } from 'react';
import { Box, Typography, Button, IconButton, TextField, Divider, Stack, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../types';
import { useAuth } from '../features/auth/AuthContext';

// Lấy giỏ hàng từ localStorage
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
  // Đơn giản: nếu địa chỉ chứa "Hà Nội" hoặc "TP HCM" => nội thành, free ship
  const addressLower = address.toLowerCase();
  if (addressLower.includes('hà nội') || addressLower.includes('tp hcm') || addressLower.includes('thành phố hồ chí minh')) {
    return 0;
  }
  return 30000;
}

export default function CartPage() {
  const { user } = useAuth();
  const [cart, setCart] = useState<Array<{ product: Product; quantity: number; note?: string }>>(getCart());
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const updateCart = (newCart: typeof cart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const handleQuantity = (idx: number, value: number) => {
    if (value < 1) return;
    const newCart = [...cart];
    newCart[idx].quantity = value;
    updateCart(newCart);
  };

  const handleRemove = (idx: number) => {
    const newCart = cart.filter((_, i) => i !== idx);
    updateCart(newCart);
  };

  const handleCheckout = () => {
    if (!user) {
      setError('Vui lòng đăng nhập để đặt hàng!');
      return;
    }
    if (cart.length === 0) {
      setError('Giỏ hàng trống!');
      return;
    }
    navigate('/checkout');
  };

  const handleNoteChange = (idx: number, value: string) => {
    const newCart = [...cart];
    newCart[idx].note = value;
    updateCart(newCart);
  };

  const total = cart.reduce((sum, item) => sum + (item.product.price * (1 - (item.product.promotion ?? 0) / 100)) * item.quantity, 0);
  const isFirstOrder = user ? getIsFirstOrder(user) : false;
  const shippingFee = user ? getShippingFee(user.address) : 0;
  const discount = isFirstOrder ? 0.2 : 0;
  const discountAmount = total * discount;
  const finalTotal = total - discountAmount + shippingFee;

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, p: 3, borderRadius: 3, boxShadow: 3, background: '#fff' }}>
      <Typography variant="h5" fontWeight={700} color="#e91e63" mb={2} align="center">
        Giỏ hàng của bạn
      </Typography>
      {!user && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          Vui lòng <a href="/auth?tab=login" style={{ color: '#d81b60', fontWeight: 600, textDecoration: 'underline' }}>đăng nhập</a> để sử dụng giỏ hàng và đặt hàng.
        </Alert>
      )}
      {cart.length === 0 ? (
        <Typography align="center" color="text.secondary">Chưa có sản phẩm nào trong giỏ hàng.</Typography>
      ) : (
        <>
          {cart.map((item, idx) => (
            <Box key={item.product.id} sx={{
  mb: 2,
  p: 2,
  border: '2px solid #ffe0ec',
  borderRadius: 3,
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  flexWrap: 'wrap',
  boxShadow: 3,
  transition: 'box-shadow 0.2s',
  '&:hover': { boxShadow: 6, borderColor: '#e91e63' },
  background: 'linear-gradient(135deg, #fffbe7 60%, #ffe0ec 100%)',
}}>
              <img src={item.product.image} alt={item.product.name} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 12, boxShadow: '0 2px 8px #e91e6322' }} />
              <Box sx={{ flex: 1, minWidth: 180 }}>
                <Typography fontWeight={700} color="#e91e63">{item.product.name}</Typography>
                <Typography color="text.secondary">
                  {item.product.promotion ? (
                    <>
                      {(item.product.price * (1 - (item.product.promotion ?? 0) / 100)).toLocaleString()}₫ / sản phẩm
                      <Typography component="span" color="text.secondary" sx={{ textDecoration: 'line-through', ml: 1, fontSize: 13 }}>
                        {item.product.price.toLocaleString()}₫
                      </Typography>
                    </>
                  ) : (
                    <>{item.product.price.toLocaleString()}₫ / sản phẩm</>
                  )}
                </Typography>
                <Typography color="text.secondary" fontSize={14}>
                  Tổng: <b>{((item.product.price * (1 - (item.product.promotion ?? 0) / 100)) * item.quantity).toLocaleString()}₫</b>
                </Typography>
                <TextField
                  label="Ghi chú (tuỳ chọn: Thêm thiệp, nơ, lời chúc...)"
                  size="small"
                  value={item.note || ''}
                  onChange={e => handleNoteChange(idx, e.target.value)}
                  sx={{ mt: 1, width: '100%' }}
                />
              </Box>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Button
                  size="small"
                  variant="outlined"
                  sx={{
                    minWidth: 36,
                    width: 36,
                    height: 36,
                    px: 0,
                    borderRadius: '50%',
                    bgcolor: '#fff',
                    fontWeight: 700,
                    fontSize: 24,
                    boxShadow: 1,
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&:hover': { bgcolor: '#ffe0ec', color: '#e91e63', boxShadow: 3, borderColor: '#e91e63' },
                  }}
                  onClick={() => handleQuantity(idx, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >-
                </Button>
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    bgcolor: '#ffe0ec',
                    color: '#e91e63',
                    fontWeight: 700,
                    fontSize: 20,
                    boxShadow: 1,
                    border: '2px solid #e91e63',
                  }}
                >
                  {item.quantity}
                </Box>
                <Button
                  size="small"
                  variant="outlined"
                  sx={{
                    minWidth: 36,
                    width: 36,
                    height: 36,
                    px: 0,
                    borderRadius: '50%',
                    bgcolor: '#fff',
                    fontWeight: 700,
                    fontSize: 20,
                    boxShadow: 1,
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&:hover': { bgcolor: '#ffe0ec', color: '#e91e63', boxShadow: 3, borderColor: '#e91e63' },
                  }}
                  onClick={() => handleQuantity(idx, item.quantity + 1)}
                >+
                </Button>
              </Stack>
              <IconButton color="error" onClick={() => handleRemove(idx)} sx={{ ml: 1, bgcolor: '#fff', boxShadow: 1, '&:hover': { bgcolor: '#ffe0ec' } }}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography fontWeight={600}>Tổng cộng:</Typography>
            <Typography fontWeight={700} color="#e91e63" fontSize={20}>{total.toLocaleString()}₫</Typography>
          </Box>
          {discount > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
              <Typography fontWeight={600} color="success.main">Giảm giá 20% (đơn đầu tiên):</Typography>
              <Typography fontWeight={700} color="success.main">- {discountAmount.toLocaleString()}₫</Typography>
            </Box>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
            <Typography fontWeight={600}>Phí vận chuyển:</Typography>
            <Typography fontWeight={700}>{shippingFee === 0 ? 'Miễn phí' : shippingFee.toLocaleString() + '₫'}</Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography fontWeight={700} color="#e91e63">Thành tiền:</Typography>
            <Typography fontWeight={900} color="#e91e63" fontSize={22}>{finalTotal.toLocaleString()}₫</Typography>
          </Box>
          <Button
  variant="contained"
  color="secondary"
  size="large"
  fullWidth
  startIcon={<span style={{display:'flex',alignItems:'center'}}><svg width="22" height="22" fill="#fff" viewBox="0 0 24 24"><path d="M7 18c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm10 0c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm-12.293-2.707l1.414 1.414c.195.195.451.293.707.293h12c.552 0 1-.448 1-1s-.448-1-1-1H7.414l-.707-.707A.997.997 0 0 0 6 14H4V6c0-1.104.896-2 2-2h2c.552 0 1 .448 1 1s-.448 1-1 1H6v8h1.586l1.707 1.707c.195.195.451.293.707.293h7c.552 0 1 .448 1 1s-.448 1-1 1H7.414l-.707-.707A.997.997 0 0 0 6 16H4c-.552 0-1-.448-1-1s.448-1 1-1h1.586l1.707 1.707z"/></svg></span>}
  sx={{
    mt: 2,
    fontWeight: 700,
    fontSize: 18,
    borderRadius: 3,
    boxShadow: 3,
    letterSpacing: 1,
    transition: 'all 0.2s',
    '&:hover': {
      bgcolor: '#d81b60',
      boxShadow: 6,
      transform: 'scale(1.04)',
    },
  }}
  onClick={handleCheckout}
  disabled={!user}
>
  Đặt hàng & Thanh toán
</Button>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </>
      )}
    </Box>
  );
}
