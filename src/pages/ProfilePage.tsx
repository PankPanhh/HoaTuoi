import { useAuth } from '../features/auth/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();
  if (!user) return <div>Bạn chưa đăng nhập.</div>;
  return (
    <div>
      <h2>Thông tin cá nhân</h2>
      <p><b>Họ tên:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Số điện thoại:</b> {user.phone}</p>
      <p><b>Địa chỉ:</b> {user.address}</p>
    </div>
  );
}
