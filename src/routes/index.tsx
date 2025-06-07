import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ProductListPage from '../pages/ProductListPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import ProfilePage from '../pages/ProfilePage';
import OrderHistoryPage from '../pages/OrderHistoryPage';
import AuthPage from '../pages/AuthPage';
import BestSellerPage from '../pages/PromotionPage';
import PromotionPage from '../pages/PromotionPage';
import BlogPost1 from '../pages/BlogPost1';
import BlogPost2 from '../pages/BlogPost2';
import BlogPost3 from '../pages/BlogPost3';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductListPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/orders" element={<OrderHistoryPage />} />
      <Route path="/auth/*" element={<AuthPage />} />
      <Route path="/bestseller" element={<BestSellerPage />} />
      <Route path="/promotion" element={<PromotionPage />} />
      <Route path="/blog/1" element={<BlogPost1 />} />
      <Route path="/blog/2" element={<BlogPost2 />} />
      <Route path="/blog/3" element={<BlogPost3 />} />
    </Routes>
  );
}
