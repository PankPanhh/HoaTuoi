import type { Product } from '../types';

export const leTinhNhanProducts: (Product & { images: string[] })[] = [
  {
    id: '4',
    name: 'Hoa Lan Hồ Điệp',
    description: 'Sang trọng, quý phái',
    price: 500000,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Lễ tình nhân',
    color: 'Trắng',
    type: 'Hoa chậu',
    occasion: 'Lễ tình nhân',
  },
  {
    id: '11',
    name: 'Hoa Tulip Hồng',
    description: 'Tình yêu nhẹ nhàng, lãng mạn',
    price: 410000,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Lễ tình nhân',
    color: 'Hồng',
    type: 'Hoa bó',
    occasion: 'Lễ tình nhân',
  },
  {
    id: '12',
    name: 'Hoa Hồng Xanh',
    description: 'Tình yêu bí ẩn và độc đáo',
    price: 530000,
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Lễ tình nhân',
    color: 'Xanh',
    type: 'Hoa bó',
    occasion: 'Lễ tình nhân',
  },
  // Thêm các sản phẩm khác thuộc danh mục Lễ tình nhân nếu cần
];
