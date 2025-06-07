import { Box, Container, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const post = {
  id: '1',
  title: 'Những Loài Hoa Mang Ý Nghĩa Tích Cực Trong Cuộc Sống',
  description: 'Khám phá 10 loài hoa mang thông điệp tích cực, truyền cảm hứng và động viên tinh thần cho cuộc sống thêm tươi đẹp.',
  image: 'https://blog.flowercorner.vn/wp-content/uploads/2022/08/loai-hoa-mang-y-nghia-tich-cuc.jpg',
  date: '14 Th6, 2025',
  views: '1.2K',
  comments: '52',
  content: `
    <h2 style="color:#e91e63;font-weight:700;">Hoa – Món quà của cảm xúc tích cực</h2>
    <p style="font-size:18px;">Những loài hoa mang ý nghĩa tích cực là món quà hoàn hảo để gửi lời động viên, khích lệ tinh thần tới người thân, bạn bè. Hãy cùng điểm qua 10 loài hoa truyền cảm hứng, phù hợp làm quà tặng trong những dịp đặc biệt!</p>
    <h3 style="color:#e91e63;font-weight:700;">1. Hoa hướng dương</h3>
    <img src="https://blog.flowercorner.vn/wp-content/uploads/2022/06/y-nghia-hoa-huong-duong-trong-tinh-yeu.jpg" alt="Hoa hướng dương" style="width:100%;border-radius:12px;margin:12px 0;box-shadow:0 4px 24px #e91e6322;" />
    <p>Biểu tượng của sự lạc quan, hy vọng và niềm tin vào tương lai tươi sáng. Hoa hướng dương còn đại diện cho ý chí kiên cường, mạnh mẽ vượt qua thử thách.</p>
    <h3 style="color:#e91e63;font-weight:700;">2. Hoa môn đỏ (Hồng môn)</h3>
    <img src="https://blog.flowercorner.vn/wp-content/uploads/2022/08/loai-hoa-mang-y-nghia-tich-cuc-hoa-mon-do.jpg" alt="Hoa môn đỏ" style="width:100%;border-radius:12px;margin:12px 0;box-shadow:0 4px 24px #e91e6322;" />
    <p>Đại diện cho sự may mắn, hạnh phúc và tinh thần nhiệt huyết, cháy hết mình với đam mê để hướng đến thành công.</p>
    <h3 style="color:#e91e63;font-weight:700;">3. Hoa thiên điểu</h3>
    <img src="https://blog.flowercorner.vn/wp-content/uploads/2022/08/loai-hoa-mang-y-nghia-tich-cuc-hoa-thien-dieu.jpg" alt="Hoa thiên điểu" style="width:100%;border-radius:12px;margin:12px 0;box-shadow:0 4px 24px #e91e6322;" />
    <p>Biểu tượng của sự tự do, niềm vui, lạc quan và luôn tin tưởng vào những điều tốt đẹp sẽ đến.</p>
    <h3 style="color:#e91e63;font-weight:700;">4. Hoa cát tường</h3>
    <img src="https://blog.flowercorner.vn/wp-content/uploads/2022/08/loai-hoa-mang-y-nghia-tich-cuc-hoa-cat-tuong.jpg" alt="Hoa cát tường" style="width:100%;border-radius:12px;margin:12px 0;box-shadow:0 4px 24px #e91e6322;" />
    <p>Tượng trưng cho sự may mắn, thành công, niềm vui và một cuộc sống hạnh phúc bền lâu.</p>
    <h3 style="color:#e91e63;font-weight:700;">5. Hoa đồng tiền</h3>
    <img src="https://blog.flowercorner.vn/wp-content/uploads/2022/06/y-nghia-hoa-dong-tien-vang.jpg" alt="Hoa đồng tiền" style="width:100%;border-radius:12px;margin:12px 0;box-shadow:0 4px 24px #e91e6322;" />
    <p>Biểu tượng của sự may mắn, niềm vui và một cuộc sống hạnh phúc viên mãn. Thường được chọn làm quà tặng dịp Tết, mừng khai trương.</p>
    <h3 style="color:#e91e63;font-weight:700;">6. Hoa Ly</h3>
    <img src="https://blog.flowercorner.vn/wp-content/uploads/2021/12/cac-loai-hoa-chung-tet-hoa-ly.jpg" alt="Hoa Ly" style="width:100%;border-radius:12px;margin:12px 0;box-shadow:0 4px 24px #e91e6322;" />
    <p>Biểu tượng của sự chiến thắng, khát vọng, đam mê và sự hồi sinh. Không thể thiếu trong dịp Tết và lễ mừng khai trương.</p>
    <h3 style="color:#e91e63;font-weight:700;">7. Hoa thủy tiên</h3>
    <img src="https://blog.flowercorner.vn/wp-content/uploads/2019/08/cac-loai-hoa-mau-vang-dep-nhat-hoa-thuy-tien.jpg" alt="Hoa thủy tiên" style="width:100%;border-radius:12px;margin:12px 0;box-shadow:0 4px 24px #e91e6322;" />
    <p>Tượng trưng cho sự may mắn, thịnh vượng và hạnh phúc. Được yêu thích dịp Tết ở Hà Nội.</p>
    <h3 style="color:#e91e63;font-weight:700;">8. Hoa thược dược</h3>
    <img src="https://blog.flowercorner.vn/wp-content/uploads/2022/07/hoa-tuong-trung-cho-su-may-man-hoa-thuoc-duoc.jpg" alt="Hoa thược dược" style="width:100%;border-radius:12px;margin:12px 0;box-shadow:0 4px 24px #e91e6322;" />
    <p>Nhắc nhở chúng ta luôn bình tĩnh, lạc quan và mạnh mẽ vượt qua mọi khó khăn, thử thách.</p>
    <h3 style="color:#e91e63;font-weight:700;">9. Hoa thanh liễu</h3>
    <img src="https://blog.flowercorner.vn/wp-content/uploads/2022/08/loai-hoa-mang-y-nghia-tich-cuc-hoa-thanh-lieu.jpg" alt="Hoa thanh liễu" style="width:100%;border-radius:12px;margin:12px 0;box-shadow:0 4px 24px #e91e6322;" />
    <p>Tượng trưng cho sự may mắn, giàu sang, thịnh vượng và một cuộc sống hạnh phúc bền lâu.</p>
    <h3 style="color:#e91e63;font-weight:700;">10. Hoa loa kèn</h3>
    <img src="https://blog.flowercorner.vn/wp-content/uploads/2022/08/loai-hoa-mang-y-nghia-tich-cuc-hoa-loa-ken.jpg" alt="Hoa loa kèn" style="width:100%;border-radius:12px;margin:12px 0;box-shadow:0 4px 24px #e91e6322;" />
    <p>Biểu tượng của niềm vui, sự tự tin và may mắn. Đặc trưng của tháng 4, mang đến sự tươi mới cho không gian sống.</p>
    <blockquote style="border-left:4px solid #e91e63;padding-left:16px;color:#e91e63;font-size:18px;margin:18px 0;">Hãy chọn một loài hoa mang ý nghĩa tích cực để gửi gắm thông điệp yêu thương, động viên tinh thần cho người thân, bạn bè!</blockquote>
    <p style="font-size:17px;">Bạn muốn đặt hoa tươi giao tận nơi? <b>Liên hệ ngay với chúng tôi để được tư vấn và lựa chọn bó hoa ý nghĩa nhất!</b></p>
  `
};

export default function BlogPost1() {
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
