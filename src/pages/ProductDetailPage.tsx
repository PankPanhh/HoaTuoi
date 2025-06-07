import { useParams } from 'react-router-dom';
import { Box, Typography, CardMedia, Button, Chip, Stack, Divider, IconButton, Dialog, TextField, Alert, Snackbar } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import CloseIcon from '@mui/icons-material/Close';
import SwipeableViews from 'react-swipeable-views';
import { useRef, useState, useEffect } from 'react';
import { allProducts } from '../data/all-products';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = allProducts.find(p => p.id === id);
  const [imgIndex, setImgIndex] = useState(0);
  const [openZoom, setOpenZoom] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0.5, y: 0.5 });
  const autoPlayRef = useRef<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  // Tự động chuyển ảnh mỗi 3s khi không hover và không zoom
  useEffect(() => {
    if (!product) return;
    autoPlayRef.current = window.setInterval(() => {
      setImgIndex(idx => (idx + 1) % product.images.length);
    }, 3000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [product]);

  // Xử lý zoom theo vị trí chuột
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setZoomPos({ x, y });
  };

  // Thêm vào giỏ hàng
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const idx = cart.findIndex((item: any) => item.product.id === product.id && item.note === note);
    if (idx !== -1) {
      cart[idx].quantity += quantity;
    } else {
      cart.push({ product, quantity, note });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    setShowAlert(true);
  };

  if (!product) {
    return <Typography color="error" align="center" sx={{ mt: 6 }}>Không tìm thấy sản phẩm.</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4, background: 'linear-gradient(135deg, #fffbe7 60%, #ffe0ec 100%)', borderRadius: 4, boxShadow: 4, p: 3 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="center">
        <Box
          sx={{ position: 'relative', width: 320, height: 320, overflow: 'hidden' }}
          onMouseEnter={() => setZoom(true)}
          onMouseLeave={() => setZoom(false)}
          onMouseMove={handleMouseMove}
        >
          <SwipeableViews
            index={imgIndex}
            onChangeIndex={setImgIndex}
            enableMouseEvents
            style={{ borderRadius: 16 }}
          >
            {product.images.map((img) => (
              <Box key={img} sx={{ width: 320, height: 320, position: 'relative', overflow: 'hidden' }}>
                <CardMedia
                  component="img"
                  image={img}
                  alt={product.name}
                  sx={{
                    width: 320,
                    height: 320,
                    objectFit: 'cover',
                    borderRadius: 4,
                    boxShadow: 3,
                    cursor: 'zoom-in',
                    transition: 'transform 0.4s cubic-bezier(.4,2,.6,1)',
                    zIndex: 1,
                    transform: zoom
                      ? `scale(1.6) translate(${-((zoomPos.x - 0.5) * 100)}px, ${-((zoomPos.y - 0.5) * 100)}px)`
                      : 'scale(1) translate(0,0)'
                  }}
                  onClick={() => setOpenZoom(true)}
                />
              </Box>
            ))}
          </SwipeableViews>
          <IconButton
            onClick={() => setOpenZoom(true)}
            sx={{ position: 'absolute', bottom: 12, right: 12, bgcolor: 'rgba(255,255,255,0.7)' }}
          >
            <ZoomInIcon color="secondary" />
          </IconButton>
          <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 1 }}>
            {product.images.map((img, i) => (
              <Box
                key={img}
                sx={{
                  width: 36, height: 36, borderRadius: 2, overflow: 'hidden', border: imgIndex === i ? '2px solid #e91e63' : '2px solid #fff', cursor: 'pointer', boxShadow: 1
                }}
                onClick={() => setImgIndex(i)}
              >
                <img src={img} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
            ))}
          </Stack>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" fontWeight={700} color="#e91e63" mb={1}>{product.name}</Typography>
          <Typography variant="subtitle1" color="text.secondary" mb={2}>{product.description}</Typography>
          <Stack direction="row" spacing={1} mb={2}>
            <Chip label={product.category} color="secondary" />
            <Chip label={product.color} color="primary" />
            <Chip label={product.type} color="default" />
            <Chip label={product.occasion} color="success" />
          </Stack>
          <Typography variant="h5" color="primary" fontWeight={700} mb={2}>{product.price.toLocaleString()}đ</Typography>
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              sx={{ minWidth: 36, px: 0, fontWeight: 700 }}
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              disabled={quantity <= 1}
            >
              −
            </Button>
            <Typography variant="h6" sx={{ width: 32, textAlign: 'center' }}>{quantity}</Typography>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              sx={{ minWidth: 36, px: 0, fontWeight: 700 }}
              onClick={() => setQuantity(q => Math.min(99, q + 1))}
              disabled={quantity >= 99}
            >
              +
            </Button>
          </Stack>
          
          <Button variant="contained" color="secondary" size="large" sx={{ fontWeight: 600, px: 4 }} onClick={handleAddToCart}>
            Thêm vào giỏ hàng
          </Button>
          <Snackbar open={showAlert} autoHideDuration={2000} onClose={() => setShowAlert(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert severity="success" sx={{ width: '100%' }} onClose={() => setShowAlert(false)}>
              Đã thêm vào giỏ hàng!
            </Alert>
          </Snackbar>
        </Box>
      </Stack>
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" fontWeight={600} color="#e91e63" mb={1}>Mô tả chi tiết</Typography>
      <Typography color="text.secondary" mb={2}>{product.description}</Typography>
      {/* Dialog phóng to hình ảnh */}
      <Dialog open={openZoom} onClose={() => setOpenZoom(false)} maxWidth="md" fullWidth>
        <Box sx={{ position: 'relative', bgcolor: '#000', p: 2 }}>
          <IconButton onClick={() => setOpenZoom(false)} sx={{ position: 'absolute', top: 8, right: 8, color: '#fff', zIndex: 2 }}>
            <CloseIcon />
          </IconButton>
          <SwipeableViews
            index={imgIndex}
            onChangeIndex={setImgIndex}
            enableMouseEvents
            style={{ borderRadius: 8 }}
          >
            {product.images.map((img) => (
              <Box key={img} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400, bgcolor: '#000' }}>
                <img
                  src={img}
                  alt={product.name}
                  style={{ maxWidth: '90vw', maxHeight: '70vh', objectFit: 'contain', borderRadius: 8 }}
                />
              </Box>
            ))}
          </SwipeableViews>
        </Box>
      </Dialog>
    </Box>
  );
}