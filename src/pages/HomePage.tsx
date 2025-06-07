import { Box, Container, Typography, Card, CardContent, CardMedia, Button, Stack } from '@mui/material';
import CakeIcon from '@mui/icons-material/Cake';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useAuth } from '../features/auth/AuthContext';

const bannerUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80';

const categories = [
  { label: 'Sinh nhật', icon: <CakeIcon sx={{ fontSize: 36, color: '#ab47bc' }} /> },
  { label: 'Tình yêu', icon: <FavoriteIcon sx={{ fontSize: 36, color: '#e91e63' }} /> },
  { label: 'Khai trương', icon: <EmojiEventsIcon sx={{ fontSize: 36, color: '#1976d2' }} /> },
  { label: 'Bán chạy', icon: <StarIcon sx={{ fontSize: 36, color: '#ff9800' }} /> },
];

const featuredFlowers = [
  {
    name: 'Hoa Hồng Đỏ',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    desc: 'Biểu tượng của tình yêu nồng cháy',
    category: 'Tình yêu',
    price: 350000,
    bestSeller: true,
  },
  {
    name: 'Hoa Cẩm Chướng',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    desc: 'Sự ngọt ngào và tinh tế',
    category: 'Sinh nhật',
    price: 290000,
    bestSeller: false,
  },
  {
    name: 'Hoa Hướng Dương',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
    desc: 'Đại diện cho niềm tin và hy vọng',
    category: 'Khai trương',
    price: 320000,
    bestSeller: true, 
  },
];

export default function HomePage() {
  const { user } = useAuth();
  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fffbe7 0%, #ffe0ec 100%)' }}>
      {/* Banner quảng cáo */}
      {user && (
        <Container maxWidth="md" sx={{ mb: 2 }}>
          <Typography variant="h5" fontWeight={700} color="#e91e63" align="center">
            Xin chào, {user.name}!
          </Typography>
        </Container>
      )}
      <Box sx={{ width: '100%', height: { xs: 180, md: 320 }, background: `url(${bannerUrl}) center/cover`, borderRadius: 4, mb: 4, position: 'relative', overflow: 'hidden', boxShadow: 4 }}>
        <Box sx={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.45)' }} />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h3" fontWeight={700} color="#e91e63" sx={{ mt: { xs: 2, md: 0 } }}>
            Ưu đãi tháng 6: Giảm 20% cho đơn đầu tiên!
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            Giao hoa tận nơi, nhanh chóng, miễn phí khu vực nội thành.
          </Typography>
          <Button variant="contained" color="secondary" size="large" href="/products" sx={{ width: { xs: '100%', sm: 'auto' } }}>
            Mua ngay
          </Button>
        </Container>
      </Box>
      {/* Danh mục nổi bật */}
      <Container maxWidth="md" sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight={600} color="#e91e63" mb={2}>
          Danh mục nổi bật
        </Typography>
        <Stack direction="row" spacing={1.2} flexWrap="wrap" justifyContent="center">
          {categories.map((cat) => (
            <Box
              key={cat.label}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #fffbe7 60%, #ffe0ec 100%)',
                borderRadius: 3,
                boxShadow: 3,
                px: 2.5,
                py: 1,
                minWidth: 110,
                minHeight: 68,
                maxWidth: 140,
                maxHeight: 90,
                height: 80,
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-8px) scale(1.09)',
                  boxShadow: 6,
                  background: 'linear-gradient(135deg, #ffe0ec 40%, #fffbe7 100%)',
                },
                m: { xs: 0.5, sm: 0.8 },
              }}
              component="a"
              href={cat.label === 'Bán chạy' ? '/bestseller' : `/products?occasion=${encodeURIComponent(cat.label)}`}
            >
              <Box sx={{ mb: 0.3, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>{cat.icon}</Box>
              <Typography fontWeight={600} color="#e91e63" sx={{ fontSize: 13, textAlign: 'center', width: '100%' }}>{cat.label}</Typography>
            </Box>
          ))}
        </Stack>
      </Container>
      {/* Sản phẩm bán chạy */}
      <Container maxWidth="md" sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight={600} color="#e91e63" mb={2}>
          Sản phẩm bán chạy
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
          {featuredFlowers.filter(f => f.bestSeller).map((flower) => (
            <Card key={flower.name} sx={{ borderRadius: 4, boxShadow: 6, width: 320, maxWidth: '90vw', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.04)' } }}>
              <CardMedia
                component="img"
                height="180"
                image={flower.image}
                alt={flower.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6" fontWeight={600} color="#e91e63">
                  {flower.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  {flower.desc}
                </Typography>
                <Typography variant="subtitle1" color="primary" fontWeight={700}>
                  {flower.price.toLocaleString()}đ
                </Typography>
                <Button variant="outlined" color="secondary" fullWidth href="/products">
                  Xem chi tiết
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
