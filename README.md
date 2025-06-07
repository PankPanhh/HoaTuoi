# Website Bán Hoa Tươi

Dự án này là một website bán hoa tươi với các chức năng thương mại điện tử hiện đại:

## Chức năng chính
- Đăng ký/Đăng nhập (qua email/số điện thoại/mạng xã hội)
- Cập nhật thông tin cá nhân (họ tên, số điện thoại, địa chỉ)
- Xem lịch sử mua hàng
- Đổi mật khẩu/Quên mật khẩu
- Tìm kiếm theo tên hoa, dịp tặng (sinh nhật, lễ tình nhân, khai trương,...)
- Lọc theo: loại hoa, màu sắc, giá tiền, dịp sử dụng
- Xem danh mục hoa, chi tiết sản phẩm
- Giỏ hàng, đặt hàng và thanh toán
- Theo dõi đơn hàng
- Đánh giá và phản hồi

## Công nghệ sử dụng
- Frontend: React + Vite + TypeScript
- Backend: Sẽ bổ sung Node.js/Express
- Database: Sẽ bổ sung MongoDB

## Hướng dẫn phát triển
1. Cài đặt dependencies:
   ```bash
   npm install
   ```
2. Chạy ứng dụng:
   ```bash
   npm run dev
   ```

## Ghi chú
- UI hiện đại, thân thiện, ưu tiên trải nghiệm người dùng.
- Các chức năng backend sẽ được bổ sung ở các bước tiếp theo.

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
