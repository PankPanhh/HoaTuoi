export default function ForgotPasswordForm() {
  return (
    <form>
      <h2>Quên mật khẩu</h2>
      <input type="email" placeholder="Email" required />
      <button type="submit">Gửi yêu cầu</button>
    </form>
  );
}
