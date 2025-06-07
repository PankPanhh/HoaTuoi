import type { Product } from '../types';

export const sinhNhatProducts: (Product & { images: string[] })[] = [
  {
    id: '2',
    name: 'Hoa Cẩm Chướng',
    description: 'Sự ngọt ngào và tinh tế',
    price: 290000,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Sinh nhật',
    color: 'Hồng',
    type: 'Hoa bó',
    occasion: 'Sinh nhật',
  },
  {
    id: '7',
    name: 'Hoa Đồng Tiền',
    description: 'Chúc mừng sinh nhật vui vẻ, may mắn',
    price: 250000,
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Sinh nhật',
    color: 'Vàng',
    type: 'Hoa bó',
    occasion: 'Sinh nhật',
  },
  {
    id: '8',
    name: 'Hoa Lan Vàng',
    description: 'Sang trọng, tươi mới cho ngày sinh nhật',
    price: 420000,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Sinh nhật',
    color: 'Vàng',
    type: 'Hoa chậu',
    occasion: 'Sinh nhật',
  },
  // Thêm các sản phẩm khác thuộc danh mục Sinh nhật nếu cần
];
