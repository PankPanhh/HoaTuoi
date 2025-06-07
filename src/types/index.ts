// Định nghĩa các kiểu dữ liệu chung cho toàn bộ ứng dụng

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  color: string;
  type: string;
  occasion: string;
  bestSeller?: boolean;
  promotion?: number; // Thêm trường promotion cho sản phẩm khuyến mãi
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: string;
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
}
