import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Container, Typography, Card, CardContent, CardMedia, Button, Stack, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import type { Product } from '../types';
import { allProducts } from '../data/all-products';

const occasions = ['Tất cả', 'Sinh nhật', 'Khai trương', 'Lễ tình nhân', 'Valentine', 'Tình yêu', 'Tốt nghiệp', 'Giáng Sinh', 'Hoa cưới'];
export const categories = ['Tất cả', 'Hồng', 'Lan', 'Hướng dương', 'Cẩm chướng', 'Tulip', 'Lily', 'Đồng tiền', 'Baby', 'Cẩm tú cầu', 'Cúc', 'Cát Tường', 'Trạng Nguyên', 'Khác'];
export const colors = ['Tất cả', 'Đỏ', 'Hồng', 'Vàng', 'Trắng', 'Xanh', 'Tím'];
export const types = ['Tất cả', 'Hoa bó', 'Hoa giỏ', 'Hoa chậu', 'Hộp hoa', 'Hoa kệ'];
const sortOptions = [
  { value: 'newest', label: 'Mới nhất' },
  { value: 'price-asc', label: 'Giá tăng dần' },
  { value: 'price-desc', label: 'Giá giảm dần' },
  { value: 'best-seller', label: 'Bán chạy' },
];

function sortProducts(list: (Product & { images: string[] })[], sort: string) {
  switch (sort) {
    case 'price-asc':
      return [...list].sort((a, b) => a.price - b.price);
    case 'price-desc':
      return [...list].sort((a, b) => b.price - a.price);
    case 'newest':
      return [...list]; // demo: giữ nguyên thứ tự
    case 'best-seller':
      return [...list]; // demo: giữ nguyên thứ tự
    default:
      return list;
  }
}

export default function ProductListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialOccasion = searchParams.get('occasion') || 'Tất cả';
  const [search, setSearch] = useState('');
  const [occasion, setOccasion] = useState(initialOccasion);
  const [category, setCategory] = useState('Tất cả');
  const [color, setColor] = useState('Tất cả');
  const [type, setType] = useState('Tất cả');
  const [sort, setSort] = useState('newest');

  // Update searchParams when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (occasion !== 'Tất cả') params.set('occasion', occasion);
    if (category !== 'Tất cả') params.set('category', category);
    if (color !== 'Tất cả') params.set('color', color);
    if (type !== 'Tất cả') params.set('type', type);
    if (sort !== 'newest') params.set('sort', sort);
    setSearchParams(params);
  }, [search, occasion, category, color, type, sort, setSearchParams]);

  let filtered: (Product & { images: string[] })[] = allProducts.filter(p =>
    (occasion === 'Tất cả' || p.occasion === occasion) &&
    (category === 'Tất cả' || p.name.toLowerCase().includes(category.toLowerCase())) &&
    (color === 'Tất cả' || p.color === color) &&
    (type === 'Tất cả' || p.type === type) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()))
  );
  filtered = sortProducts(filtered, sort);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={700} color="#e91e63" mb={3}>
        Danh mục sản phẩm
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3}>
        <TextField label="Tìm kiếm" value={search} onChange={e => setSearch(e.target.value)} size="small" fullWidth />
        <TextField select label="Theo dịp" value={occasion} onChange={e => setOccasion(e.target.value)} size="small" sx={{ minWidth: 120 }}>
          {occasions.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
        </TextField>
        <TextField select label="Loại hoa" value={category} onChange={e => setCategory(e.target.value)} size="small" sx={{ minWidth: 120 }}>
          {categories.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
        </TextField>
        <TextField select label="Màu sắc" value={color} onChange={e => setColor(e.target.value)} size="small" sx={{ minWidth: 120 }}>
          {colors.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
        </TextField>
        <TextField select label="Kiểu" value={type} onChange={e => setType(e.target.value)} size="small" sx={{ minWidth: 120 }}>
          {types.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
        </TextField>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Sắp xếp</InputLabel>
          <Select label="Sắp xếp" value={sort} onChange={e => setSort(e.target.value)}>
            {sortOptions.map(opt => <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>)}
          </Select>
        </FormControl>
      </Stack>
      <Box display="flex" flexWrap="wrap" mx={-1}>
        {filtered.length === 0 && (
          <Box sx={{ width: '100%' }}>
            <Typography color="text.secondary" align="center">Không tìm thấy sản phẩm phù hợp.</Typography>
          </Box>
        )}
        {filtered.map(product => (
          <Box key={product.id} sx={{ width: { xs: '100%', sm: '50%', md: '33.333%' }, display: 'flex', p: 1, boxSizing: 'border-box' }}>
            <Card sx={{ borderRadius: 4, boxShadow: 4, height: 380, width: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.2s', '&:hover': { transform: 'scale(1.08)', boxShadow: 8 } }}>
              <Box sx={{ position: 'relative', overflow: 'hidden', height: 180 }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: 'cover', width: '100%', height: '100%', transition: 'transform 0.3s cubic-bezier(.4,2,.6,1)', '&:hover': { transform: 'scale(1.18)' } }}
                />
                {product.bestSeller && (
                  <Box sx={{ position: 'absolute', top: 10, left: 10, bgcolor: '#ff9800', color: '#fff', px: 1.5, py: 0.5, borderRadius: 2, fontWeight: 700, fontSize: 13, boxShadow: 2, zIndex: 2 }}>
                    Bán chạy
                  </Box>
                )}
              </Box>
              <CardContent sx={{
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minHeight: 120,
  p: 1.2,
}}>
  <div>
    <Typography
      variant="h6"
      fontWeight={600}
      color="#e91e63"
      sx={{
        fontSize: 17,
        mb: 0.3,
        lineHeight: 1.2,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '100%',
        display: 'block',
        '@media (max-width: 600px)': {
          fontSize: 15,
        },
      }}
      title={product.name}
    >
      {product.name}
    </Typography>
    <Typography
      variant="body2"
      color="text.secondary"
      mb={0.7}
      sx={{
        minHeight: 31,
        fontSize: 15,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        lineHeight: 1.3,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        maxHeight: 42,
        '@media (max-width: 600px)': {
          fontSize: 13,
        },
      }}
      title={product.description}
    >
      {product.description}
    </Typography>
  </div>
  <div>
    <Typography
      variant="subtitle1"
      color="primary"
      fontWeight={700}
      sx={{ fontSize: 16, lineHeight: 1.2, '@media (max-width: 600px)': { fontSize: 14 } }}
    >
      {product.price.toLocaleString()}đ
    </Typography>
    <Button
      variant="outlined"
      color="secondary"
      fullWidth
      sx={{ mt: 0.7, fontSize: 15, py: 0.7, minHeight: 0, '@media (max-width: 600px)': { fontSize: 13 } }}
      href={`/products/${product.id}`}
    >
      Xem chi tiết
    </Button>
  </div>
</CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  );
}