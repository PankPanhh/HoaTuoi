import type { Product } from '../types';

export const khaiTruongProducts: (Product & { images: string[] })[] = [
  {
    id: '3',
    name: 'Hoa Hướng Dương',
    description: 'Đại diện cho niềm tin và hy vọng',
    price: 320000,
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Khai trương',
    color: 'Vàng',
    type: 'Hoa giỏ',
    occasion: 'Khai trương',
  },
  {
    id: '9',
    name: 'Hoa Cát Tường',
    description: 'Chúc khai trương phát tài phát lộc',
    price: 380000,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Khai trương',
    color: 'Tím',
    type: 'Hoa bó',
    occasion: 'Khai trương',
  },
  {
    id: '10',
    name: 'Hoa Lan Hồ Điệp Vàng',
    description: 'Thịnh vượng, may mắn cho ngày khai trương',
    price: 600000,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Khai trương',
    color: 'Vàng',
    type: 'Hoa chậu',
    occasion: 'Khai trương',
  },
  // Thêm các sản phẩm khác thuộc danh mục Khai trương nếu cần
];
