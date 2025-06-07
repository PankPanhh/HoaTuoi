import { Container, Typography, Box, Card, CardMedia, CardContent, Button } from '@mui/material';
import { allProducts } from '../data/all-products';
import { Link } from 'react-router-dom';
import { useState } from 'react';

// Lọc sản phẩm bán chạy dựa trên trường bestSeller
const bestSellerProducts = allProducts.filter((p: any) => p.bestSeller === true);

export default function BestSellerPage() {
  const [search, setSearch] = useState('');
  const filteredProducts = bestSellerProducts.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(120deg, #fff1f8 0%, #f8faff 100%)', py: 6 }}>
      {/* Hero section */}
      <Container maxWidth="md" sx={{ mb: 5 }}>
        <Box sx={{
          background: 'linear-gradient(90deg, #fceabb 0%, #f8bfae 100%)',
          borderRadius: 6,
          p: { xs: 3, sm: 6 },
          textAlign: 'center',
          boxShadow: 6,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <Typography variant="h2" fontWeight={900} color="#e91e63" mb={2} sx={{ letterSpacing: 2 }}>
            🌸 Best Seller 🌸
          </Typography>
          <Typography variant="h5" color="text.secondary" mb={1}>
            Những bó hoa được yêu thích nhất, lựa chọn hàng đầu của khách hàng!
          </Typography>
        </Box>
      </Container>
      {/* Search bar */}
      <Container maxWidth="sm" sx={{ mb: 4 }}>
        <Box display="flex" justifyContent="center">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm bán chạy..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              padding: '14px 22px',
              borderRadius: 32,
              border: '1.5px solid #e0e0e0',
              minWidth: 340,
              fontSize: 18,
              outline: 'none',
              boxShadow: '0 4px 16px #f8bbd0',
              background: '#fff',
              transition: 'box-shadow 0.2s',
            }}
          />
        </Box>
      </Container>
      {/* Product grid */}
      <Container maxWidth="lg">
        <Box display="flex" flexWrap="wrap" mx={-2}>
          {filteredProducts.length === 0 && (
            <Box sx={{ width: '100%' }}>
              <Typography color="text.secondary" align="center">Không tìm thấy sản phẩm phù hợp.</Typography>
            </Box>
          )}
          {filteredProducts.map(product => (
            <Box key={product.id} sx={{ width: { xs: '100%', sm: '50%', md: '33.333%' }, display: 'flex', p: 2, boxSizing: 'border-box' }}>
              <Card sx={{ borderRadius: 6, boxShadow: 8, height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'scale(1.03)', boxShadow: 16 }, background: 'linear-gradient(120deg, #fffde7 0%, #ffe0ec 100%)' }}>
                {/* Ribbon badge */}
                <Box sx={{ position: 'absolute', top: 18, left: -18, zIndex: 2, transform: 'rotate(-15deg)' }}>
                  <Box sx={{ background: 'linear-gradient(90deg, #ff9800 60%, #e91e63 100%)', color: '#fff', px: 3, py: 0.5, borderRadius: 2, fontWeight: 800, fontSize: 15, boxShadow: 3, letterSpacing: 1 }}>
                    Bán chạy
                  </Box>
                </Box>
                <CardMedia
                  component="img"
                  height="220"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: 'cover', borderTopLeftRadius: 24, borderTopRightRadius: 24, borderBottom: '2px solid #ffe0ec' }}
                />
                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 3 }}>
                  <div>
                    <Typography variant="h6" fontWeight={700} color="#e91e63" sx={{ mb: 1 }}>{product.name}</Typography>
                    <Typography variant="body2" color="text.secondary" mb={2} sx={{ minHeight: 48 }}>{product.description}</Typography>
                  </div>
                  <div>
                    <Typography variant="h5" color="primary" fontWeight={900} sx={{ mb: 1 }}>{product.price.toLocaleString()}đ</Typography>
                    <Button variant="contained" color="secondary" fullWidth sx={{ borderRadius: 99, fontWeight: 700, fontSize: 16, py: 1.2 }} component={Link} to={`/products/${product.id}`}>Xem chi tiết</Button>
                  </div>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
