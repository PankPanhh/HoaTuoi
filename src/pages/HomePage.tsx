import { Box, Container, Typography, Card, CardContent, CardMedia, Button, Stack } from '@mui/material';
import CakeIcon from '@mui/icons-material/Cake';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { allProducts } from '../data/all-products';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

const bannerUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80';

const categories = [
  { label: 'Sinh nhật', icon: <CakeIcon sx={{ fontSize: 36, color: '#ab47bc' }} /> },
  { label: 'Tình yêu', icon: <FavoriteIcon sx={{ fontSize: 36, color: '#e91e63' }} /> },
  { label: 'Khai trương', icon: <EmojiEventsIcon sx={{ fontSize: 36, color: '#1976d2' }} /> },
  { label: 'Bán chạy', icon: <StarIcon sx={{ fontSize: 36, color: '#ff9800' }} /> },
];

// Thay featuredFlowers thành sản phẩm mới nhất
const featuredFlowers = allProducts.slice(0, 3); // Lấy 3 sản phẩm mới nhất (hoặc tuỳ ý)

// Sample blog posts
const blogPosts = [
  {
    id: '1',
    title: 'Ý Nghĩa Các Loài Hoa',
    description: 'Khám phá ý nghĩa độc đáo của từng loài hoa, từ hoa hồng tượng trưng cho tình yêu đến hoa cúc mang ý nghĩa chân thành.',
    image: 'https://images.unsplash.com/photo-1505751104546-4b63c0a32feb?auto=format&fit=crop&w=1200&q=80',
    date: '14 Th6, 2025',
    views: '1.2K',
    comments: '52',
  },
  {
    id: '2',
    title: 'Mẹo Bảo Quản Hoa Tươi Lâu',
    description: 'Tìm hiểu cách giữ hoa tươi lâu hơn với những mẹo đơn giản như cắt cành đúng cách và sử dụng chất bảo quản tự nhiên.',
    image: 'https://images.unsplash.com/photo-1591017682666-7f4a6146e6af?auto=format&fit=crop&w=1200&q=80',
    date: '12 Th6, 2025',
    views: '850',
    comments: '28',
  },
  {
    id: '3',
    title: 'Xu Hướng Quà Tặng Hoa 2025',
    description: 'Cập nhật những xu hướng quà tặng hoa mới nhất, từ bó hoa hiện đại đến hộp hoa sang trọng cho mọi dịp đặc biệt.',
    image: 'https://images.unsplash.com/photo-1525310072745-f49212b8a884?auto=format&fit=crop&w=1200&q=80',
    date: '10 Th6, 2025',
    views: '1.5K',
    comments: '75',
  },
];

export default function HomePage() {
  const [showPromo, setShowPromo] = useState(true);

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fffbe7 0%, #ffe0ec 100%)' }}>
      {/* Popup khuyến mãi */}
      {showPromo && (
        <Box sx={{
          position: 'fixed',
          bottom: { xs: 16, md: 32 },
          right: { xs: 16, md: 32 },
          zIndex: 1300,
          bgcolor: '#fff',
          borderRadius: 3,
          boxShadow: 8,
          px: 3,
          py: 2,
          minWidth: 260,
          maxWidth: 340,
          border: '2px solid #e91e63',
          display: 'flex',
          alignItems: 'flex-start',
        }}>
          <Box sx={{ flex: 1 }}>
            <Typography fontWeight={700} color="#e91e63" mb={0.5}>
              🎁 Ưu đãi đặc biệt tháng 6!
            </Typography>
            <Typography fontSize={15} color="text.secondary">
              - Giảm 20% cho đơn đầu tiên<br />
              - Miễn phí giao hàng nội thành<br />
              - Tặng thiệp chúc mừng xinh xắn
            </Typography>
          </Box>
          <Button onClick={() => setShowPromo(false)} size="small" sx={{ minWidth: 0, ml: 1, color: '#e91e63' }}>
            <CloseIcon />
          </Button>
        </Box>
      )}
      {/* Banner quảng cáo */}
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
      {/* Sản phẩm mới */}
      <Container maxWidth="md" sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight={600} color="#e91e63" mb={2}>
          Sản phẩm mới
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
          {featuredFlowers.map((flower) => (
            <Card key={flower.id || flower.name} sx={{ borderRadius: 4, boxShadow: 6, width: 320, maxWidth: '90vw', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.04)' } }}>
              <Box sx={{ position: 'relative', overflow: 'hidden', height: 180 }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={flower.image}
                  alt={flower.name}
                  sx={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
                <Box sx={{ position: 'absolute', top: 10, left: 10, bgcolor: '#00bcd4', color: '#fff', px: 1.5, py: 0.5, borderRadius: 2, fontWeight: 700, fontSize: 13, boxShadow: 2, zIndex: 2 }}>
                  Mới
                </Box>
              </Box>
              <CardContent>
                <Typography variant="h6" fontWeight={600} color="#e91e63">
                  {flower.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  {flower.description}
                </Typography>
                <Typography variant="subtitle1" color="primary" fontWeight={700}>
                  {flower.price.toLocaleString()}đ
                </Typography>
                <Button variant="outlined" color="secondary" fullWidth href={`/products/${flower.id}`}>
                  Xem chi tiết
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
      {/* Blog / Tin tức */}
      <Container maxWidth="md" sx={{ mb: 4 }}>
        {/* Header blog với mô tả và menu ngang chủ đề */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" fontWeight={600} color="#e91e63" mb={2}>
            Blog/ Tin tức
          </Typography>
        </Box>
        {/* Banner lớn blog */}
        <Box sx={{ width: '100%', height: { xs: 200, md: 340 }, background: `url(${blogPosts[0].image}) center/cover`, borderRadius: 4, mb: 3, position: 'relative', overflow: 'hidden', boxShadow: 6 }}>
          <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, #222b 60%, #fff0 100%)' }} />
          <Box sx={{ position: 'absolute', left: 0, bottom: 0, width: '100%', p: { xs: 2, md: 4 }, color: '#fff', zIndex: 2 }}>
            <Typography variant="h4" fontWeight={800} sx={{ textShadow: '0 2px 16px #000a', fontSize: { xs: 22, md: 32 }, mb: 1 }}>
              {blogPosts[0].title}
            </Typography>
            <Typography variant="subtitle1" sx={{ textShadow: '0 2px 8px #000a', mb: 1, fontSize: { xs: 14, md: 18 }, maxWidth: 600 }}>
              {blogPosts[0].description}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <Typography variant="caption" sx={{ fontWeight: 600, color: '#fff' }}>{blogPosts[0].date}</Typography>
              <Box sx={{ width: 4, height: 4, bgcolor: '#fff', borderRadius: '50%' }} />
              <Typography variant="caption" sx={{ color: '#fff' }}>{blogPosts[0].views} lượt xem</Typography>
              <Box sx={{ width: 4, height: 4, bgcolor: '#fff', borderRadius: '50%' }} />
              <Typography variant="caption" sx={{ color: '#fff' }}>{blogPosts[0].comments} bình luận</Typography>
            </Box>
            <Button variant="contained" color="secondary" size="medium" href={`/blog/${blogPosts[0].id}`} sx={{ fontWeight: 800, borderRadius: 2, mt: 1, px: 4, py: 1, fontSize: 17, boxShadow: 3, letterSpacing: 0.5 }}>
              Đọc thêm
            </Button>
          </Box>
        </Box>
        {/* Danh sách blog nhỏ */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
          {blogPosts.slice(1).map((post) => (
            <Box
              key={post.id}
              sx={{
                width: { xs: '100%', sm: 340, md: 370 },
                height: { xs: 180, sm: 210 },
                background: `url(${post.image}) center/cover`,
                borderRadius: 4,
                position: 'relative',
                overflow: 'hidden',
                boxShadow: 4,
                transition: 'transform 0.22s, box-shadow 0.22s',
                '&:hover': { transform: 'scale(1.03)', boxShadow: 10 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                border: '1.5px solid #ffe0ec',
              }}
            >
              <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, #222b 70%, #fff0 100%)', zIndex: 1 }} />
              <Box sx={{ position: 'relative', zIndex: 2, p: 2.5, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-end', height: '100%' }}>
                <Typography variant="h6" fontWeight={800} color="#fff" mb={0.5} sx={{ textShadow: '0 2px 8px #000a', fontSize: 18, letterSpacing: 0.5 }}>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="#fff" mb={1} sx={{ maxWidth: '98%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 500, fontSize: 14, textShadow: '0 2px 8px #000a' }}>
                  {post.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: '#fff' }}>{post.date}</Typography>
                  <Box sx={{ width: 4, height: 4, bgcolor: '#fff', borderRadius: '50%' }} />
                  <Typography variant="caption" sx={{ color: '#fff' }}>{post.views} lượt xem</Typography>
                  <Box sx={{ width: 4, height: 4, bgcolor: '#fff', borderRadius: '50%' }} />
                  <Typography variant="caption" sx={{ color: '#fff' }}>{post.comments} bình luận</Typography>
                </Box>
                <Button variant="contained" color="secondary" size="small" href={`/blog/${post.id}`} sx={{ fontWeight: 700, borderRadius: 2, mt: 1, px: 2.5, boxShadow: 1, letterSpacing: 0.5, fontSize: 15 }}>
                  Đọc thêm
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}