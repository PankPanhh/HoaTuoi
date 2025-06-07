import { Box, Container, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const post = {
  id: '2',
  title: 'Bí Quyết Giữ Hoa Tươi Lâu: Chuyên Gia Chia Sẻ',
  description: 'Bật mí những mẹo bảo quản hoa tươi đơn giản mà hiệu quả, giúp bó hoa của bạn luôn rực rỡ và bền lâu như ý.',
  image: 'https://images.unsplash.com/photo-1591017682666-7f4a6146e6af?auto=format&fit=crop&w=1200&q=80',
  date: '12 Th6, 2025',
  views: '850',
  comments: '28',
  content: `
    <h2 style="color:#e91e63;font-weight:700;">Tại sao hoa nhanh tàn?</h2>
    <p style="font-size:18px;">Hoa tươi là món quà tuyệt vời nhưng cũng rất "mong manh". Chỉ cần một vài bí quyết nhỏ, bạn sẽ giữ được vẻ đẹp của hoa lâu hơn mong đợi!</p>
    <ol style="font-size:17px;line-height:1.7;">
      <li><b>Cắt vát gốc hoa</b> bằng dao sắc, loại bỏ phần dập nát để hoa hút nước tốt hơn.</li>
      <li><b>Thay nước mỗi ngày</b>, rửa sạch bình và loại bỏ lá úa để tránh vi khuẩn phát triển.</li>
      <li><b>Thêm chất bảo quản tự nhiên</b>: vài giọt nước cốt chanh, đường hoặc aspirin giúp hoa tươi lâu hơn.</li>
      <li><b>Đặt hoa nơi mát mẻ</b>, tránh ánh nắng trực tiếp, gió mạnh và các thiết bị tỏa nhiệt.</li>
    </ol>
    <blockquote style="border-left:4px solid #e91e63;padding-left:16px;color:#e91e63;font-size:18px;margin:18px 0;">Chỉ cần chăm chút một chút, bó hoa của bạn sẽ luôn tươi tắn và rực rỡ!</blockquote>
    <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=900&q=80" alt="Bí quyết giữ hoa tươi lâu" style="width:100%;border-radius:12px;margin:18px 0;box-shadow:0 4px 24px #e91e6322;" />
    <p style="font-size:17px;">Áp dụng ngay những mẹo trên để tận hưởng vẻ đẹp của hoa lâu hơn mỗi ngày nhé!</p>
  `
};

export default function BlogPost2() {
  const navigate = useNavigate();
  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fffbe7 0%, #ffe0ec 100%)' }}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2, color: '#e91e63', fontWeight: 700 }}>
          Quay lại
        </Button>
        <Box sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: 6, mb: 3 }}>
          <img src={post.image} alt={post.title} style={{ width: '100%', maxHeight: 340, objectFit: 'cover' }} />
        </Box>
        <Typography variant="h3" fontWeight={800} color="#e91e63" mb={1} sx={{ fontFamily: 'serif' }}>
          {post.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" mb={2}>
          {post.date} • {post.views} lượt xem • {post.comments} bình luận
        </Typography>
        <Typography variant="h6" color="text.secondary" mb={2}>
          {post.description}
        </Typography>
        <Box sx={{ fontSize: 18, color: '#333', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: post.content }} />
      </Container>
    </Box>
  );
}
