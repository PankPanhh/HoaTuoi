import type { Product } from '../types';

export const tinhYeuProducts: (Product & { images: string[] })[] = [
  {
    id: '1',
    name: 'Hoa Hồng Đỏ',
    description: 'Biểu tượng của tình yêu nồng cháy',
    price: 350000,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Tình yêu',
    color: 'Đỏ',
    type: 'Hoa bó',
    occasion: 'Valentine',
  },
  {
    id: '5',
    name: 'Hoa Hồng Trắng',
    description: 'Tình yêu thuần khiết và trong sáng',
    price: 360000,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Tình yêu',
    color: 'Trắng',
    type: 'Hoa bó',
    occasion: 'Valentine',
  },
  {
    id: '6',
    name: 'Hoa Tulip Đỏ',
    description: 'Lời tỏ tình ngọt ngào',
    price: 400000,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
    ],
    category: 'Tình yêu',
    color: 'Đỏ',
    type: 'Hoa bó',
    occasion: 'Valentine',
  },
  // Thêm các sản phẩm khác thuộc danh mục Tình yêu nếu cần
];
