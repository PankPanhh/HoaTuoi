import { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Rating, Stack, Paper, TextField, Button, Alert } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const defaultReviews = [
  {
    name: 'Nguyễn Thị Mai',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    rating: 5,
    comment: 'Hoa rất tươi, giao hàng nhanh, đóng gói đẹp. Sẽ ủng hộ lần sau!',
    date: '06/06/2025',
  },
  {
    name: 'Trần Văn Nam',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 4,
    comment: 'Dịch vụ tốt, nhân viên tư vấn nhiệt tình. Giá hợp lý.',
    date: '05/06/2025',
  },
  {
    name: 'Lê Thảo',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
    comment: 'Mình đặt hoa sinh nhật, bạn mình rất thích. Cảm ơn shop!',
    date: '03/06/2025',
  },
  {
    name: 'Phạm Quang Huy',
    avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
    rating: 5,
    comment: 'Hoa đẹp, đúng mẫu, giao đúng giờ. Rất hài lòng!',
    date: '01/06/2025',
  },
];

const LOCAL_KEY = 'flower-reviews';

export default function ReviewSection() {
  const [reviews, setReviews] = useState(defaultReviews);
  const [form, setForm] = useState({ name: '', rating: 0, comment: '', avatar: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [page, setPage] = useState(0);
  const REVIEWS_PER_PAGE = 4;

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) {
      setReviews([...JSON.parse(saved), ...defaultReviews.filter(dr => !JSON.parse(saved).some((r:any) => r.name === dr.name && r.comment === dr.comment))]);
    }
  }, []);

  useEffect(() => {
    // Reset page if reviews change and page is out of range
    if (page > 0 && page * REVIEWS_PER_PAGE >= reviews.length) {
      setPage(0);
    }
  }, [reviews, page]);

  const handleChange = (field: string, value: string | number) => {
    setForm(f => ({ ...f, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.name.trim() || !form.comment.trim() || !form.rating) {
      setError('Vui lòng nhập đầy đủ tên, số sao và bình luận!');
      return;
    }
    const today = new Date();
    const newReview = {
      name: form.name.trim(),
      avatar: form.avatar.trim() || `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name.trim())}&background=random`,
      rating: form.rating,
      comment: form.comment.trim(),
      date: today.toLocaleDateString('vi-VN'),
    };
    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updated.filter(r => !defaultReviews.some(dr => dr.name === r.name && dr.comment === r.comment))));
    setSuccess('Cảm ơn bạn đã gửi đánh giá!');
    setForm({ name: '', rating: 0, comment: '', avatar: '' });
    setTimeout(() => setSuccess(''), 2500);
  };

  const pagedReviews = showAll
    ? reviews.slice(page * REVIEWS_PER_PAGE, page * REVIEWS_PER_PAGE + REVIEWS_PER_PAGE)
    : reviews.slice(0, REVIEWS_PER_PAGE);
  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);

  return (
    <Box sx={{ mt: 6, mb: 8 }}>
      <Typography variant="h5" fontWeight={700} color="#e91e63" align="center" mb={3}>
        Đánh giá từ khách hàng
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{
    maxWidth: 440,
    mx: 'auto',
    mb: 5,
    p: 4,
    bgcolor: 'linear-gradient(135deg, #fffbe7 60%, #ffe0ec 100%)',
    borderRadius: 5,
    boxShadow: '0 4px 32px #e91e6322',
    border: '2px solid #e91e63',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    transition: 'box-shadow 0.2s',
    '&:hover': { boxShadow: '0 8px 40px #e91e6344' },
  }}>
    <Typography fontWeight={700} mb={2} color="#e91e63" sx={{ fontSize: 22, letterSpacing: 0.5, textShadow: '0 2px 8px #fff' }}>
      Gửi đánh giá của bạn
    </Typography>
    <TextField label="Tên của bạn" value={form.name} onChange={e => handleChange('name', e.target.value)} fullWidth sx={{ mb: 2, bgcolor: '#fff', borderRadius: 2, boxShadow: 1 }} />
    <Rating value={form.rating} onChange={(_, v) => handleChange('rating', v || 0)} sx={{ mb: 2, '& .MuiRating-icon': { fontSize: 38, color: '#ff9800', textShadow: '0 2px 8px #fffbe7' } }} />
    <TextField label="Bình luận" value={form.comment} onChange={e => handleChange('comment', e.target.value)} fullWidth multiline minRows={2} sx={{ mb: 2, bgcolor: '#fff', borderRadius: 2, boxShadow: 1 }} />
    <TextField label="Link avatar (tùy chọn)" value={form.avatar} onChange={e => handleChange('avatar', e.target.value)} fullWidth sx={{ mb: 2, bgcolor: '#fff', borderRadius: 2, boxShadow: 1 }} />
    <Button type="submit" variant="contained" color="secondary" sx={{ fontWeight: 700, borderRadius: 3, px: 5, py: 1.2, fontSize: 17, boxShadow: 3, letterSpacing: 0.5, background: 'linear-gradient(90deg, #e91e63 60%, #ff9800 100%)', color: '#fff', '&:hover': { background: 'linear-gradient(90deg, #ff9800 60%, #e91e63 100%)', boxShadow: 6, transform: 'scale(1.04)' } }}>
      Gửi đánh giá
    </Button>
    {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>}
    {success && <Alert severity="success" sx={{ mt: 2, width: '100%' }}>{success}</Alert>}
  </Box>
      <Box sx={{ position: 'relative' }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} justifyContent="center" alignItems="stretch">
          {pagedReviews.map((r, idx) => (
            <Paper key={idx + (showAll ? page * REVIEWS_PER_PAGE : 0)} sx={{ p: 3, borderRadius: 4, minWidth: 260, maxWidth: 320, flex: 1, boxShadow: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: '#fff' }}>
              <Avatar src={r.avatar} alt={r.name} sx={{ width: 64, height: 64, mb: 1.5, boxShadow: 2 }} />
              <Typography fontWeight={700} color="#e91e63" mb={0.5}>{r.name}</Typography>
              <Rating value={r.rating} readOnly sx={{ mb: 1, '& .MuiRating-icon': { fontSize: 25 } }} />
              <Typography color="text.secondary" fontSize={15} mb={1} align="center">"{r.comment}"</Typography>
              <Typography variant="caption" color="text.disabled">{r.date}</Typography>
            </Paper>
          ))}
        </Stack>
        {/* Nút xem tất cả/ẩn bớt */}
        {reviews.length > REVIEWS_PER_PAGE && !showAll && (
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Button variant="outlined" color="secondary" onClick={() => setShowAll(true)} sx={{ fontWeight: 600, borderRadius: 2 }}>
              Xem tất cả đánh giá
            </Button>
          </Box>
        )}
        {showAll && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3, gap: 2 }}>
            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setPage(p => Math.max(0, p - 1))}
                  disabled={page === 0}
                  sx={{ minWidth: 40, borderRadius: 2 }}
                >
                  <ArrowBackIosNewIcon fontSize="small" />
                </Button>
                <Typography fontWeight={600} color="#e91e63">
                  {page + 1} / {totalPages}
                </Typography>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                  disabled={page === totalPages - 1}
                  sx={{ minWidth: 40, borderRadius: 2 }}
                >
                  <ArrowForwardIosIcon fontSize="small" />
                </Button>
              </Box>
            )}
            <Button variant="outlined" color="secondary" onClick={() => { setShowAll(false); setPage(0); }} sx={{ fontWeight: 600, borderRadius: 2 }}>
              Ẩn bớt
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
