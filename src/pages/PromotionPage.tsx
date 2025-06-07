import { Container, Typography, Box, Card, CardMedia, CardContent, Button, Pagination, InputAdornment, TextField } from '@mui/material';
import { allProducts } from '../data/all-products';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

// Lọc sản phẩm có khuyến mãi dựa trên trường promotion
const promotionProducts = allProducts.filter((p: any) => !!p.promotion && p.promotion > 0);

export default function PromotionPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const productsPerPage = 6;

  const filteredProducts = promotionProducts.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.description.toLowerCase().includes(search.toLowerCase())
  );

  // Tính toán số trang và sản phẩm hiển thị trên trang hiện tại
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice((page - 1) * productsPerPage, page * productsPerPage);

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(120deg, #fff1f8 0%, #f8faff 100%)', py: 6, position: 'relative' }}>
      {/* Hero section */}
      <Container maxWidth="md" sx={{ mb: 6, position: 'relative' }}>
        {/* Decorative flower background */}
        <Box sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: 220, sm: 320 },
          height: { xs: 220, sm: 320 },
          opacity: 0.13,
          zIndex: 0,
          background: 'url(/vite.svg) center/cover no-repeat',
          filter: 'blur(2px)',
        }} />
        <Box sx={{
          background: 'linear-gradient(90deg, #fceabb 0%, #f8bfae 100%)',
          borderRadius: 8,
          p: { xs: 4, sm: 6 },
          textAlign: 'center',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          position: 'relative',
          overflow: 'hidden',
          transition: 'transform 0.3s ease',
          '&:hover': { transform: 'scale(1.02)' },
          '::after': {
            content: '""',
            position: 'absolute',
            right: -60,
            top: -40,
            width: 200,
            height: 200,
            background: 'radial-gradient(circle, #ffe0ec 60%, #fff0 100%)',
            opacity: 0.6,
            zIndex: 0,
            borderRadius: '50%',
          },
        }}>
          <Typography variant="h2" fontWeight={900} color="#e91e63" mb={2} sx={{ letterSpacing: 2, zIndex: 1, position: 'relative', fontSize: { xs: 28, sm: 44 }, textShadow: '0 2px 12px #fff' }}>
            🌸 Khuyến Mãi Đặc Biệt 🌸
          </Typography>
          <Typography variant="h5" color="text.secondary" mb={3} sx={{ zIndex: 1, position: 'relative', fontSize: { xs: 16, sm: 20 } }}>
            Khám phá các bó hoa đang được giảm giá hấp dẫn, đừng bỏ lỡ cơ hội!
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            component={Link}
            to="/products"
            sx={{ borderRadius: 99, fontWeight: 700, px: 4, py: 1.5, zIndex: 1, boxShadow: '0 4px 12px rgba(0,0,0,0.2)', fontSize: 20, letterSpacing: 1 }}
          >
            Mua Ngay
          </Button>
        </Box>
      </Container>
      {/* Search bar */}
      <Container maxWidth="sm" sx={{ mb: 5 }}>
        <Box display="flex" justifyContent="center">
          <TextField
            placeholder="Tìm kiếm sản phẩm khuyến mãi..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#e91e63', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.2)' } }} />
                </InputAdornment>
              ),
            }}
            sx={{
              maxWidth: 500,
              '& .MuiOutlinedInput-root': {
                borderRadius: 32,
                background: '#fff',
                boxShadow: '0 4px 16px #f8bbd0',
                transition: 'box-shadow 0.2s, transform 0.2s',
                '&:hover': {
                  boxShadow: '0 6px 20px #f8bbd0',
                  transform: 'translateY(-2px) scale(1.03)',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: '1.5px solid #e0e0e0',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#e91e63',
                },
              },
              '& input': {
                padding: '12px 14px',
                fontSize: 18,
              },
            }}
          />
        </Box>
      </Container>
      {/* Product grid */}
      <Container maxWidth="lg">
        <Box display="flex" flexWrap="wrap" mx={-1}>
          {paginatedProducts.length === 0 && (
            <Box sx={{ width: '100%', py: 4 }}>
              <Typography color="text.secondary" align="center" variant="h6">
                Không tìm thấy sản phẩm khuyến mãi phù hợp.
              </Typography>
            </Box>
          )}
          {paginatedProducts.map(product => (
            <Box key={product.id} sx={{ width: { xs: '100%', sm: '50%', md: '33.333%' }, display: 'flex', p: 1.5, boxSizing: 'border-box' }}>
              <Card sx={{
                borderRadius: 6,
                boxShadow: '0 8px 32px 0 rgba(233,30,99,0.13)',
                height: 400,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                background: 'linear-gradient(120deg, #fffde7 0%, #ffe0ec 100%)',
                transition: 'transform 0.28s cubic-bezier(.4,2,.6,1), box-shadow 0.22s',
                '&:hover': { transform: 'scale(1.045) rotate(-1deg)', boxShadow: '0 16px 40px 0 #e91e6340' },
                overflow: 'visible',
              }}>
                {/* Ribbon badge */}
                <Box sx={{ position: 'absolute', top: 16, left: -12, zIndex: 2, transform: 'rotate(-13deg)', background: 'linear-gradient(90deg, #ff9800 60%, #e91e63 100%)', color: '#fff', px: 2.2, py: 0.7, borderRadius: 2, fontWeight: 900, fontSize: 15, boxShadow: 3, letterSpacing: 1, border: '2px solid #fff', textShadow: '0 2px 8px #e91e63', display: 'flex', alignItems: 'center', gap: 0.7 }}>
                  <span role="img" aria-label="sale">🔥</span> -{product.promotion}%
                </Box>
                <Box sx={{ position: 'relative', overflow: 'hidden', height: 190, borderTopLeftRadius: 6, borderTopRightRadius: 6 }}>
                  <CardMedia
                    component="img"
                    height="190"
                    image={product.image}
                    alt={product.name}
                    sx={{ objectFit: 'cover', width: '100%', height: '100%', transition: 'transform 0.35s cubic-bezier(.4,2,.6,1)', borderTopLeftRadius: 6, borderTopRightRadius: 6, boxShadow: '0 2px 12px #f8bbd0', '&:hover': { transform: 'scale(1.13) rotate(1deg)' } }}
                  />
                </Box>
                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2.5 }}>
                  <div>
                    <Typography variant="h6" fontWeight={800} color="#e91e63" sx={{ fontSize: 18, mb: 0.5, lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%', display: 'block', letterSpacing: 0.5 }} title={product.name}>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={1} sx={{ minHeight: 34, fontSize: 15, overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', maxHeight: 42 }} title={product.description}>
                      {product.description}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="h5" color="primary" fontWeight={900} sx={{ fontSize: 20, display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <span style={{ color: '#e91e63', fontWeight: 900 }}>{(product.price * (1 - ((product.promotion ?? 0) / 100))).toLocaleString()}đ</span>
                      <Typography component="span" color="text.secondary" sx={{ textDecoration: 'line-through', ml: 1, fontSize: 15 }}>{product.price.toLocaleString()}đ</Typography>
                    </Typography>
                    <Typography variant="body2" color="#e91e63" fontWeight={700} sx={{ mb: 1, fontSize: 14 }}>
                      Tiết kiệm: {(product.price * ((product.promotion ?? 0) / 100)).toLocaleString()}đ
                    </Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      component={Link}
                      to={`/products/${product.id}`}
                      sx={{ borderRadius: 99, fontWeight: 700, fontSize: 15, py: 1.1, boxShadow: '0 4px 12px #f8bbd0', letterSpacing: 0.5, transition: 'background 0.2s, box-shadow 0.2s, transform 0.2s', '&:hover': { boxShadow: '0 8px 20px #f8bbd0', background: 'linear-gradient(90deg, #e91e63 60%, #ff9800 100%)', color: '#fff', transform: 'scale(1.04)' } }}
                    >
                      Xem chi tiết
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, value) => setPage(value)}
              color="secondary"
              sx={{
                '& .MuiPaginationItem-root': {
                  fontSize: 16,
                  fontWeight: 600,
                  '&:hover': { backgroundColor: '#f8bbd0' },
                },
                '& .Mui-selected': {
                  backgroundColor: '#e91e63 !important',
                  color: '#fff',
                },
              }}
            />
          </Box>
        )}
      </Container>
      {/* Keyframes for ribbon pop */}
      <style>{`
        @keyframes ribbonPop {
          0% { transform: scale(0.7) rotate(-15deg); opacity: 0; }
          60% { transform: scale(1.15) rotate(-15deg); opacity: 1; }
          100% { transform: scale(1) rotate(-15deg); opacity: 1; }
        }
      `}</style>
    </Box>
  );
}