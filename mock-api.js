// Đổi tên file này thành mock-api.cjs để chạy được với require trong Node.js CommonJS
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;
const dbPath = path.join(__dirname, '../public/mock-db.json');

app.use(cors());
app.use(bodyParser.json());

app.post('/api/register', (req, res) => {
  const { name, email, password, phone, address } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Thiếu thông tin bắt buộc.' });
  }
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  if (db.users.some(u => u.email === email)) {
    return res.status(409).json({ message: 'Email đã tồn tại.' });
  }
  const newUser = {
    id: db.users.length + 1,
    name,
    email,
    password,
    phone,
    address,
    orderHistory: [],
    role: 'customer'
  };
  db.users.push(newUser);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  const currentUserPath = path.join(__dirname, '../public/mock-db.json');
  fs.writeFileSync(currentUserPath, JSON.stringify(newUser, null, 2));
  res.status(201).json({ message: 'Đăng ký thành công', user: newUser });
});

app.post('/api/save-current-user', (req, res) => {
  const user = req.body;
  if (!user || !user.email) {
    return res.status(400).json({ message: 'Thiếu thông tin user.' });
  }
  const filePath = path.join(__dirname, '../public/mock-db.json');
  fs.writeFileSync(filePath, JSON.stringify(user, null, 2));
  res.json({ message: 'Đã lưu user đăng nhập.' });
});

app.listen(PORT, () => {
  console.log(`Mock API server running at http://localhost:${PORT}`);
});
