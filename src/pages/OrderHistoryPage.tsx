import { useEffect, useState } from 'react';
import { Box, Typography, Paper, Stepper, Step, StepLabel, Divider, Stack, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const STATUS_STEPS = [
  'Đang xử lý',
  'Đang đóng gói',
  'Đang vận chuyển',
  'Đã giao hàng',
];

// Giả sử phí ship cố định (có thể thay đổi theo logic kinh doanh)
const SHIPPING_FEE = 30000;

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('current-user') || 'null');
    if (user && user.email) {
      fetch(`/api/users?email=${encodeURIComponent(user.email)}`)
        .then(res => res.ok ? res.json() : user)
        .then(freshUser => {
          localStorage.setItem('current-user', JSON.stringify(freshUser));
          if (Array.isArray(freshUser.orderHistory)) {
            const updatedOrders = freshUser.orderHistory.map((order: any, index: number) => {
              const originalTotal = order.cart.reduce((sum: number, i: any) => sum + i.product.price * i.quantity, 0);
              // Giả sử đơn đầu tiên là đơn có index 0 (dựa trên thứ tự mảng orderHistory, sớm nhất trước)
              const isFirstOrder = index === 0;
              const discount = isFirstOrder ? originalTotal * 0.2 : 0; // Giảm 20% cho đơn đầu tiên
              const shippingFee = order.form.recipientAddress ? (order.form.recipientAddress.toLowerCase().includes('hà nội') || order.form.recipientAddress.toLowerCase().includes('tp hcm') || order.form.recipientAddress.toLowerCase().includes('thành phố hồ chí minh') ? 0 : SHIPPING_FEE) : SHIPPING_FEE;
              const finalTotal = originalTotal - discount + shippingFee;
              return {
                ...order,
                discountApplied: isFirstOrder,
                shippingFee,
                finalTotal,
              };
            });
            setOrders(updatedOrders);
          } else {
            setOrders([]);
          }
        });
    }
  }, []);

  if (!orders.length) {
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 6, p: 3, borderRadius: 4, boxShadow: 3, background: '#fff' }}>
        <Typography align="center" color="text.secondary">Bạn chưa có đơn hàng nào.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, mb: 6 }}>
      <Typography variant="h5" fontWeight={700} color="#e91e63" mb={3} align="center">
        Lịch sử đơn hàng
      </Typography>
      <Stack spacing={3}>
        {orders.map(order => (
          <Paper key={order.id} sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
            <Typography fontWeight={600} color="#e91e63" mb={1}>
              Đơn #{order.id} - {new Date(order.createdAt).toLocaleString('vi-VN')}
            </Typography>
            <Stepper activeStep={STATUS_STEPS.indexOf(order.status)} alternativeLabel sx={{ mb: 2 }}>
              {STATUS_STEPS.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Divider sx={{ mb: 1 }} />
            {order.cart.map((item: any, idx: number) => (
              <Box key={item.product.id + idx} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <img src={item.product.image} alt={item.product.name} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, marginRight: 10 }} />
                <Box sx={{ flex: 1 }}>
                  <Typography fontWeight={600}>{item.product.name}</Typography>
                  <Typography color="text.secondary" fontSize={14}>
                    SL: {item.quantity} x {item.product.price.toLocaleString()}₫
                  </Typography>
                </Box>
                <Typography fontWeight={700} color="#e91e63">
                  {(item.product.price * item.quantity).toLocaleString()}₫
                </Typography>
              </Box>
            ))}
            <Divider sx={{ my: 1 }} />
            <Typography color="text.secondary" fontSize={14}>
              Tổng cộng: <b style={{ color: '#e91e63' }}>{order.cart.reduce((sum: number, i: any) => sum + i.product.price * i.quantity, 0).toLocaleString()}₫</b>
              {order.discountApplied && (
                <Typography component="span" color="text.secondary" ml={1} fontWeight={600}>
                  (Giảm 20%: -{(order.cart.reduce((sum: number, i: any) => sum + i.product.price * i.quantity, 0) * 0.2).toLocaleString()}₫)
                </Typography>
              )}
            </Typography>
            <Typography color="text.secondary" fontSize={14}>
              Phí ship: <b style={{ color: '#e91e63' }}>{order.shippingFee.toLocaleString()}₫</b>
            </Typography>
            <Typography color="text.secondary" fontSize={14} fontWeight={600}>
              Tổng cuối cùng: <b style={{ color: '#e91e63' }}>{order.finalTotal.toLocaleString()}₫</b>
            </Typography>
            <Button variant="outlined" color="secondary" sx={{ mt: 1 }} onClick={() => { setSelectedOrder(order); setOpenDetail(true); }}>
              Xem chi tiết
            </Button>
          </Paper>
        ))}
      </Stack>
      {/* Dialog chi tiết đơn hàng */}
      <Dialog open={openDetail} onClose={() => setOpenDetail(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Chi tiết đơn hàng</DialogTitle>
        <DialogContent dividers>
          {selectedOrder && (
            <Box>
              <Typography fontWeight={600} color="#e91e63" mb={1}>
                Đơn #{selectedOrder.id} - {new Date(selectedOrder.createdAt).toLocaleString('vi-VN')}
              </Typography>
              <Typography fontWeight={600} mb={1}>Trạng thái: <span style={{ color: '#e91e63' }}>{selectedOrder.status}</span></Typography>
              <Typography fontWeight={600} mt={2}>Người nhận:</Typography>
              <Typography>Họ tên: {selectedOrder.form.recipientName}</Typography>
              <Typography>SĐT: {selectedOrder.form.recipientPhone}</Typography>
              <Typography>Địa chỉ: {selectedOrder.form.recipientAddress}</Typography>
              {selectedOrder.form.recipientNote && <Typography>Ghi chú: {selectedOrder.form.recipientNote}</Typography>}
              <Typography fontWeight={600} mt={2}>Người đặt:</Typography>
              <Typography>Họ tên: {selectedOrder.form.senderName}</Typography>
              <Typography>Email: {selectedOrder.form.senderEmail}</Typography>
              <Typography>SĐT: {selectedOrder.form.senderPhone}</Typography>
              {selectedOrder.form.senderMessage && <Typography>Lời nhắn: {selectedOrder.form.senderMessage}</Typography>}
              <Typography mt={2} fontWeight={600}>Hình thức thanh toán: <span style={{ color: '#e91e63' }}>{selectedOrder.form.paymentMethod === 'online' ? 'Thanh toán online' : 'Thanh toán khi nhận hàng'}</span></Typography>
              <Divider sx={{ my: 2 }} />
              <Typography fontWeight={600} mb={1}>Sản phẩm:</Typography>
              {selectedOrder.cart.map((item: any, idx: number) => (
                <Box key={item.product.id + idx} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <img src={item.product.image} alt={item.product.name} style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 8, marginRight: 10 }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography fontWeight={600}>{item.product.name}</Typography>
                    <Typography color="text.secondary" fontSize={13}>
                      SL: {item.quantity} x {item.product.price.toLocaleString()}₫
                    </Typography>
                  </Box>
                  <Typography fontWeight={700} color="#e91e63">
                    {(item.product.price * item.quantity).toLocaleString()}₫
                  </Typography>
                </Box>
              ))}
              <Divider sx={{ my: 1 }} />
              <Typography color="text.secondary" fontSize={14}>
                Tổng cộng: <b style={{ color: '#e91e63' }}>{selectedOrder.cart.reduce((sum: number, i: any) => sum + i.product.price * i.quantity, 0).toLocaleString()}₫</b>
                {selectedOrder.discountApplied && (
                  <Typography component="span" color="text.secondary" ml={1} fontWeight={600}>
                    (Giảm 20%: -{(selectedOrder.cart.reduce((sum: number, i: any) => sum + i.product.price * i.quantity, 0) * 0.2).toLocaleString()}₫)
                  </Typography>
                )}
              </Typography>
              <Typography color="text.secondary" fontSize={14}>
                Phí ship: <b style={{ color: '#e91e63' }}>{selectedOrder.shippingFee.toLocaleString()}₫</b>
              </Typography>
              <Typography color="text.secondary" fontSize={14} fontWeight={600}>
                Tổng cuối cùng: <b style={{ color: '#e91e63' }}>{selectedOrder.finalTotal.toLocaleString()}₫</b>
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDetail(false)} color="secondary">Đóng</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}