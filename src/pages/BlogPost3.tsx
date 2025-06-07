import { Box, Container, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const post = {
  id: '3',
  title: 'Xu Hướng Hoa Tươi 2025: Những Mẫu Hoa Hot Nhất Tại Shop Hoa Tươi 3 Que',
  description: 'Khám phá các xu hướng hoa tươi nổi bật năm 2025: phối màu độc đáo, hộp hoa sang trọng, thiết kế cá nhân hóa và dịch vụ tận tâm tại Shop Hoa Tươi 3 Que.',
  image: 'https://images.unsplash.com/photo-1525310072745-f49212b8a884?auto=format&fit=crop&w=1200&q=80',
  date: '10 Th6, 2025',
  views: '1.5K',
  comments: '75',
  content: `
    <h2 style="color:#e91e63;font-weight:700;">2025 – Năm của sự bùng nổ sáng tạo trong nghệ thuật hoa tươi</h2>
    <p style="font-size:18px;">Bạn đang tìm kiếm một món quà hoa thật ấn tượng, hợp xu hướng và mang dấu ấn riêng? Shop Hoa Tươi 3 Que sẽ bật mí cho bạn những mẫu hoa hot nhất 2025, giúp bạn ghi điểm tuyệt đối trong mọi dịp đặc biệt!</p>
    <h3 style="color:#e91e63;font-weight:700;">1. Bó hoa phối màu pastel & ombre thời thượng</h3>
    <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80" alt="Bó hoa pastel ombre" style="width:100%;border-radius:12px;margin:12px 0;box-shadow:0 4px 24px #e91e6322;" />
    <p>Xu hướng phối màu pastel nhẹ nhàng, kết hợp hiệu ứng ombre chuyển sắc tinh tế đang "làm mưa làm gió" tại Shop Hoa Tươi 3 Que. Những bó hoa này không chỉ đẹp mà còn thể hiện gu thẩm mỹ hiện đại, trẻ trung.</p>
    <h3 style="color:#e91e63;font-weight:700;">2. Hộp hoa cao cấp – Quà tặng sang trọng</h3>
    <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80" alt="Hộp hoa cao cấp" style="width:100%;border-radius:12px;margin:12px 0;box-shadow:0 4px 24px #e91e6322;" />
    <p>Hộp hoa với thiết kế tối giản, sử dụng hoa nhập khẩu, phụ kiện cao cấp là lựa chọn lý tưởng cho dịp sinh nhật, khai trương, kỷ niệm. Shop Hoa Tươi 3 Que luôn cập nhật mẫu hộp hoa mới nhất, sang trọng và tinh tế.</p>
    <h3 style="color:#e91e63;font-weight:700;">3. Hoa cá nhân hóa – Dấu ấn riêng cho người nhận</h3>
    <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=900&q=80" alt="Hoa cá nhân hóa" style="width:100%;border-radius:12px;margin:12px 0;box-shadow:0 4px 24px #e91e6322;" />
    <p>Khách hàng có thể yêu cầu in tên, thông điệp, chọn charm, nơ, thiệp theo ý thích. Mỗi bó hoa là một câu chuyện, một cảm xúc riêng biệt chỉ dành cho người nhận.</p>
    <h3 style="color:#e91e63;font-weight:700;">4. Hoa nhập khẩu – Đẳng cấp quốc tế</h3>
    <img src="https://images.unsplash.com/photo-1505751104546-4b63c0a32feb?auto=format&fit=crop&w=900&q=80" alt="Hoa nhập khẩu" style="width:100%;border-radius:12px;margin:12px 0;box-shadow:0 4px 24px #e91e6322;" />
    <p>Hoa hồng Ecuador, mẫu đơn Hà Lan, tulip Pháp... được phối hợp tinh tế, tạo nên những tác phẩm nghệ thuật đẳng cấp, sang trọng và bền màu lâu.</p>
    <h3 style="color:#e91e63;font-weight:700;">5. Dịch vụ giao hoa tận nơi – Tận tâm từng khoảnh khắc</h3>
    <img src="https://images.unsplash.com/photo-1591017682666-7f4a6146e6af?auto=format&fit=crop&w=900&q=80" alt="Giao hoa tận nơi" style="width:100%;border-radius:12px;margin:12px 0;box-shadow:0 4px 24px #e91e6322;" />
    <p>Shop Hoa Tươi 3 Que cam kết giao hoa tận nơi trong 90 phút, bảo đảm hoa luôn tươi mới, đúng mẫu, đúng hẹn. CSKH 24/7, hỗ trợ tận tình mọi yêu cầu của khách hàng.</p>
    <blockquote style="border-left:4px solid #e91e63;padding-left:16px;color:#e91e63;font-size:18px;margin:18px 0;">2025 là năm của sự sáng tạo và cá nhân hóa trong nghệ thuật hoa tươi. Hãy để Shop Hoa Tươi 3 Que đồng hành cùng bạn tạo nên những khoảnh khắc ý nghĩa nhất!</blockquote>
    <p style="font-size:17px;">Đặt hoa ngay hôm nay để trải nghiệm các xu hướng hoa tươi hot nhất 2025 tại Shop Hoa Tươi 3 Que!</p>
  `
};

export default function BlogPost3() {
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
