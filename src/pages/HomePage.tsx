import React, { useState } from 'react';
import { Box, Container, Typography, Card, CardContent, CardMedia, Button, Stack } from '@mui/material';
import CakeIcon from '@mui/icons-material/Cake';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { allProducts } from '../data/all-products';
import CloseIcon from '@mui/icons-material/Close';
import ReviewSection from '../components/ReviewSection';
import { Link } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Hàm kiểm tra sản phẩm mới (giả định 5 sản phẩm đầu tiên là mới dựa trên thứ tự trong allProducts và không phải bestSeller)
const isNewProduct = (product: typeof allProducts[0], index: number) => !product.bestSeller && index < 5;

const bannerUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80';

const categories = [
  { label: 'Sinh nhật', icon: <CakeIcon sx={{ fontSize: 36, color: '#ab47bc' }} /> },
  { label: 'Tình yêu', icon: <FavoriteIcon sx={{ fontSize: 36, color: '#e91e63' }} /> },
  { label: 'Khai trương', icon: <EmojiEventsIcon sx={{ fontSize: 36, color: '#1976d2' }} /> },
  { label: 'Khuyến Mãi', icon: <StarIcon sx={{ fontSize: 36, color: '#ff9800' }} /> },
];

// Giữ nguyên sản phẩm mới nhất
const featuredFlowers = allProducts.filter((p) => !p.bestSeller).slice(0, 3); // Lấy 3 sản phẩm mới nhất không phải bestSeller

// Thêm sản phẩm khuyến mãi
const promotedFlowers = allProducts.filter((flower) => (flower.promotion ?? 0) > 0).slice(0, 6); // Lấy 6 sản phẩm khuyến mãi đầu tiên

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
  const [copied, setCopied] = useState(false);
  // Banner carousel state
  const banners = [
    {
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80',
      content: (
        <Typography variant="h5" sx={{ color: '#e91e63', fontWeight: 900, fontSize: { xs: 18, md: 28 }, letterSpacing: 1, textShadow: '0 2px 12px #fff, 0 2px 16px #e91e634' }}>
          Nhập mã <Box component="span" sx={{ background: '#e91e63', color: '#fff', px: 2, py: 0.7, borderRadius: 2, fontWeight: 900, fontSize: 22, mx: 1, letterSpacing: 2, boxShadow: '0 2px 8px #e91e634' }}>SALE30</Box> để giảm ngay 30% tổng đơn hàng!
        </Typography>
      ),
      button: (
        <Button
          variant="contained"
          color="secondary"
          sx={{ borderRadius: 99, fontWeight: 700, fontSize: 18, px: 3, py: 1.2, boxShadow: '0 2px 12px #f8bbd0', background: '#e91e63', color: '#fff', mt: 2, '&:hover': { background: '#ff9800', color: '#fff', boxShadow: '0 4px 16px #ff9800a0' } }}
          onClick={() => {
            navigator.clipboard.writeText('SALE30');
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
        >
          Sao chép mã
        </Button>
      ),
      extra: copied && (
        <Box sx={{ position: 'absolute', top: 18, right: 36, background: '#fff', color: '#e91e63', px: 2, py: 0.5, borderRadius: 2, fontWeight: 700, fontSize: 16, boxShadow: 2, zIndex: 2, transition: 'opacity 0.2s', opacity: 1 }}>
          Đã sao chép!
        </Box>
      )
    },
    {
      image: bannerUrl,
      content: (
        <>
          <Typography variant="h3" fontWeight={800} color="#e91e63" sx={{ mt: { xs: 2, md: 0 }, textShadow: '0 2px 16px #fff, 0 2px 16px #e91e634', fontSize: { xs: 22, md: 36 } }}>
            Ưu đãi tháng 6: Giảm 20% cho đơn đầu tiên!
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2, textShadow: '0 2px 8px #fff' }}>
            Giao hoa tận nơi, nhanh chóng, miễn phí khu vực nội thành.
          </Typography>
        </>
      ),
      button: (
        <Button variant="contained" color="secondary" size="large" href="/products" sx={{ width: { xs: '100%', sm: 'auto' }, fontWeight: 800, fontSize: 18, borderRadius: 99, px: 4, py: 1.2, mt: 2, boxShadow: '0 2px 12px #f8bbd0', background: '#e91e63', color: '#fff', '&:hover': { background: '#ff9800', color: '#fff', boxShadow: '0 4px 16px #ff9800a0' } }}>
          Mua ngay
        </Button>
      ),
      extra: null
    }
  ];
  const [bannerIdx, setBannerIdx] = useState(0);
  const [hoverBanner, setHoverBanner] = useState(false);
  // Auto slide effect
  React.useEffect(() => {
    if (!hoverBanner) {
      const timer = setInterval(() => {
        setBannerIdx(idx => (idx + 1) % banners.length);
      }, 3500);
      return () => clearInterval(timer);
    }
  }, [hoverBanner, banners.length]);

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fffbe7 0%, #ffe0ec 100%)' }}>
      {/* Banner carousel đẹp hơn */}
      <Box
        sx={{
          width: '100%',
          height: { xs: 200, md: 360 },
          background: `url(${banners[bannerIdx].image}) center/cover`,
          borderRadius: 5,
          mb: 5,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 6,
          transition: 'background-image 0.7s cubic-bezier(.4,2,.6,1)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseEnter={() => setHoverBanner(true)}
        onMouseLeave={() => setHoverBanner(false)}
      >
        {/* Overlay gradient cho text nổi bật */}
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #fffbe7cc 0%, #ffe0ec99 100%)' }} />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', px: { xs: 2, md: 6 } }}>
          {banners[bannerIdx].content}
          {banners[bannerIdx].button}
        </Container>
        {banners[bannerIdx].extra}
        {/* Nút chuyển banner trái/phải đẹp hơn */}
        {hoverBanner && (
          <>
            <Button
              onClick={e => { e.stopPropagation(); setBannerIdx(idx => (idx - 1 + banners.length) % banners.length); }}
              sx={{ position: 'absolute', top: '50%', left: 18, transform: 'translateY(-50%)', minWidth: 0, bgcolor: '#fff', color: '#e91e63', borderRadius: '50%', boxShadow: 3, p: 1.2, zIndex: 3, '&:hover': { bgcolor: '#ffe0ec', color: '#ff9800', boxShadow: 6 }, transition: 'all 0.2s' }}
            >
              <ArrowBackIosNewIcon sx={{ fontSize: 28 }} />
            </Button>
            <Button
              onClick={e => { e.stopPropagation(); setBannerIdx(idx => (idx + 1) % banners.length); }}
              sx={{ position: 'absolute', top: '50%', right: 18, transform: 'translateY(-50%)', minWidth: 0, bgcolor: '#fff', color: '#e91e63', borderRadius: '50%', boxShadow: 3, p: 1.2, zIndex: 3, '&:hover': { bgcolor: '#ffe0ec', color: '#ff9800', boxShadow: 6 }, transition: 'all 0.2s' }}
            >
              <ArrowForwardIosIcon sx={{ fontSize: 28 }} />
            </Button>
          </>
        )}
        {/* Dot indicator */}
        <Box sx={{ position: 'absolute', bottom: 18, left: 0, width: '100%', display: 'flex', justifyContent: 'center', gap: 1.5, zIndex: 4 }}>
          {banners.map((_, i) => (
            <Box
              key={i}
              onClick={e => { e.stopPropagation(); setBannerIdx(i); }}
              sx={{ width: bannerIdx === i ? 18 : 10, height: 10, borderRadius: 99, bgcolor: bannerIdx === i ? '#e91e63' : '#fff', boxShadow: bannerIdx === i ? 3 : 1, cursor: 'pointer', transition: 'all 0.22s', border: bannerIdx === i ? '2px solid #ff9800' : '1.5px solid #e91e63', mx: 0.5 }}
            />
          ))}
        </Box>
      </Box>
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
              component={Link}
              to={cat.label === 'Khuyến Mãi' ? '/promotion' : `/products?occasion=${encodeURIComponent(cat.label)}`}
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
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1 }}>
          {featuredFlowers.map((flower) => (
            <Box key={flower.id || flower.name} sx={{ width: { xs: '100%', sm: '50%', md: '33.333%' }, display: 'flex', p: 1, boxSizing: 'border-box' }}>
              <Card sx={{ borderRadius: 4, boxShadow: 4, height: 380, width: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.2s', '&:hover': { transform: 'scale(1.08)', boxShadow: 8 } }}>
                <Box sx={{ position: 'relative', overflow: 'hidden', height: 180 }}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={flower.image}
                    alt={flower.name}
                    sx={{ objectFit: 'cover', width: '100%', height: '100%', transition: 'transform 0.3s cubic-bezier(.4,2,.6,1)', '&:hover': { transform: 'scale(1.18)' } }}
                  />
                  {isNewProduct(flower, allProducts.findIndex(p => p.id === flower.id)) && (
                    <Box sx={{ position: 'absolute', top: 10, left: 10, bgcolor: '#00bcd4', color: '#fff', px: 1.5, py: 0.5, borderRadius: 2, fontWeight: 700, fontSize: 13, boxShadow: 2, zIndex: 2 }}>
                      Mới
                    </Box>
                  )}
                </Box>
                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2.2 }}>
                  <div>
                    <Typography variant="h6" fontWeight={600} color="#e91e63" sx={{ fontSize: 17, mb: 0.3, lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%', display: 'block', '@media (max-width: 600px)': { fontSize: 15 } }} title={flower.name}>
                      {flower.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={0.7} sx={{ minHeight: 31, fontSize: 15, overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', maxHeight: 42, '@media (max-width: 600px)': { fontSize: 13 } }} title={flower.description}>
                      {flower.description}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="subtitle1" color="primary" fontWeight={700} sx={{ fontSize: 16, lineHeight: 1.2, '@media (max-width: 600px)': { fontSize: 14 } }}>
                      {flower.price.toLocaleString()}đ
                    </Typography>
                    <Button variant="outlined" color="secondary" fullWidth sx={{ mt: 0.7, fontSize: 15, py: 0.7, minHeight: 0, '@media (max-width: 600px)': { fontSize: 13 } }} href={`/products/${flower.id}`}>
                      Xem chi tiết
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
      {/* Sản phẩm khuyến mãi */}
      <Container maxWidth="md" sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight={600} color="#e91e63" mb={2}>
          Sản phẩm khuyến mãi
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1 }}>
          {promotedFlowers.map((flower) => (
            <Box key={flower.id || flower.name} sx={{ width: { xs: '100%', sm: '50%', md: '33.333%' }, display: 'flex', p: 1, boxSizing: 'border-box' }}>
              <Card sx={{ borderRadius: 4, boxShadow: 4, height: 380, width: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.2s', '&:hover': { transform: 'scale(1.08)', boxShadow: 8 } }}>
                <Box sx={{ position: 'relative', overflow: 'hidden', height: 180 }}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={flower.image}
                    alt={flower.name}
                    sx={{ objectFit: 'cover', width: '100%', height: '100%', transition: 'transform 0.3s cubic-bezier(.4,2,.6,1)', '&:hover': { transform: 'scale(1.18)' } }}
                  />
                  <Box sx={{ position: 'absolute', top: 10, left: 10, bgcolor: '#ff5722', color: '#fff', px: 1.5, py: 0.5, borderRadius: 2, fontWeight: 700, fontSize: 13, boxShadow: 2, zIndex: 2 }}>
                    -{flower.promotion}%
                  </Box>
                </Box>
                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2.2 }}>
                  <div>
                    <Typography variant="h6" fontWeight={600} color="#e91e63" sx={{ fontSize: 17, mb: 0.3, lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%', display: 'block', '@media (max-width: 600px)': { fontSize: 15 } }} title={flower.name}>
                      {flower.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={0.7} sx={{ minHeight: 31, fontSize: 15, overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', maxHeight: 42, '@media (max-width: 600px)': { fontSize: 13 } }} title={flower.description}>
                      {flower.description}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="subtitle1" color="primary" fontWeight={700} sx={{ fontSize: 16, lineHeight: 1.2, '@media (max-width: 600px)': { fontSize: 14 } }}>
                      {(flower.price * (1 - ((flower.promotion ?? 0) / 100))).toLocaleString()}đ <Typography component="span" color="text.secondary" sx={{ textDecoration: 'line-through', ml: 1, fontSize: 14 }}>{flower.price.toLocaleString()}đ</Typography>
                    </Typography>
                    <Button variant="outlined" color="secondary" fullWidth sx={{ mt: 0.7, fontSize: 15, py: 0.7, minHeight: 0, '@media (max-width: 600px)': { fontSize: 13 } }} href={`/products/${flower.id}`}>
                      Xem chi tiết
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Box>
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
      {/* Đánh giá khách hàng */}
      <Container maxWidth="md">
        <ReviewSection />
      </Container>
    </Box>
  );
}