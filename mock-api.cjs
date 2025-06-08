const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;
const dbPath = path.join(__dirname, 'public/mock-db.json');

app.use(cors());
app.use(bodyParser.json());

// Đăng ký tài khoản
app.post('/api/register', (req, res) => {
  const { name, email, password, phone, address } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Thiếu thông tin bắt buộc.' });
  }
  let db;
  try {
    db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  } catch {
    db = { users: [] };
  }
  if (!Array.isArray(db.users)) db.users = [];
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
  res.status(201).json({ message: 'Đăng ký thành công', user: newUser });
});

// Lấy danh sách user
app.get('/api/users', (req, res) => {
  const { email } = req.query;
  let db;
  try {
    db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  } catch {
    db = { users: [] };
  }
  if (!Array.isArray(db.users)) db.users = [];
  if (email) {
    const user = db.users.find(u => u.email === email);
    if (!user) return res.status(404).json({ message: 'Không tìm thấy user.' });
    return res.json(user);
  }
  res.json({ users: db.users });
});

// Lưu user đăng nhập (cập nhật thông tin user)
app.post('/api/save-current-user', (req, res) => {
  const user = req.body;
  if (!user || !user.email) {
    return res.status(400).json({ message: 'Thiếu thông tin user.' });
  }
  let db;
  try {
    db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  } catch {
    db = { users: [] };
  }
  if (!Array.isArray(db.users)) db.users = [];
  // Nếu hardDelete: true thì xóa hoàn toàn user khỏi db
  if (user.hardDelete) {
    db.users = db.users.filter(u => u.email !== user.email);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    return res.json({ message: 'Đã xóa hoàn toàn user.' });
  }
  const idx = db.users.findIndex(u => u.email === user.email);
  if (idx !== -1) {
    // Giữ lại orderHistory cũ nếu có
    const oldOrderHistory = db.users[idx].orderHistory || [];
    db.users[idx] = { ...db.users[idx], ...user, orderHistory: oldOrderHistory };
  } else {
    db.users.push({ ...user, orderHistory: [] });
  }
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  res.json({ message: 'Đã lưu user đăng nhập.' });
});

// Thêm endpoint lưu order vào orderHistory của user
app.post('/api/users/add-order', (req, res) => {
  const { email, order } = req.body;
  if (!email || !order) {
    return res.status(400).json({ message: 'Thiếu thông tin email hoặc order.' });
  }
  let db;
  try {
    db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  } catch {
    db = { users: [] };
  }
  if (!Array.isArray(db.users)) db.users = [];
  const idx = db.users.findIndex(u => u.email === email);
  if (idx === -1) {
    return res.status(404).json({ message: 'Không tìm thấy user.' });
  }
  if (!Array.isArray(db.users[idx].orderHistory)) db.users[idx].orderHistory = [];
  db.users[idx].orderHistory.unshift(order);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  res.json({ message: 'Đã lưu đơn hàng vào orderHistory.' });
});

app.listen(PORT, () => {
  console.log(`Mock API server running at http://localhost:${PORT}`);
});
